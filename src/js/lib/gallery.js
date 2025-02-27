import { getLifecycle } from "../util/lifecycle";
import { getIntersectionObserver } from "../util/observer";

(() => {
  const gallery = document.getElementById("gallery");
  const images = gallery?.querySelectorAll("img");
  const lazyImages = gallery?.querySelectorAll("img[data-src]");

  const { startInterval, stopInterval, updateIndex } = getLifecycle({
    cycleLength: images.length,
    cycleInterval: 6000,
    onNewCycle: changeImage,
  });

  function changeImage(currIndex) {
    images[currIndex].classList.add("gallery-item-staged");
    images[currIndex].classList.remove("gallery-item-current");
    images[currIndex].setAttribute("aria-hidden", "true");
    const nextIndex = updateIndex();
    images[nextIndex].classList.add("gallery-item-current");
    images[nextIndex].classList.remove("gallery-item-staged");
    images[nextIndex].setAttribute("aria-hidden", "false");
  }

  function load() {
    return Promise.all(
      [...lazyImages].map((image) => {
        return new Promise((resolve, reject) => {
          const src = image.dataset.src;
          const srcset = image.dataset.srcset;
          image.removeAttribute("data-src");
          image.removeAttribute("data-srcset");
          image.src = src;
          image.srcset = srcset;
          image.onload = resolve;
          image.onerror = reject;
        });
      }),
    );
  }

  function init() {
    getIntersectionObserver({
      element: gallery,
      onIntersect: startInterval,
      onUnintersect: stopInterval,
    });
  }

  if (gallery) {
    load().then(init);
  }
})();

(() => {
  let index = 0;
  let interval = null;
  const gallery = document.getElementById("gallery");
  const images = gallery?.querySelectorAll("img");
  const lazyImages = gallery?.querySelectorAll("img[data-src]");

  function updateIndex() {
    index = (index + 1) % images.length;
  }

  function changeImage() {
    images[index].classList.add("opacity-0");
    images[index].setAttribute("aria-hidden", "true");
    updateIndex();
    images[index].classList.remove("opacity-0");
    images[index].setAttribute("aria-hidden", "false");
  }

  function startInterval() {
    stopInterval();
    interval = setInterval(changeImage, 6000);
  }

  function stopInterval() {
    clearInterval(interval);
    interval = null;
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
    startInterval();

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startInterval();
        } else {
          stopInterval();
        }
      });
    });
    intersectionObserver.observe(gallery);
  }

  if (gallery) {
    load().then(init);
  }
})();

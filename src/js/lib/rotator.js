import { getLifecycle } from "./lifecycle";
import { getIntersectionObserver } from "./observer";

(() => {
  const rotator = document.getElementById("rotator");
  const rotatorMask = document.getElementById("rotator-mask");
  const items = rotator?.querySelectorAll(".rotator-item");

  const { startInterval, stopInterval, updateIndex } = getLifecycle({
    cycleLength: items.length,
    cycleInterval: 4000,
    onNewCycle: changeText,
  });

  function changeText(currIndex) {
    const outItem = items[currIndex];
    const itemStyles = getComputedStyle(outItem);
    const itemAnimDuration = itemStyles.transitionDuration;
    const itemAnimDurationMs = itemAnimDuration.replace("s", "") * 1000;

    outItem.classList.add("rotator-item-staged-exit");
    outItem.setAttribute("aria-hidden", "true");
    const nextIndex = updateIndex();
    const inItem = items[nextIndex];
    inItem.classList.add("rotator-item-staged-enter");
    inItem.setAttribute("aria-hidden", "false");
    rotatorMask.style.setProperty(
      "--rotator-mask-width",
      `${inItem.offsetWidth}px`,
    );

    setTimeout(() => {
      inItem.classList.add("rotator-item-current");
      inItem.classList.remove(
        "rotator-item-staged",
        "rotator-item-staged-enter",
      );
      outItem.classList.add("rotator-item-staged");
      outItem.classList.remove(
        "rotator-item-current",
        "rotator-item-staged-exit",
      );
    }, itemAnimDurationMs);
  }

  function init() {
    startInterval();

    getIntersectionObserver({
      element: rotator,
      onIntersect: startInterval,
      onUnintersect: stopInterval,
    });
  }

  if (rotator) {
    init();
  }
})();

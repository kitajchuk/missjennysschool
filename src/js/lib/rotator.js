import { getLifecycle } from "./lifecycle";
import { getTransitionDuration } from "./styles";
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

  function setMaskWidth(item) {
    rotatorMask.style.setProperty(
      "--rotator-mask-width",
      `${item.offsetWidth}px`,
    );
    rotatorMask.setAttribute("aria-label", `You ${item.textContent.trim()}`);
  }

  function changeText(currIndex) {
    const outItem = items[currIndex];
    const itemAnimDurationMs = getTransitionDuration(outItem);

    outItem.classList.add("rotator-item-staged-exit");
    outItem.setAttribute("aria-hidden", "true");
    const nextIndex = updateIndex();
    const inItem = items[nextIndex];
    inItem.classList.add("rotator-item-staged-enter");
    inItem.setAttribute("aria-hidden", "false");
    setMaskWidth(inItem);

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
    setMaskWidth(items[0]);

    getIntersectionObserver({
      element: rotator,
      onIntersect: startInterval,
      onUnintersect: stopInterval,
    });

    // TODO: Add a resize observer to update the mask width
  }

  if (rotator) {
    init();
  }
})();

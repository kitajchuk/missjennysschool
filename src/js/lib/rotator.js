import { getLifecycle } from "../util/lifecycle";
import { getTransitionDuration } from "../util/styles";
import { getResizeObserver, getIntersectionObserver } from "../util/observer";

(() => {
  const rotator = document.getElementById("rotator");
  const rotatorMask = document.getElementById("rotator-mask");
  const rotatorClone = document.getElementById("rotator-clone");
  const items = rotator?.querySelectorAll(".rotator-item");
  const { startInterval, stopInterval, updateIndex } = getLifecycle({
    cycleLength: items.length,
    cycleInterval: 4000,
    onNewCycle: changeText,
  });

  function setCloneText(item) {
    rotatorClone.textContent = item.textContent.trim();
  }

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
    setCloneText(inItem);

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
    let initialized = false;

    getResizeObserver({
      element: rotator,
      onResize: () => {
        if (initialized) {
          setMaskWidth(rotatorClone);
        }
      },
    });

    getIntersectionObserver({
      element: rotator,
      onIntersect: () => {
        if (!initialized) {
          initialized = true;
          setCloneText(items[0]);
          setMaskWidth(items[0]);
          startInterval();
        } else {
          startInterval();
        }
      },
      onUnintersect: stopInterval,
    });
  }

  if (rotator) {
    init();
  }
})();

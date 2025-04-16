import { getPropertyValue, getTransitionDuration } from "../util/styles";

(() => {
  let isOpen = false;
  const root = document.documentElement;
  const navi = document.getElementById("navi");
  const naviMenu = document.getElementById("navi-menu");
  const naviArrow = document.getElementById("navi-arrow");
  const naviControl = document.getElementById("navi-control");
  const animClasses = ["transition-opacity"];
  const showClasses = ["max-sm:pointer-events-auto", "max-sm:opacity-100"];
  const hideClasses = ["max-sm:pointer-events-none", "max-sm:opacity-0"];

  function openNavi() {
    naviControl.setAttribute("aria-expanded", "true");
    naviArrow.classList.add("rotate-180");
    naviMenu.classList.add(...animClasses);
    setTimeout(() => {
      naviMenu.classList.remove(...hideClasses);
      naviMenu.classList.add(...showClasses);
    }, 0);
  }

  function closeNavi(withAnimation = true) {
    const removeClasses = withAnimation
      ? [...showClasses]
      : [...showClasses, ...animClasses];

    naviControl.setAttribute("aria-expanded", "false");
    naviArrow.classList.remove("rotate-180");
    naviMenu.classList.remove(...removeClasses);
    naviMenu.classList.add(...hideClasses);

    if (withAnimation) {
      const menuAnimDurationMs = getTransitionDuration(naviMenu);
      setTimeout(() => {
        naviMenu.classList.remove(...animClasses);
      }, menuAnimDurationMs);
    }
  }

  naviControl.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      openNavi();
    } else {
      closeNavi();
    }
  });

  const breakpointSm = getPropertyValue(root, "--breakpoint-sm");
  const mediaQuery = window.matchMedia(`(min-width: ${breakpointSm})`);

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches && isOpen) {
      isOpen = false;
      closeNavi(false);
    }
  });
})();

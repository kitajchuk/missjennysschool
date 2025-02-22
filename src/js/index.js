(() => {
  const factor = 0.25;

  document.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--bg-y",
      `-${window.scrollY * factor}px`,
    );
  });
})();

(() => {
  let isOpen = false;
  const navi = document.getElementById("navi");
  const naviArrow = document.getElementById("navi-arrow");
  const naviControl = document.getElementById("navi-control");
  const animClasses = ["transition-opacity"];
  const showClasses = ["max-sm:pointer-events-auto", "max-sm:opacity-100"];
  const hideClasses = ["max-sm:pointer-events-none", "max-sm:opacity-0"];

  function openNavi() {
    naviControl.setAttribute("aria-expanded", "true");
    naviArrow.classList.add("rotate-180");
    navi.classList.add(...animClasses);
    setTimeout(() => {
      navi.classList.remove(...hideClasses);
      navi.classList.add(...showClasses);
    }, 0);
  }

  function closeNavi(withAnimation = true) {
    const naviStyles = getComputedStyle(navi);
    const naviAnimDuration = naviStyles.transitionDuration;
    const naviAnimDurationMs = naviAnimDuration.replace("s", "") * 1000;
    const removeClasses = withAnimation
      ? [...showClasses]
      : [...showClasses, ...animClasses];

    naviControl.setAttribute("aria-expanded", "false");
    naviArrow.classList.remove("rotate-180");
    navi.classList.remove(...removeClasses);
    navi.classList.add(...hideClasses);

    if (withAnimation) {
      setTimeout(() => {
        navi.classList.remove(...animClasses);
      }, naviAnimDurationMs);
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

  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const breakpointSm = rootStyles.getPropertyValue("--breakpoint-sm");
  const mediaQuery = window.matchMedia(`(min-width: ${breakpointSm})`);

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches && isOpen) {
      isOpen = false;
      closeNavi(false);
    }
  });
})();

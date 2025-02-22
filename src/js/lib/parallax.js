(() => {
  const factor = 0.25;
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const rootBackgroundImage = rootStyles.backgroundImage;

  if (rootBackgroundImage !== "none") {
    document.addEventListener("scroll", () => {
      root.style.setProperty("--bg-y", `-${window.scrollY * factor}px`);
    });
  }
})();

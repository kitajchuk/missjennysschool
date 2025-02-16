(() => {
  const factor = 0.25;

  document.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--bg-y",
      `-${window.scrollY * factor}px`,
    );
  });
})();

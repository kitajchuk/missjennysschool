(() => {
  let index = 0;
  let interval = null;
  const gallery = document.getElementById("gallery");
  const images = gallery?.querySelectorAll("img");

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
    init();
  }
})();

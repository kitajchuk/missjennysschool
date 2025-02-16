(() => {
  function loadScript(src) {
    const elem = document.createElement("script");
    elem.type = "module";
    elem.src = src;
    document.head.append(elem);
  }

  function loadStyles(href) {
    const elem = document.createElement("link");
    elem.rel = "stylesheet";
    elem.href = href;
    document.head.append(elem);
  }

  const vms = document.querySelector("lite-vimeo");
  const yts = document.querySelector("lite-youtube");

  if (yts) {
    // Lite Youtube Embed uses a CSS file
    loadStyles("/css/lite-youtube-embed.css");
    loadScript("https://cdn.jsdelivr.net/npm/lite-youtube-embed/+esm");
  }

  if (vms) {
    // Lite Vimeo Embed uses constructable stylesheets in JS
    loadScript("https://cdn.jsdelivr.net/npm/lite-vimeo-embed/+esm");
  }
})();

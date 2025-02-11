import "dotenv/config";
import tailwindcss from "@tailwindcss/vite";
import * as prismic from "@prismicio/client";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "web/css": "css" });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
    },
  });

  eleventyConfig.addFilter("asHTML", (...args) => {
    return prismic.asHTML(...args);
  });

  eleventyConfig.addFilter("asText", (...args) => {
    return prismic.asText(...args);
  });

  eleventyConfig.addFilter("asLink", (...args) => {
    return prismic.asLink(...args);
  });

  // TODO: Make this nicer with `dayjs`
  // @see: https://github.com/prismicio-community/eleventy-plugin-prismic/blob/c387f76b2217e2695c73ea05f791499f2d225215/src/shortcodes.ts#L82
  eleventyConfig.addFilter("asDate", (...args) => {
    return prismic.asDate(...args);
  });

  eleventyConfig.addFilter("asImageSrc", (...args) => {
    return prismic.asImageSrc(...args);
  });

  eleventyConfig.addFilter("asImageWidthSrcSet", (...args) => {
    return prismic.asImageWidthSrcSet(...args);
  });

  eleventyConfig.addFilter("asImagePixelDensitySrcSet", (...args) => {
    return prismic.asImagePixelDensitySrcSet(...args);
  });

  // TODO: Add custom `image` and `embed` filters
  // @see: https://github.com/prismicio-community/eleventy-plugin-prismic/blob/master/src/shortcodes.ts
  // Possibly these would be better as liquid includes -- e.g. {% render "image", data: site.image %}

  return {
    dir: {
      input: "web",
    },
  };
}

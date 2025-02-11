import "dotenv/config";
import dayjs from "dayjs";
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

  eleventyConfig.addFilter("asDate", (dateField, format = "MMMM D, YYYY") => {
    const date = prismic.asDate(dateField);
    return date ? dayjs(date).format(format) : "invalid date";
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

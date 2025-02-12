import "dotenv/config";
import dayjs from "dayjs";
import tailwindcss from "@tailwindcss/vite";
import * as prismic from "@prismicio/client";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

import serializer from "./prismicio.serializer.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "web/css": "css" });
  eleventyConfig.addPassthroughCopy({ "web/public/*": "." });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
    },
  });

  eleventyConfig.setLiquidOptions({
    // https://www.11ty.dev/docs/languages/liquid/#java-script-truthiness-in-liquid
    jsTruthy: true,
  });

  eleventyConfig.addFilter("asHTML", (richTextField) => {
    return prismic.asHTML(richTextField, {
      serializer,
    });
  });

  eleventyConfig.addFilter("asText", (...args) => {
    return prismic.asText(...args);
  });

  eleventyConfig.addFilter("asLink", (...args) => {
    return prismic.asLink(...args);
  });

  eleventyConfig.addFilter("asLinkAttrs", (...args) => {
    return prismic.asLinkAttrs(...args);
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

  return {
    dir: {
      input: "web",
    },
  };
}

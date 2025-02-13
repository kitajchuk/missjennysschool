// Load early to ensure env vars are available
import "dotenv/config";

// Load early to ensure filters are available for prismic serializer
import "./lib/liquid.engine.js";

import tailwindcss from "@tailwindcss/vite";
import * as filters from "./lib/liquid.filters.js";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

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

  eleventyConfig.addFilter("asHTML", filters.asHTML);
  eleventyConfig.addFilter("asText", filters.asText);
  eleventyConfig.addFilter("asLink", filters.asLink);
  eleventyConfig.addFilter("asDate", filters.asDate);
  eleventyConfig.addFilter("asImageSrc", filters.asImageSrc);
  eleventyConfig.addFilter("asLinkAttrs", filters.asLinkAttrs);
  eleventyConfig.addFilter("asImageWidthSrcSet", filters.asImageWidthSrcSet);
  eleventyConfig.addFilter("asImagePixelDensitySrcSet", filters.asImagePixelDensitySrcSet);

  return {
    dir: {
      input: "web",
    },
  };
}

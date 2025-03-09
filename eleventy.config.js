import "dotenv/config";
import tailwindcss from "@tailwindcss/vite";
import * as filters from "./lib/filters/index.js";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { addRecipesByCategory } from "./lib/eleventy.collections.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
    },
  });

  eleventyConfig.setLiquidOptions({
    // https://www.11ty.dev/docs/languages/liquid/#java-script-truthiness-in-liquid
    jsTruthy: true,
  });

  addRecipesByCategory(eleventyConfig);

  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

  return {
    dir: {
      input: "src",
    },
  };
}

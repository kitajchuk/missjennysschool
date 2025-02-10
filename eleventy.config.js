import tailwindcss from "@tailwindcss/vite";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
    },
  });

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  return {
    dir: {
      input: "src",
    },
  };
}

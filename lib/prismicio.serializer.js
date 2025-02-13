import engine from "./liquid.engine.js";

export default {
  image: ({ node }) => {
    const html = engine.renderFileSync("image", {
      image: node,
    });

    // Make sure images are centered if they aren't as wide as the container
    return `
      <div class="flex justify-center">
        ${html}
      </div>
    `;
  },
  embed: ({ node }) => {
    return engine.renderFileSync("embed", {
      embed: node.oembed,
    });
  },
}
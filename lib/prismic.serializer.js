import engine from "./liquid.engine.js";

// Register serializers as needed for use with prismic asHTML Rich Text Field
export default {
  image: ({ node }) => {
    const html = engine.renderFileSync("image", {
      image: node,
    });

    // Make sure images are centered if they don't fill the container
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
};

import engine from "./liquid.engine.js";

// Register serializers as needed for use with prismic asHTML Rich Text Field
export default {
  image: ({ node }) => {
    const html = engine.renderFileSync("image", {
      image: node,
    });

    // Make sure images are centered if they don't fill the container
    return `
      <div class="cms-image justify-center">
        ${html}
      </div>
    `;
  },

  embed: ({ node }) => {
    // The data model is a bit different for embeds in Rich Text fields
    // so we need to parse the video ID from the HTML
    switch (node.oembed.provider_name) {
      case "Vimeo":
      case "YouTube":
        const title = node.oembed.title;
        const videoId =
          node.oembed.provider_name === "Vimeo"
            ? node.oembed.html.match(/vimeo\.com\/video\/(\d+)/)[1]
            : node.oembed.html.match(/youtube\.com\/embed\/([^?"]+)/)[1];
        const provider = node.oembed.provider_name;
        const thumbnail = node.oembed.thumbnail_url;

        return engine.renderFileSync("embed", {
          title,
          provider,
          video_id: videoId,
          thumbnail,
        });
      default:
        return "[oembed not supported]";
    }
  },

  hyperlink: ({ node, children }) => {
    return engine.renderFileSync("link", {
      link: node.data.url,
      text: children,
    });
  },
};

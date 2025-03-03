import { asText } from "../../lib/filters/as_text.js";
import { recursiveGetByType } from "../../lib/prismic.client.js";

export default async function () {
  const posts = await recursiveGetByType("blog_post", {
    orderings: [
      {
        field: "my.blog_post.published_date",
        direction: "desc",
      },
    ],
  });
  return {
    posts,
    eleventyComputed: {
      title: (data) => asText(data.post.data.title),
      related_posts: (data) =>
        data.posts.filter((post) => post.uid !== data.post.uid).slice(0, 3),
    },
  };
}

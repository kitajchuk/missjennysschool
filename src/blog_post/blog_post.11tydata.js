import client from "../../lib/prismic.client.js";
import { asText } from "../../lib/filters/as_text.js";

export default async function () {
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      {
        field: "my.blog_post.publish_date",
        direction: "desc",
      },
    ],
  });
  return {
    posts,
    eleventyComputed: {
      title: (data) => asText(data.post.data.title),
      recent_posts: (data) =>
        data.posts.filter((post) => post.uid !== data.post.uid).slice(0, 3),
    },
  };
}

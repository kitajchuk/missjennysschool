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
  return { posts };
}

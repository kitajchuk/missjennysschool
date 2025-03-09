import client from "../../lib/prismic.client.js";

export default async function () {
  const [blog_page, posts] = await Promise.all([
    client.getByUID("page", "blog"),
    client.getAllByType("blog_post", {
      orderings: [
        {
          field: "my.blog_post.publish_date",
          direction: "desc",
        },
      ],
    }),
  ]);
  return { posts, blog_page };
}

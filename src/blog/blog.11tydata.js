import client from "../../lib/prismic.client.js";

export default async function () {
  const response = await client.getByType("blog_post", {
    pageSize: 100,
    orderings: [
      {
        field: "my.blog_post.published_date",
        direction: "desc",
      },
    ],
  });
  return { posts: response.results };
}

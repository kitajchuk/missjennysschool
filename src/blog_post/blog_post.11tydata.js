import client from "../../lib/prismic.client.js";

export default async function () {
  const response = await client.getByType("blog_post", {
    pageSize: 100,
  });
  return { posts: response.results };
}

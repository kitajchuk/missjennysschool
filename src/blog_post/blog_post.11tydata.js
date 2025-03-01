import { recursiveGetByType } from "../../lib/prismic.client.js";

export default async function () {
  const posts = await recursiveGetByType("blog_post");
  return { posts };
}

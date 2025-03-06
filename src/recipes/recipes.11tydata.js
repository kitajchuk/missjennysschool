import client from "../../lib/prismic.client.js";

export default async function () {
  const recipes_page = await client.getByUID("page", "recipes");
  return { recipes_page };
}

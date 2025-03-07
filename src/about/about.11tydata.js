import client from "../../lib/prismic.client.js";

export default async function () {
  const about_page = await client.getByUID("page", "about");
  return { about_page };
}

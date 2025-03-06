import client from "../../lib/prismic.client.js";

export default async function () {
  const tuition_page = await client.getByUID("page", "tuition");
  return { tuition_page };
}

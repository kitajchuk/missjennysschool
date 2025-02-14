import client from "../../lib/prismic.client.js";

export default async function () {
  const response = await client.getSingle("site");
  return response.data;
}

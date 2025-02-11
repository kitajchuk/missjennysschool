import client from "../../prismicio.client.js";

export default async function () {
  const response = await client.getSingle("site");
  console.log(response);
  return response.data;
};

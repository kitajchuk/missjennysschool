import client from "../../lib/prismic.client.js";

export default async function () {
  const all_recipes = await client.getAllByType("recipe", {
    orderings: [
      {
        field: "my.recipe.publish_date",
        direction: "desc",
      },
    ],
  });
  return { all_recipes };
}

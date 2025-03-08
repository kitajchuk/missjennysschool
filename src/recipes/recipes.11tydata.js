import client from "../../lib/prismic.client.js";

export default async function () {
  const recipes_page = await client.getByUID("page", "recipes");
  const recipe_categories = await client.getByType("recipe_category", {
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "asc",
      },
    ],
  });
  return {
    recipes_page,
    recipe_categories: recipe_categories.results,
  };
}

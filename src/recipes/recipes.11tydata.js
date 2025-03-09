import client from "../../lib/prismic.client.js";

export default async function () {
  const [recipes_page, recipe_categories] = await Promise.all([
    client.getByUID("page", "recipes"),
    client.getAllByType("recipe_category", {
      orderings: [
        {
          field: "document.first_publication_date",
          direction: "asc",
        },
      ],
    }),
  ]);
  return {
    recipes_page,
    recipe_categories,
  };
}

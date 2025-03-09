import client from "../../lib/prismic.client.js";
import { asText } from "../../lib/filters/as_text.js";

export default async function () {
  const recipes = await client.getAllByType("recipe", {
    orderings: [
      {
        field: "my.recipe.publish_date",
        direction: "desc",
      },
    ],
  });
  const recipe_categories = await client.getAllByType("recipe_category", {
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "asc",
      },
    ],
  });
  return {
    recipes,
    recipe_categories,
    eleventyComputed: {
      title: (data) => asText(data.recipe.data.title),
      recent_recipes: (data) =>
        data.recipes
          .filter((recipe) => recipe.uid !== data.recipe.uid)
          .slice(0, 3),
    },
  };
}

import client from "../../lib/prismic.client.js";
import { asText } from "../../lib/filters/as_text.js";

export default async function () {
  const [recipes, recipe_categories] = await Promise.all([
    client.getAllByType("recipe", {
      orderings: [
        {
          field: "my.recipe.publish_date",
          direction: "desc",
        },
      ],
    }),
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

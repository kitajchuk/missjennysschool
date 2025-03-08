import client from "../../lib/prismic.client.js";
import { asText } from "../../lib/filters/as_text.js";

export default async function () {
  const recipes = await client.getAllByType("recipe", {
    orderings: [
      {
        field: "my.recipe.published_date",
        direction: "desc",
      },
    ],
  });
  return {
    recipes,
    eleventyComputed: {
      title: (data) => asText(data.recipe.data.title),
      related_recipes: (data) =>
        data.recipes
          .filter(
            (recipe) =>
              recipe.uid !== data.recipe.uid &&
              recipe.data.category.uid === data.recipe.data.category.uid,
          )
          .slice(0, 3),
    },
  };
}

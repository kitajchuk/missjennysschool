import client from "../../lib/prismic.client.js";

export default async function () {
  const recipe_categories = await client.getAllByType("recipe_category");
  const recipes_all = await client.getAllByType("recipe", {
    orderings: [
      {
        field: "my.recipe.publish_date",
        direction: "desc",
      },
    ],
  });
  return {
    recipes_all,
    recipe_categories,
    eleventyComputed: {
      title: (data) => data.recipe_category.data.name,
      recipes: (data) =>
        data.recipes_all.filter(
          (recipe) => recipe.data.category.uid === data.recipe_category.uid,
        ),
    },
  };
}

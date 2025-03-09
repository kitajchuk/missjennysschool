import lodash from "lodash";
import client from "./prismic.client.js";

export const pageSize = 10;

export function addRecipesByCategory(eleventyConfig) {
  eleventyConfig.addCollection("recipes_by_category", async () => {
    const [recipeCategories, recipesSorted] = await Promise.all([
      client.getAllByType("recipe_category", {
        orderings: [
          {
            field: "document.first_publication_date",
            direction: "asc",
          },
        ],
      }),
      client.getAllByType("recipe", {
        orderings: [
          {
            field: "my.recipe.publish_date",
            direction: "desc",
          },
        ],
      }),
    ]);

    const recipesByKey = {};

    recipeCategories.forEach((category) => {
      recipesByKey[category.uid] = [];
    });

    recipesSorted.forEach((recipe) => {
      const category = recipe.data.category.uid;
      recipesByKey[category].push(recipe);
    });

    const recipesByKeyPaged = [];

    Object.keys(recipesByKey).forEach((category) => {
      const totalPages = Math.ceil(recipesByKey[category].length / pageSize);
      const totalPages0 = totalPages - 1;

      lodash
        .chunk(recipesByKey[category], pageSize)
        .forEach((recipes, index) => {
          // Undefined by default -- e.g. first/last pages don't have a next/previous page
          let next = undefined;
          let previous = undefined;

          if (index < totalPages0) {
            // +2 because we're 1-indexing and the first page is `/recipes/category/${category}/`
            next = `/recipes/category/${category}/page/${index + 2}/`;
          }

          if (index > 0) {
            previous =
              index === 1
                ? // 1-indexing and the first page is `/recipes/category/${category}/`
                  `/recipes/category/${category}/`
                : // 1-indexing so the previous page is just index -- e.g. current page - 1
                  `/recipes/category/${category}/page/${index}/`;
          }

          recipesByKeyPaged.push({
            key: category,
            recipes,
            category: recipeCategories.find((c) => c.uid === category),
            // Replicate 11ty pagination object structure just for how we use it in templates
            // @see: src/_includes/templates/pagination_page.liquid
            // @see: https://www.11ty.dev/docs/pagination/
            pagination: {
              href: {
                next,
                previous,
              },
              hrefs: Array.from({ length: totalPages }, (_, i) => {
                return i === 0
                  ? `/recipes/category/${category}/`
                  : `/recipes/category/${category}/page/${i + 1}/`;
              }),
              pageNumber: index,
              totalPages,
            },
          });
        });
    });

    return recipesByKeyPaged;
  });
}

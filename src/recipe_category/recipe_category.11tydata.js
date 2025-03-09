export default async function () {
  return {
    eleventyComputed: {
      title: (data) => data.item.category.data.name,
    },
  };
}

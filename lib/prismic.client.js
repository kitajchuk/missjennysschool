import Fetch from "@11ty/eleventy-fetch";
import * as prismic from "@prismicio/client";

async function fetcher(url, options) {
  const response = await Fetch(url, {
    duration: "1d",
    fetchOptions: options,
  });

  return new Response(response);
}

const client = prismic.createClient(process.env.PRISMIC_API_ACCESS, {
  fetch: fetcher,
  accessToken: process.env.PRISMIC_API_TOKEN,
});

export default client;

export async function recursiveQuery(query, type, params = {}) {
  const results = [];

  async function fetchPage(page) {
    const options = {
      page,
      pageSize: 100,
      ...params,
    };

    const response = await client[query](type, options);
    results.push(...response.results);
    if (response.next_page) {
      return fetchPage(page + 1);
    }
    return results;
  }

  await fetchPage(1);

  return results;
}

export async function recursiveGetByType(type, params = {}) {
  return recursiveQuery("getByType", type, params);
}

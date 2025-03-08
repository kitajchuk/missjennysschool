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

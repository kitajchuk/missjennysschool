import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

// TODO: Try to make @11ty/eleventy-fetch work with Prismic

const client = prismic.createClient(process.env.PRISMIC_API_ACCESS, {
  fetch,
  accessToken: process.env.PRISMIC_API_TOKEN,
});

export default client;
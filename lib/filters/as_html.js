import * as prismic from "@prismicio/client";
import serializer from "../prismic.serializer.js";

export const asHTML = (richTextField) => {
  return prismic.asHTML(richTextField, {
    serializer,
  });
};

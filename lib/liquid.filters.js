import dayjs from "dayjs";
import * as prismic from "@prismicio/client";
import serializer from "./prismicio.serializer.js";

export const asHTML = (richTextField) => {
  return prismic.asHTML(richTextField, {
    serializer,
  });
};

export const asText = (...args) => {
  return prismic.asText(...args);
};

export const asLink = (...args) => {
  return prismic.asLink(...args);
};

export const asLinkAttrs = (...args) => {
  return prismic.asLinkAttrs(...args);
};

export const asDate = (dateField, format = "MMMM D, YYYY") => {
  const date = prismic.asDate(dateField);
  return date ? dayjs(date).format(format) : "invalid date";
};

export const asImageSrc = (...args) => {
  return prismic.asImageSrc(...args);
};

export const asImageWidthSrcSet = (...args) => {
  return prismic.asImageWidthSrcSet(...args);
};

export const asImagePixelDensitySrcSet = (...args) => {
  return prismic.asImagePixelDensitySrcSet(...args);
};
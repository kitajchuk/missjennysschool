import dayjs from "dayjs";
import * as prismic from "@prismicio/client";

export const asDate = (dateField, format = "MMMM D, YYYY") => {
  const date = prismic.asDate(dateField);
  return date ? dayjs(date).format(format) : "invalid date";
};

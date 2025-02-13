import path from "path";
import { Liquid } from "liquidjs";
import * as filters from "./liquid.filters.js";

const engine = new Liquid({
  root: path.resolve(process.cwd(), "web/_includes/templates"),
  cache: true,
  extname: ".liquid",
  jsTruthy: true,
});

// Register filters as needed for use with prismic serializer
engine.registerFilter("asImageWidthSrcSet", filters.asImageWidthSrcSet);

export default engine;

import path from "path";
import { Liquid } from "liquidjs";
import { asImageWidthSrcSet } from "./filters/as_image_width_src_set.js";

const engine = new Liquid({
  root: path.resolve(process.cwd(), "web/_includes/templates"),
  cache: true,
  extname: ".liquid",
  jsTruthy: true,
});

// Register filters as needed for use with prismic serializer
engine.registerFilter("asImageWidthSrcSet", asImageWidthSrcSet);

export default engine;

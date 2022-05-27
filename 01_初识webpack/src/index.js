import { sum, mul } from "./js/result.js";

const { dateFormat, priceFormat } = require("./js/dateTime");

console.log(sum(20, 30));
console.log(mul(20, 30));

console.log(dateFormat());
console.log(priceFormat());

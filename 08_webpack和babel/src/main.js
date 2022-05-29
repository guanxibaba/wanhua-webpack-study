import { dateFormat, priceFormat } from "./js/dateTime";

const { sum, mul } = require("./js/result.js");

const p = new Promise((resolve, reject) => {});
console.log(dateFormat());
console.log(priceFormat());
console.log(sum(20, 30));
console.log(mul(20, 30));

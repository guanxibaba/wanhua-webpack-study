import { fn } from "./js/main.js";

console.log("%cHello World", "color:red;font-size:30px;");
console.log(3);

if (module.hot) {
  module.hot.accept("./js/main.js", () => {
    console.log("main.js更新了");
  });
}

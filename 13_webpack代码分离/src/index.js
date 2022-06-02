import _ from "lodash";

console.log("%cHello World", "color:red;font-size:30px;");
console.log(_.join(["a", "b", "c"], "index"));
if (module.hot) {
  module.hot.accept("./js/main.js", () => {
    console.log("main.js更新了");
  });
}

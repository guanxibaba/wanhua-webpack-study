import _ from "lodash";
import "./index.css";
console.log("%cHello World", "color:red;font-size:30px;");
console.log(_.join(["1", "2", "3"]));
// 通过设置魔法注释来设置打包后name的值，webpack会解析到这个注释
import(/* webpackChunkName: "bar02" */ "./js/bar.02").then(
  ({ default: bar02 }) => {
    bar02;
  }
);

const button = document.createElement("button");
button.innerHTML = "点击获取组件";
button.addEventListener("click", () => {
  import(
    /* webpackChunkName: "element" */
    /* webpackPreload: true */
    "./element"
  ).then(({ default: element }) => {
    document.body.appendChild(element);
  });
});

document.body.appendChild(button);

if (module.hot) {
  module.hot.accept("./js/main.js", () => {
    console.log("main.js更新了");
  });
}

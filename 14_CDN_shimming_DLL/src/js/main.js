import _ from "lodash";
export const fn = () => {
  console.log(_.join(["a", "b", "c"]));
  console.log("hello webpack");
};

fn();
// 通过设置魔法注释来设置打包后name的值，webpack会解析到这个注释
import(/* webpackChunkName: "bar01" */ "./bar.01").then(
  ({ default: bar01 }) => {
    bar01;
  }
);

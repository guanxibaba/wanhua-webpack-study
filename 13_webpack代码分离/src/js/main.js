import _ from "lodash";
import foo from "./foo";
export const fn = () => {
  console.log(_.join(["a", "b", "c"], "-"));
  console.log("hello webpack");
};

fn();

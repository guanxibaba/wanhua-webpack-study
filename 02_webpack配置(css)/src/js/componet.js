import "./component.css";
import "./com.less";

function componet() {
  const elemnt = document.createElement("div");
  elemnt.innerHTML = "<h1>Hello World</h1>";
  elemnt.className = "box";
  return elemnt;
}

document.body.appendChild(componet());

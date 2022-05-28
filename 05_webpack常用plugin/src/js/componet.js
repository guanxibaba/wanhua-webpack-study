import "./component.css";
import "./com.less";
import imgSrc from "../img/小丑.jpg";

function componet() {
  const elemnt = document.createElement("div");
  elemnt.innerHTML = "<h1>Hello World</h1>";
  elemnt.className = "box";

  const imgEl = document.createElement("img");
  imgEl.style.width = "100px";
  imgEl.style.height = "100px";
  imgEl.src = imgSrc;
  elemnt.appendChild(imgEl);

  const iEl = document.createElement("i");
  iEl.className = "iconfont icon-zhixianghuishou";
  elemnt.appendChild(iEl);
  return elemnt;
}

document.body.appendChild(componet());

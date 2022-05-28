// 声明一个对象，用于存放所有的模块
var __webpack_modules__ = {
  "./src/js/result.js": function (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) {
    // 为这个exports对象定义一个esModule属性，值为true
    __webpack_require__.r(__webpack_exports__);
    // 把第二个参数的属性设置到exports上
    __webpack_require__.d(__webpack_exports__, {
      mul: function () {
        return mul;
      },
      sum: function () {
        return sum;
      },
    });
    const sum = (num1, num2) => {
      return num1 + num2;
    };

    const mul = (num1, num2) => num1 * num2;
  },
};

// 定义一个缓存对象
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // 给__webpack_module_cache__缓存对象定义一个属性，属性名为moduleId，属性值为一个对象
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // 属性值是一个对象，对象内有exports属性
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

!(function () {
  // 为这个函数添加一个方法
  __webpack_require__.d = function (exports, definition) {
    // 遍历definition对象的属性
    for (var key in definition) {
      // 判断当前key是不是在它自身的属性中并且不是exports属性
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        // 再为exports对象定义key属性，是可枚举的，值为definition对象的key属性的值
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };
})();

!(function () {
  // 为这个函数添加一个方法
  __webpack_require__.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
})();

!(function () {
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    // 把我们传入的__webpack_exports__为他的__esModule属性设置一个值为{ value: true }的对象
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();

var __webpack_exports__ = {};

!(function () {
  // 为__webpack_exports__添加一个属性
  __webpack_require__.r(__webpack_exports__);

  var _js_result_js__WEBPACK_IMPORTED_MODULE_0__ =
    __webpack_require__("./src/js/result.js");
  // 然后再调用exports里面的方法
  // 下面的写法类式于console.log(_js_result_js__WEBPACK_IMPORTED_MODULE_0__.sum(20, 30))
  console.log((0, _js_result_js__WEBPACK_IMPORTED_MODULE_0__.sum)(20, 30));
  console.log((0, _js_result_js__WEBPACK_IMPORTED_MODULE_0__.mul)(20, 30));
})();

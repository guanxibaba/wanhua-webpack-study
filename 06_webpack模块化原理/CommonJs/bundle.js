var __webpack_modules__ = {
  "./src/js/dateTime.js": function (module) {
    const dateFormat = (date) => {
      return "2020-12-12";
    };

    const priceFormat = (price) => {
      return "100.00";
    };

    module.exports = {
      dateFormat,
      priceFormat,
    };
  },
};

// 定义一个缓存对象
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // 如果缓存中有，则直接返回
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }

  // 没有缓存的时候，创建一个对象，并且放入缓存中module 和__webpack_module_cache__[moduleId]指向同一个对象
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

var __webpack_exports__ = {};
// 立即执行函数
!(function () {
  const { dateFormat, priceFormat } = __webpack_require__(
    "./src/js/dateTime.js"
  );

  console.log(dateFormat());
  console.log(priceFormat());
})();

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.hwhPlugins = {}, global._));
})(this, (function (exports, _) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

  const format = () => {
    return '2022-7-17'
  };

  var formt = {
    format
  };

  const myName = 'hwh';

  const getName = (name) => {
    if (!name) return null
    console.log(name);
  };

  getName(myName);

  const operation = (sum1, sum2) => {
    return sum1 + sum2
  };

  console.log(___default["default"].jion(['a', 'b', 'c'], '-'));

  console.log(formt.format());

  exports.operation = operation;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

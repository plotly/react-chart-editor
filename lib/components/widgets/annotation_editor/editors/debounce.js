"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
var DEBOUNCE_DELAY = 250;
var timeout = void 0;

function clearTimeout() {
  window.clearTimeout(timeout);
  timeout = null;
}

function debounce(fn, args) {
  if (timeout) {
    clearTimeout();
  }

  timeout = window.setTimeout(function () {
    fn.apply(null, args);
    timeout = null;
  }, DEBOUNCE_DELAY);
}
module.exports = exports["default"];
//# sourceMappingURL=debounce.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.findAttrs = findAttrs;
function findAttrs(obj, pattern) {
  var newAttrs = void 0;
  var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
  var attrs = [];
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (!Array.isArray(obj[i]) && _typeof(obj[i]) !== "object") {
        return null;
      }
      if (!!(newAttrs = findAttrs(obj[i]))) {
        for (var j = 0; j < newAttrs.length; j++) {
          if (!pattern || pattern.test(newAttrs[j])) {
            attrs.push("[" + i + "]." + newAttrs[j]);
          }
        }
      }
    }
  } else if (type === "object" || type === "function") {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!!(newAttrs = findAttrs(obj[key]))) {
          for (var _j = 0; _j < newAttrs.length; _j++) {
            if (!pattern || pattern.test(newAttrs[_j])) {
              attrs.push(key + (Array.isArray(obj[key]) ? "" : ".") + newAttrs[_j]);
            }
          }
        } else {
          if (!pattern || pattern.test(key)) {
            attrs.push(key);
          }
        }
      }
    }
  }

  return attrs.length ? attrs : null;
}
//# sourceMappingURL=find-attrs.js.map
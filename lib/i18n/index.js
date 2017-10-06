"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = _;

var _en = require("./en");

var _en2 = _interopRequireDefault(_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  en: _en2.default
};
function _(dictionaries, locale, key) {
  var dict = dictionaries[locale];
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  } else {
    return key;
  }
}
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.klass = klass;

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function klass(name) {
  return _constants2.default.baseClassName + "-" + name;
}
//# sourceMappingURL=common.js.map
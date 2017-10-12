"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hub = undefined;

var _PlotlyEditor = require("./PlotlyEditor");

var _PlotlyEditor2 = _interopRequireDefault(_PlotlyEditor);

var _components = require("./components");

var _components2 = _interopRequireDefault(_components);

var _hub = require("./hub");

var _hub2 = _interopRequireDefault(_hub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_PlotlyEditor2.default, _components2.default);

exports.Hub = _hub2.default;
exports.default = _PlotlyEditor2.default;
//# sourceMappingURL=index.js.map
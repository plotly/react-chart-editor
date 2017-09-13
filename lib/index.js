"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plotly = require("./plotly.js-react-editor");

var _plotly2 = _interopRequireDefault(_plotly);

var _field = require("./components/field");

var _field2 = _interopRequireDefault(_field);

var _select = require("./components/select");

var _select2 = _interopRequireDefault(_select);

var _panel = require("./components/panel");

var _panel2 = _interopRequireDefault(_panel);

var _traceAccordion = require("./components/trace-accordion");

var _traceAccordion2 = _interopRequireDefault(_traceAccordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plotly2.default.Field = _field2.default;
_plotly2.default.Select = _select2.default;
_plotly2.default.Panel = _panel2.default;
_plotly2.default.TraceAccordion = _traceAccordion2.default;

exports.default = _plotly2.default;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plotly = require("./plotly.js-react-editor");

var _plotly2 = _interopRequireDefault(_plotly);

var _Field = require("./components/Field");

var _Field2 = _interopRequireDefault(_Field);

var _Select = require("./components/fields/Select");

var _Select2 = _interopRequireDefault(_Select);

var _Panel = require("./components/Panel");

var _Panel2 = _interopRequireDefault(_Panel);

var _TraceAccordion = require("./components/TraceAccordion");

var _TraceAccordion2 = _interopRequireDefault(_TraceAccordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plotly2.default.Field = _Field2.default;
_plotly2.default.Select = _Select2.default;
_plotly2.default.Panel = _Panel2.default;
_plotly2.default.TraceAccordion = _TraceAccordion2.default;

exports.default = _plotly2.default;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map
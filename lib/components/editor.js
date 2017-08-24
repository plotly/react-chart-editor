"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _traceAccordion = require("./trace-accordion");

var _traceAccordion2 = _interopRequireDefault(_traceAccordion);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    _classCallCheck(this, Editor);

    return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
  }

  _createClass(Editor, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _panel2.default,
          { name: "graph-create" },
          _react2.default.createElement(
            _traceAccordion2.default,
            null,
            _react2.default.createElement(_select2.default, {
              label: "Plot Type",
              attr: "mode",
              options: [{ label: "Line", value: "lines" }, { label: "Scatter", value: "markers" }, { label: "Scatter line", value: "lines+markers" }]
            }),
            _react2.default.createElement(_select2.default, {
              label: "Marker Color",
              attr: "marker.color",
              options: [{ label: "Red", value: "red" }, { label: "Green", value: "green" }, { label: "Blue", value: "blue" }]
            })
          )
        )
      );
    }
  }]);

  return Editor;
}(_react.Component);

exports.default = Editor;
module.exports = exports["default"];
//# sourceMappingURL=editor.js.map
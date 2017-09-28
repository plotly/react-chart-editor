"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

/*
 * These are the built-in panels for the editor. If the editor has children specified,
 * those panels will override these.
 */
var DefaultPanels = function (_Component) {
  _inherits(DefaultPanels, _Component);

  function DefaultPanels(props, context) {
    _classCallCheck(this, DefaultPanels);

    var _this = _possibleConstructorReturn(this, (DefaultPanels.__proto__ || Object.getPrototypeOf(DefaultPanels)).call(this, props));

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;
    return _this;
  }

  _createClass(DefaultPanels, [{
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
            _react2.default.createElement(_select2.default, { label: "X", attr: "xsrc", options: this.dataSourceNames }),
            _react2.default.createElement(_select2.default, { label: "Y", attr: "ysrc", options: this.dataSourceNames }),
            _react2.default.createElement(_select2.default, {
              label: "Marker Size",
              attr: "marker.size",
              options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14]
            })
          )
        )
      );
    }
  }]);

  return DefaultPanels;
}(_react.Component);

DefaultPanels.contextTypes = {
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array
};

exports.default = DefaultPanels;
module.exports = exports["default"];
//# sourceMappingURL=DefaltPanels.js.map
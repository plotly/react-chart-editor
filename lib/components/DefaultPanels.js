"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _common = require("../common");

var _TraceAccordion = require("./TraceAccordion");

var _TraceAccordion2 = _interopRequireDefault(_TraceAccordion);

var _Panel = require("./Panel");

var _Panel2 = _interopRequireDefault(_Panel);

var _Select = require("./Select");

var _Select2 = _interopRequireDefault(_Select);

var _Numeric = require("./Numeric");

var _Numeric2 = _interopRequireDefault(_Numeric);

var _Color = require("./Color");

var _Color2 = _interopRequireDefault(_Color);

var _Section = require("./Section");

var _Section2 = _interopRequireDefault(_Section);

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
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _Panel2.default,
          { name: "graph-create" },
          _react2.default.createElement(_TraceAccordion2.default, {
            render: function render() {
              return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_Select2.default, {
                  label: "Plot Type",
                  attr: "mode",
                  options: [{ label: "Line", value: "lines" }, { label: "Scatter", value: "markers" }, { label: "Scatter line", value: "lines+markers" }]
                }),
                _react2.default.createElement(_Select2.default, { label: "X", attr: "xsrc", options: _this2.dataSourceNames }),
                _react2.default.createElement(_Select2.default, { label: "Y", attr: "ysrc", options: _this2.dataSourceNames }),
                _react2.default.createElement(_Numeric2.default, { label: (0, _common._)("Marker Size"), attr: "marker.size" })
              );
            }
          })
        ),
        _react2.default.createElement(
          _Panel2.default,
          { name: "style-traces" },
          _react2.default.createElement(_TraceAccordion2.default, {
            render: function render() {
              return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  _Section2.default,
                  { heading: (0, _common._)("style.traces.trace") },
                  _react2.default.createElement(_Numeric2.default, {
                    label: (0, _common._)("style.traces.opacity"),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    attr: "opacity"
                  })
                ),
                _react2.default.createElement(_Section2.default, { heading: (0, _common._)("style.traces.display") }),
                _react2.default.createElement(
                  _Section2.default,
                  { heading: (0, _common._)("style.traces.points") },
                  _react2.default.createElement(_Numeric2.default, {
                    label: (0, _common._)("style.traces.marker-opacity"),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    attr: "marker.opacity"
                  }),
                  _react2.default.createElement(_Color2.default, {
                    label: (0, _common._)("Marker Color"),
                    attr: "marker.color"
                  }),
                  _react2.default.createElement(_Numeric2.default, {
                    label: (0, _common._)("style.traces.marker-size"),
                    min: 0,
                    attr: "marker.size"
                  }),
                  _react2.default.createElement(_Numeric2.default, {
                    label: (0, _common._)("style.traces.marker-line-width"),
                    min: 0,
                    attr: "marker.line.width"
                  })
                ),
                _react2.default.createElement(
                  _Section2.default,
                  { heading: (0, _common._)("style.traces.lines") },
                  _react2.default.createElement(_Numeric2.default, {
                    label: (0, _common._)("style.traces.line-width"),
                    min: 0,
                    step: 1.0,
                    attr: "line.width"
                  }),
                  _react2.default.createElement(_Color2.default, {
                    label: (0, _common._)("Line color"),
                    attr: "line.color"
                  })
                )
              );
            }
          })
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
//# sourceMappingURL=DefaultPanels.js.map
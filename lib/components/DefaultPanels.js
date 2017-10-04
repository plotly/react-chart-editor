"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _Flaglist = require("./Flaglist");

var _Flaglist2 = _interopRequireDefault(_Flaglist);

var _Radio = require("./Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _PanelsWithModeMenu = require("./PanelsWithModeMenu");

var _PanelsWithModeMenu2 = _interopRequireDefault(_PanelsWithModeMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
var DefaultPanels = function (_Base) {
  _inherits(DefaultPanels, _Base);

  function DefaultPanels(props, context) {
    _classCallCheck(this, DefaultPanels);

    var _this = _possibleConstructorReturn(this, (DefaultPanels.__proto__ || Object.getPrototypeOf(DefaultPanels)).call(this, props, context));

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;
    return _this;
  }

  _createClass(DefaultPanels, [{
    key: "render",
    value: function render() {
      var _ = this._;

      return _react2.default.createElement(
        _PanelsWithModeMenu2.default,
        null,
        _react2.default.createElement(
          _Panel2.default,
          { section: "Graph", name: "Create" },
          _react2.default.createElement(
            _TraceAccordion2.default,
            null,
            _react2.default.createElement(_Select2.default, {
              label: "Plot Type",
              attr: "mode",
              options: [{ label: "Line", value: "lines" }, { label: "Scatter", value: "markers" }, { label: "Scatter line", value: "lines+markers" }]
            }),
            _react2.default.createElement(_Select2.default, { label: "X", attr: "xsrc", options: this.dataSourceNames }),
            _react2.default.createElement(_Select2.default, { label: "Y", attr: "ysrc", options: this.dataSourceNames }),
            _react2.default.createElement(_Numeric2.default, { label: _("Marker Size"), attr: "marker.size" })
          )
        ),
        _react2.default.createElement(
          _Panel2.default,
          { section: "Style", name: "Traces" },
          _react2.default.createElement(
            _TraceAccordion2.default,
            null,
            _react2.default.createElement(
              _Section2.default,
              { heading: _("Trace") },
              _react2.default.createElement(_Numeric2.default, {
                label: _("Opacity"),
                min: 0,
                max: 1,
                step: 0.1,
                attr: "opacity"
              })
            ),
            _react2.default.createElement(
              _Section2.default,
              { heading: _("Display") },
              _react2.default.createElement(_Flaglist2.default, {
                attr: "mode",
                options: [{ label: "Lines", value: "lines" }, { label: "Points", value: "markers" }]
              })
            ),
            _react2.default.createElement(
              _Section2.default,
              { heading: _("Points") },
              _react2.default.createElement(_Numeric2.default, {
                label: _("Marker Opacity"),
                min: 0,
                max: 1,
                step: 0.1,
                attr: "marker.opacity"
              }),
              _react2.default.createElement(_Color2.default, { label: _("Marker Color"), attr: "marker.color" }),
              _react2.default.createElement(_Numeric2.default, { label: _("Size"), min: 0, attr: "marker.size" }),
              _react2.default.createElement(_Numeric2.default, {
                label: _("Line width"),
                min: 0,
                attr: "marker.line.width"
              })
            ),
            _react2.default.createElement(
              _Section2.default,
              { heading: _("Lines") },
              _react2.default.createElement(_Numeric2.default, {
                label: _("Width"),
                min: 0,
                step: 1.0,
                attr: "line.width"
              }),
              _react2.default.createElement(_Color2.default, { label: _("Line color"), attr: "line.color" }),
              _react2.default.createElement(_Radio2.default, { label: _("Connect Gaps"), attr: "connectgaps" })
            )
          )
        )
      );
    }
  }]);

  return DefaultPanels;
}(_base2.default);

// It's not enough for Base to specify which context it accepts. This component
// must manually pull Base's defined context types into its own.


DefaultPanels.contextTypes = Object.assign({
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array
}, _base2.default.contextTypes);

exports.default = DefaultPanels;
module.exports = exports["default"];
//# sourceMappingURL=DefaultPanels.js.map
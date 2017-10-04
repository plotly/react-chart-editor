"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
var DefaultEditor = function (_PlotlyEditorBase) {
  _inherits(DefaultEditor, _PlotlyEditorBase);

  function DefaultEditor() {
    _classCallCheck(this, DefaultEditor);

    return _possibleConstructorReturn(this, (DefaultEditor.__proto__ || Object.getPrototypeOf(DefaultEditor)).apply(this, arguments));
  }

  _createClass(DefaultEditor, [{
    key: "render",
    value: function render() {
      var _ = this._;

      return _react2.default.createElement(
        _components.PanelsWithModeMenu,
        null,
        _react2.default.createElement(
          _components.Panel,
          { section: "Graph", name: "Create" },
          _react2.default.createElement(
            _components.TraceAccordion,
            null,
            _react2.default.createElement(_components.Select, {
              label: "Plot Type",
              attr: "mode",
              options: [{ label: "Line", value: "lines" }, { label: "Scatter", value: "markers" }, { label: "Scatter line", value: "lines+markers" }]
            }),
            _react2.default.createElement(_components.Select, { label: "X", attr: "xsrc", options: this.dataSourceNames }),
            _react2.default.createElement(_components.Select, { label: "Y", attr: "ysrc", options: this.dataSourceNames }),
            _react2.default.createElement(_components.Numeric, { label: _("Marker Size"), attr: "marker.size" })
          )
        ),
        _react2.default.createElement(
          _components.Panel,
          { section: "Style", name: "Traces" },
          _react2.default.createElement(
            _components.TraceAccordion,
            null,
            _react2.default.createElement(
              _components.Section,
              { heading: _("Trace") },
              _react2.default.createElement(_components.Numeric, {
                label: _("Opacity"),
                min: 0,
                max: 1,
                step: 0.1,
                attr: "opacity"
              })
            ),
            _react2.default.createElement(
              _components.Section,
              { heading: _("Display") },
              _react2.default.createElement(_components.Flaglist, {
                attr: "mode",
                options: [{ label: "Lines", value: "lines" }, { label: "Points", value: "markers" }]
              })
            ),
            _react2.default.createElement(
              _components.Section,
              { heading: _("Points") },
              _react2.default.createElement(_components.Numeric, {
                label: _("Marker Opacity"),
                min: 0,
                max: 1,
                step: 0.1,
                attr: "marker.opacity"
              }),
              _react2.default.createElement(_components.ColorPicker, { label: _("Marker Color"), attr: "marker.color" }),
              _react2.default.createElement(_components.Numeric, { label: _("Size"), min: 0, attr: "marker.size" }),
              _react2.default.createElement(_components.Numeric, {
                label: _("Line width"),
                min: 0,
                attr: "marker.line.width"
              })
            ),
            _react2.default.createElement(
              _components.Section,
              { heading: _("Lines") },
              _react2.default.createElement(_components.Numeric, {
                label: _("Width"),
                min: 0,
                step: 1.0,
                attr: "line.width"
              }),
              _react2.default.createElement(_components.ColorPicker, { label: _("Line color"), attr: "line.color" }),
              _react2.default.createElement(_components.Radio, { label: _("Connect Gaps"), attr: "connectgaps" })
            )
          )
        )
      );
    }
  }]);

  return DefaultEditor;
}(_components.PlotlyEditorBase);

exports.default = DefaultEditor;
module.exports = exports["default"];
//# sourceMappingURL=DefaultEditor.js.map
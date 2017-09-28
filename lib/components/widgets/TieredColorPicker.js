"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultColors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SketchFields = require("react-color/lib/components/sketch/SketchFields");

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _SketchPresetColors = require("react-color/lib/components/sketch/SketchPresetColors");

var _SketchPresetColors2 = _interopRequireDefault(_SketchPresetColors);

var _common = require("react-color/lib/components/common");

var _reactColor = require("react-color");

var _common2 = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Plotly JS default colors.
var defaultColors = exports.defaultColors = ["#444444", "#ffffff", "#1f77b4", // muted blue
"#ff7f0e", // safety orange
"#2ca02c", // cooked asparagus green
"#d62728", // brick red
"#9467bd", // muted purple
"#8c564b", // chestnut brown
"#e377c2", // raspberry yogurt pink
"#7f7f7f", // middle gray
"#bcbd22", // curry yellow-green
"#17becf"];

function TieredColorPicker(props) {
  var rgb = props.rgb,
      onChangeComplete = props.onChangeComplete;
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b,
      a = rgb.a;


  var activeColor = {
    backgroundColor: "rgba(" + r + ", " + g + ", " + b + ", " + a + ")"
  };

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "p",
        { className: "color-picker-title" },
        (0, _common2._)("Custom colors")
      ),
      _react2.default.createElement(
        "div",
        { className: "color-picker-saturation" },
        _react2.default.createElement(_common.Saturation, props)
      ),
      _react2.default.createElement(
        "div",
        { className: "color-picker-controls +flex" },
        _react2.default.createElement(
          "div",
          { className: "color-picker-sliders" },
          _react2.default.createElement(
            "div",
            { className: "color-picker-slider" },
            _react2.default.createElement(_common.Hue, props)
          ),
          _react2.default.createElement(
            "div",
            { className: "color-picker-slider" },
            _react2.default.createElement(_common.Alpha, props)
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "color-picker-active" },
          _react2.default.createElement(_common.Checkboard, null),
          _react2.default.createElement("div", { style: activeColor, className: "color-picker-active-swatch" })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "color-picker-custom-input" },
        _react2.default.createElement(_SketchFields2.default, _extends({}, props, { onChange: onChangeComplete }))
      )
    ),
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "p",
        { className: "color-picker-title" },
        (0, _common2._)("Default colors")
      ),
      _react2.default.createElement(
        "div",
        { className: "color-picker-preset-colors js-color-picker-preset-colors" },
        _react2.default.createElement(_SketchPresetColors2.default, { colors: defaultColors, onClick: onChangeComplete })
      )
    )
  );
}

TieredColorPicker.propTypes = {
  color: _propTypes2.default.string.isRequired,
  rgb: _propTypes2.default.shape({
    r: _propTypes2.default.number,
    g: _propTypes2.default.number,
    b: _propTypes2.default.number,
    a: _propTypes2.default.number
  }).isRequired,
  onChangeComplete: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactColor.CustomPicker)(TieredColorPicker);
//# sourceMappingURL=TieredColorPicker.js.map
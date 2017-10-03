'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _SketchFields = require('react-color/lib/components/sketch/SketchFields');

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _SketchPresetColors = require('react-color/lib/components/sketch/SketchPresetColors');

var _SketchPresetColors2 = _interopRequireDefault(_SketchPresetColors);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _common = require('react-color/lib/components/common');

var _reactColor = require('react-color');

var _common2 = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultColors = ["#444444", "#ffffff", "#1f77b4", // muted blue
"#ff7f0e", // safety orange
"#2ca02c", // cooked asparagus green
"#d62728", // brick red
"#9467bd", // muted purple
"#8c564b", // chestnut brown
"#e377c2", // raspberry yogurt pink
"#7f7f7f", // middle gray
"#bcbd22", // curry yellow-green
"#17becf"];

// Utility functions for converting ColorPicker color objects or raw strings
// into TinyColor objects.
var extractRGB = function extractRGB(c) {
  return c.rgb || c;
};
var getColorSource = function getColorSource(c) {
  return c.source === 'hex' ? c.hex : extractRGB(c);
};
var toTinyColor = function toTinyColor(c) {
  return (0, _tinycolor2.default)(getColorSource(c));
};

var CustomColorPicker = (0, _reactColor.CustomPicker)(function (props) {
  var rgb = props.rgb,
      onChangeComplete = props.onChangeComplete;
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b,
      a = rgb.a;


  var activeColor = {
    backgroundColor: 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'color-picker-title' },
        (0, _common2._)('Custom colors')
      ),
      _react2.default.createElement(
        'div',
        { className: 'color-picker-saturation' },
        _react2.default.createElement(_common.Saturation, props)
      ),
      _react2.default.createElement(
        'div',
        { className: 'color-picker-controls +flex' },
        _react2.default.createElement(
          'div',
          { className: 'color-picker-sliders' },
          _react2.default.createElement(
            'div',
            { className: 'color-picker-slider' },
            _react2.default.createElement(_common.Hue, props)
          ),
          _react2.default.createElement(
            'div',
            { className: 'color-picker-slider' },
            _react2.default.createElement(_common.Alpha, props)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'color-picker-active' },
          _react2.default.createElement(_common.Checkboard, null),
          _react2.default.createElement('div', {
            style: activeColor,
            className: 'color-picker-active-swatch'
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'color-picker-custom-input' },
        _react2.default.createElement(_SketchFields2.default, _extends({}, props, {
          onChange: onChangeComplete
        }))
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'color-picker-title' },
        (0, _common2._)('Default colors')
      ),
      _react2.default.createElement(
        'div',
        { className: 'color-picker-preset-colors js-color-picker-preset-colors' },
        _react2.default.createElement(_SketchPresetColors2.default, {
          colors: defaultColors,
          onClick: onChangeComplete
        })
      )
    )
  );
});

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    _this.state = {
      isVisible: false
    };

    _this.onSelectedColorChange = _this.onSelectedColorChange.bind(_this);
    _this.toggleVisible = _this.toggleVisible.bind(_this);
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'onSelectedColorChange',
    value: function onSelectedColorChange(newColor) {

      // We use our own toTinyColor because this value is a ColorPicker
      // color value which is an object that needs unpacking. We also handle
      // the case where a color string is passed in (just in case).

      var color = toTinyColor(newColor);

      // relayout call only wants a RGB String
      this.props.onColorChange(color.toRgbString());
    }
  }, {
    key: 'toggleVisible',
    value: function toggleVisible() {
      this.setState({ isVisible: !this.state.isVisible });
    }
  }, {
    key: 'render',
    value: function render() {

      // We use tinycolor here instead of our own toTinyColor as
      // tinycolor handles `null` values and other weirdness we may
      // expect from user data.
      var selectedColor = (0, _tinycolor2.default)(this.props.selectedColor);
      var colorText = selectedColor.toHexString();
      var rgbString = selectedColor.toRgbString();

      // We need inline style here to assign the background color
      // dynamically.
      var swatchStyle = { backgroundColor: rgbString };

      return _react2.default.createElement(
        'div',
        { className: 'colorpicker-container js-colorpicker-container' },
        _react2.default.createElement(
          'div',
          { className: 'colorpicker' },
          _react2.default.createElement('div', {
            className: 'colorpicker-swatch +cursor-clickable js-colorpicker-swatch',
            style: swatchStyle,
            onClick: this.toggleVisible
          })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'colorpicker-selected-color +hover-grey',
            onClick: this.toggleVisible
          },
          colorText
        ),
        this.state.isVisible && _react2.default.createElement(
          'div',
          { className: 'color-picker__popover js-color-picker-popover' },
          _react2.default.createElement('div', {
            className: 'color-picker__cover',
            onClick: this.toggleVisible
          }),
          _react2.default.createElement(CustomColorPicker, {
            color: rgbString,
            onChangeComplete: this.onSelectedColorChange
          })
        )
      );
    }
  }]);

  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
  onColorChange: _propTypes2.default.func.isRequired,
  selectedColor: _propTypes2.default.string
};

module.exports = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map
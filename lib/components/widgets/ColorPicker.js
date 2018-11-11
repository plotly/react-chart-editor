'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SketchFields = require('react-color/lib/components/sketch/SketchFields');

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _common = require('react-color/lib/components/common');

var _reactColor = require('react-color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Custom = function (_Component) {
  _inherits(Custom, _Component);

  function Custom() {
    _classCallCheck(this, Custom);

    return _possibleConstructorReturn(this, (Custom.__proto__ || Object.getPrototypeOf(Custom)).apply(this, arguments));
  }

  _createClass(Custom, [{
    key: 'render',
    value: function render() {
      var onChangeComplete = this.props.onChangeComplete;


      return _react2.default.createElement(
        'div',
        { className: 'colorpicker__outer' },
        _react2.default.createElement(
          'div',
          { className: 'colorpicker__controls +flex' },
          _react2.default.createElement(
            'div',
            { className: 'colorpicker__sliders' },
            _react2.default.createElement(
              'div',
              { className: 'colorpicker__slider' },
              _react2.default.createElement(_common.Hue, this.props)
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'colorpicker__saturation' },
          _react2.default.createElement(_common.Saturation, this.props)
        ),
        _react2.default.createElement(
          'div',
          { className: 'colorpicker__custom-input' },
          _react2.default.createElement(_SketchFields2.default, _extends({}, this.props, { onChange: onChangeComplete }))
        )
      );
    }
  }]);

  return Custom;
}(_react.Component);

Custom.propTypes = {
  rgb: _propTypes2.default.object,
  onChangeComplete: _propTypes2.default.func
};

var CustomColorPicker = (0, _reactColor.CustomPicker)(Custom);

var ColorPicker = function (_Component2) {
  _inherits(ColorPicker, _Component2);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this2 = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    _this2.state = {
      isVisible: false
    };

    _this2.onSelectedColorChange = _this2.onSelectedColorChange.bind(_this2);
    _this2.toggleVisible = _this2.toggleVisible.bind(_this2);
    return _this2;
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

      // Convert rgba to rgb if necessary
      var rgbString = selectedColor._a !== 0 ? selectedColor.toRgbString() : 'rgb(' + selectedColor._r + ',' + selectedColor._g + ',' + selectedColor._b + ')';

      // We need inline style here to assign the background color
      // dynamically.
      var swatchStyle = { backgroundColor: rgbString };

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'colorpicker__container' },
          _react2.default.createElement(
            'div',
            { className: 'colorpicker' },
            _react2.default.createElement('div', {
              className: 'colorpicker__swatch +cursor-clickable',
              style: swatchStyle,
              onClick: this.toggleVisible
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'colorpicker__selected-color +hover-grey', onClick: this.toggleVisible },
            colorText
          )
        ),
        this.state.isVisible && _react2.default.createElement(CustomColorPicker, { color: rgbString, onChangeComplete: this.onSelectedColorChange })
      );
    }
  }]);

  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
  onColorChange: _propTypes2.default.func.isRequired,
  selectedColor: _propTypes2.default.string
};

exports.default = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TieredColorPicker = require("./TieredColorPicker");

var _TieredColorPicker2 = _interopRequireDefault(_TieredColorPicker);

var _tinycolor = require("tinycolor2");

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    _this.state = {
      selectedColor: (0, _tinycolor2.default)(props.selectedColor),
      isVisible: false
    };

    _this.onSelectedColorChange = _this.onSelectedColorChange.bind(_this);
    _this.toColorBuffer = _this.toColorBuffer.bind(_this);
    _this.toggleVisible = _this.toggleVisible.bind(_this);
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var newColor = (0, _tinycolor2.default)(nextProps.selectedColor);
      var selectedColor = this.state.selectedColor;


      if (newColor.toRgbString() !== selectedColor.toRgbString()) {
        this.setState({ selectedColor: newColor });
      }
    }
  }, {
    key: "toColorBuffer",
    value: function toColorBuffer(color) {
      // @param {obj} c, an object that contains rgba field. Either it
      // has a field called 'rgb' that contains a rgba object or it is a rgba
      // object
      //
      // @returns {obj} returns c.rgb if it exits if it doesn't exist, it
      // measn that the object itself is a rgba object
      var extractRGB = function extractRGB(c) {
        return c.rgb || c;
      };

      // If it contains rgb info, we extract its rgb object, else we return
      // its hex
      var getColorSource = function getColorSource(c) {
        return c.source === "rgb" ? extractRGB(c) : c.hex;
      };

      return (0, _tinycolor2.default)(getColorSource(color));
    }

    // Note: this handler cannot be used alone without being decorated by tiered
    // decorator
    //
    // @param {obj} color, object from tinycolor
    //
    // @returns {void} calls restyle

  }, {
    key: "onSelectedColorChange",
    value: function onSelectedColorChange(color) {
      this.setState({ selectedColor: color });

      var newColor = color.toRgbString();

      // Call whatever onColorChange was passed in with the same value!
      // relayout call only wants a RGB String
      this.props.onColorChange(newColor);
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible() {
      this.setState({ isVisible: !this.state.isVisible });
    }
  }, {
    key: "render",
    value: function render() {
      var selectedColor = this.state.selectedColor;


      var colorText = selectedColor.toHexString();

      // We need inline style here to assign the background color
      // dynamically.
      var swatchStyle = {
        backgroundColor: selectedColor.toRgbString()
      };

      return _react2.default.createElement(
        "div",
        { className: "colorpicker-container js-colorpicker-container" },
        _react2.default.createElement(
          "div",
          { className: "colorpicker" },
          _react2.default.createElement("div", {
            className: "colorpicker-swatch +cursor-clickable js-colorpicker-swatch",
            style: swatchStyle,
            onClick: this.toggleVisible
          })
        ),
        _react2.default.createElement(
          "div",
          {
            className: "colorpicker-selected-color +hover-grey",
            onClick: this.toggleVisible
          },
          colorText
        ),
        this.state.isVisible ? _react2.default.createElement(
          "div",
          { className: "color-picker__popover js-color-picker-popover" },
          _react2.default.createElement("div", { className: "color-picker__cover", onClick: this.toggleVisible }),
          _react2.default.createElement(_TieredColorPicker2.default, {
            color: selectedColor.toRgbString(),
            onChangeComplete: this.onSelectedColorChange
          })
        ) : null
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
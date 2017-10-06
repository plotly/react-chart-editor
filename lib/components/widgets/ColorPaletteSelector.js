"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require("@workspace/constants/color");

var _color2 = _interopRequireDefault(_color);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Environment from "@common/utils/environment";


var HEIGHT = 90;
var WIDTH = 18;
var STANDARD_COLORSCALE_LENGTH = _color2.default[0].length;

var ColorPaletteSelector = function (_Component) {
  _inherits(ColorPaletteSelector, _Component);

  function ColorPaletteSelector(props) {
    _classCallCheck(this, ColorPaletteSelector);

    var _this = _possibleConstructorReturn(this, (ColorPaletteSelector.__proto__ || Object.getPrototypeOf(ColorPaletteSelector)).call(this, props));

    var colorscales = void 0;
    if (_this.props.interpolated) {
      colorscales = _color2.default;
    } else {
      // pull the color out of the colorscales
      colorscales = _color2.default.map(function (colorscale) {
        return colorscale.map(function (colorpair) {
          return colorpair[1];
        });
      });
    }

    _this.state = { colorscales: colorscales };
    return _this;
  }

  /*
     * if the supplied colorscale isn't in our state, add it to the front
     */


  _createClass(ColorPaletteSelector, [{
    key: "addColorScale",
    value: function addColorScale(newColorScale) {
      if (!newColorScale || newColorScale.length === 0) {
        return;
      } else if (!Array.isArray(newColorScale)) {
        var Plotly = Environment.plotly;
        newColorScale = Plotly.Colorscale.scales[newColorScale];
      }

      var colorscales = this.state.colorscales;

      for (var i = 0; i < colorscales.length; i++) {
        var colorscale = colorscales[i];
        if (colorscale.length === newColorScale.length) {
          for (var j = 0; j < colorscale.length; j++) {
            if (this.props.interpolated && colorscale[j][0] === newColorScale[j][0] && colorscale[j][1] === newColorScale[j][1]) {
              // newColorScale is in our list of colorscales
              return;
            } else if (!this.props.interpolated && colorscale[j] === newColorScale[j]) {
              return;
            }
          }
        } else {
          /*
                   * It could happen that our new colorscale is actually a trimmed down or
                   * expanded version of a current color scale. This is especially true
                   * now that we have grouped styled traces. We don't want to add a new
                   * colorscale in those cases.
                   */
          var firstColorsMatch = colorscale[0][1] === newColorScale[0][1];

          if (!this.props.interpolated) {
            firstColorsMatch = colorscale[0] === newColorScale[0];
          }

          if (firstColorsMatch) {
            return;
          }
        }
      }

      // newColorScale is not in our list of colorscales, so add it
      colorscales.unshift(newColorScale);
      this.setState({ colorscales: colorscales });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.addColorScale(this.props.colorscale);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.addColorScale(nextProps.colorscale);
    }
  }, {
    key: "_renderColorScale",
    value: function _renderColorScale(newColorscale, key) {
      var _this2 = this;

      /*
           * The colorpalette control can also be used to color multiple traces
           * based on one colorscale. Our colorscale has to have at least as many
           * colors as there are user traces.
           */
      var Plotly = Environment.plotly;
      var colorscaleLength = newColorscale.length;

      var _props = this.props,
          isGrouped = _props.isGrouped,
          userDataIndex = _props.userDataIndex,
          isPie = _props.isPie,
          currentColorscale = _props.colorscale,
          interpolated = _props.interpolated;


      if (isGrouped && userDataIndex.length > STANDARD_COLORSCALE_LENGTH) {
        var scaleWithBreakpoints = newColorscale.map(function (color, index) {
          return [index / newColorscale.length, color];
        });

        var scaleFunc = Plotly.Colorscale.makeColorScaleFunc(
        // scale boundaries: from 0 to 1
        Plotly.Colorscale.extractScale(scaleWithBreakpoints, 0, 1));

        colorscaleLength = userDataIndex.length;

        newColorscale = userDataIndex.map(function (_, index) {
          return scaleFunc(index / colorscaleLength);
        });
      }

      // Fix pie chart coloring
      if (isPie && currentColorscale.length > STANDARD_COLORSCALE_LENGTH) {
        var _scaleWithBreakpoints = newColorscale.map(function (color, index) {
          return [index / newColorscale.length, color];
        });
        var _scaleFunc = Plotly.Colorscale.makeColorScaleFunc(
        // scale boundaries: from 0 to 1
        Plotly.Colorscale.extractScale(_scaleWithBreakpoints, 0, 1));

        colorscaleLength = currentColorscale.length;

        newColorscale = currentColorscale.map(function (_, index) {
          return _scaleFunc(index / colorscaleLength);
        });
      }

      var colorblocks = [];

      for (var i = 0; i < colorscaleLength; i++) {
        var color = interpolated ? newColorscale[i][1] : newColorscale[i];

        var colorBlockStyle = {
          height: HEIGHT / colorscaleLength,
          backgroundColor: color
        };

        colorblocks[i] = _react2.default.createElement("div", { key: i, style: colorBlockStyle, className: "js-color-block" });
      }

      return _react2.default.createElement(
        "div",
        {
          key: key,
          className: "color-palette js-color-palette",
          style: { width: WIDTH },
          onClick: function onClick() {
            return _this2.props.onClick(newColorscale);
          }
        },
        colorblocks
      );
    }
  }, {
    key: "render",
    value: function render() {
      var colorscales = this.state.colorscales;

      var colorpanels = [];
      for (var i = 0; i < colorscales.length; i++) {
        colorpanels[i] = this._renderColorScale(colorscales[i], i);
      }

      return _react2.default.createElement(
        "div",
        {
          className: "color-palette-selector",
          style: {
            width: WIDTH * colorscales.length,
            marginLeft: "auto",
            marginRight: "auto"
          }
        },
        colorpanels
      );
    }
  }]);

  return ColorPaletteSelector;
}(_react.Component);

exports.default = ColorPaletteSelector;


ColorPaletteSelector.propTypes = {
  colorscale: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]))])), _propTypes2.default.string]),
  onClick: _propTypes2.default.func,

  /*
     * if true, colorscales are in the form [[x1, color1], [x2, color2], ...]
     * if false, colorscales are in the form [color1, color2, ...]
     *
     * true is used for charts with colorscales like heatmaps or
     * scatter's  marker.color
     *
     * false is used for mapping colors across traces and
     * pie chart's marker.colors
     */
  interpolated: _propTypes2.default.bool,

  /*
     * specify which trace this control applies to if we're
     * rendering a trace control
     * Can be an array if we're trying to group style traces:
     * https://github.com/plotly/streambed/issues/7973
     */
  userDataIndex: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.array]).isRequired,
  isGrouped: _propTypes2.default.bool,
  isPie: _propTypes2.default.bool.isRequired
};

ColorPaletteSelector.defaultProps = {
  interpolated: true
};
module.exports = exports["default"];
//# sourceMappingURL=ColorPaletteSelector.js.map
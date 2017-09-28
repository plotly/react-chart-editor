"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TieredColorPicker = require("../TieredColorPicker");

var _TieredColorPicker2 = _interopRequireDefault(_TieredColorPicker);

var _tinycolor = require("tinycolor2");

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<TieredColorPicker />", function () {
  function render() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#fff";

    var colorObject = (0, _tinycolor2.default)(color);

    var rgb = colorObject.toRgb();

    var props = {
      color: colorObject.toRgbString(),
      rgb: rgb,
      onChangeComplete: jest.fn()
    };

    return (0, _enzyme.mount)(_react2.default.createElement(_TieredColorPicker2.default, props));
  }

  it("should render text to indicate free/pro colours", function () {
    var wrapper = render();

    var texts = wrapper.find(".color-picker-title");

    expect(texts.at(0).text()).toEqual("Custom colors (Pro users)");

    expect(texts.at(1).text()).toEqual("Default colors (Free users)");
  });

  it("swatch should display correct colour", function () {
    var color = "rgba(12, 12, 12, 0.5)";
    var wrapper = render(color);

    var swatch = wrapper.find(".color-picker-active-swatch");

    expect(swatch.prop("style").backgroundColor).toEqual(color);
  });
});
//# sourceMappingURL=TieredColorPicker-test.js.map
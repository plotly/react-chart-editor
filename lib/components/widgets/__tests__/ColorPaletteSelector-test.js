"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _ColorPaletteSelector = require("@workspace/components/widgets/ColorPaletteSelector");

var _ColorPaletteSelector2 = _interopRequireDefault(_ColorPaletteSelector);

var _color = require("@workspace/constants/color");

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ColorPaletteSelector", function () {
  it("completes colorscale if grouped traces length > # of colorscale's color blocks", function () {
    var userDataIndices = [0, 1, 2, 3, 4, 5, 6, 7];

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      userDataIndex: userDataIndices,
      isGrouped: true,
      colorscale: _color2.default[0],
      isPie: false
    }));

    var basicColorscaleLength = _color2.default[0].length;
    var colorpalette = component.find(".js-color-palette");
    var enhancedColorPaletteLength = colorpalette.nodes[0].props.children.length;

    expect(userDataIndices.length === enhancedColorPaletteLength).toBe(true);
    expect(basicColorscaleLength < enhancedColorPaletteLength).toBe(true);
  });

  it("completes colorscale for pie traces", function () {
    var additionalScales = ["rgb(1, 1, 1)", "rgb(3, 3, 3)"];
    var finalScale = _color2.default[0].concat(additionalScales);
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      userDataIndex: 0,
      colorscale: finalScale,
      isPie: true,
      interpolated: false
    }));

    var basicColorscaleLength = _color2.default[0].length;
    var colorpalette = component.find(".js-color-palette");
    var enhancedColorPaletteLength = colorpalette.nodes[0].props.children.length;

    expect(finalScale.length === enhancedColorPaletteLength).toBe(true);
    expect(basicColorscaleLength < enhancedColorPaletteLength).toBe(true);
  });

  it("passes the colorscale on click", function () {
    var fn = jest.fn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      onClick: fn,
      userDataIndex: 0,
      colorscale: _color2.default[0],
      isPie: false
    }));

    component.find(".js-color-palette").first().simulate("click");
    expect(fn).toBeCalledWith(_color2.default[0]);
  });

  it("passes un-nested colorscales when interpolated is false", function () {
    var fn = jest.fn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      onClick: fn,
      interpolated: false,
      userDataIndex: 0,
      isPie: false
    }));

    component.find(".js-color-palette").first().simulate("click");
    expect(fn).toBeCalledWith(_color2.default[0].map(function (colorPair) {
      return colorPair[1];
    }));
  });

  it("works with named plotly.js colorscales", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      colorscale: "Viridis",
      userDataIndex: 0,
      isPie: false
    }));

    var colorscales = component.state("colorscales");
    // The new unknown colorscale is added
    expect(colorscales.length).toBe(13);
  });

  it("adds a new colorscales correctly", function () {
    var aRealNewColorscale = [[0, "rgb(1, 1, 1)"], [1, "rgb(2, 2, 2)"]];
    var initialColorscalesLength = _color2.default.length;

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      colorscale: aRealNewColorscale,
      userDataIndex: 0,
      isPie: false
    }));

    var renderedColorscales = component.state("colorscales");
    expect(initialColorscalesLength + 1 === renderedColorscales.length).toBe(true);
  });

  it("does not add colorscale for trimmed down version of existing colorscale", function () {
    // Trimmed down version of existing colorscale
    var newColorscale = _color2.default[0].slice(0, 3);
    var initialColorscalesLength = _color2.default.length;

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPaletteSelector2.default, {
      colorscale: newColorscale,
      userDataIndex: 0,
      isPie: false
    }));

    var renderedColorscales = component.state("colorscales");
    expect(initialColorscalesLength === renderedColorscales.length).toBe(true);
  });
});
//# sourceMappingURL=ColorPaletteSelector-test.js.map
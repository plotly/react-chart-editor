import React from "react";
import { shallow } from "enzyme";

import ColorPaletteSelector from "@workspace/components/widgets/ColorPaletteSelector";
import COLOR_SCALES from "@workspace/constants/color";

describe("ColorPaletteSelector", () => {
  it("completes colorscale if grouped traces length > # of colorscale's color blocks", () => {
    const userDataIndices = [0, 1, 2, 3, 4, 5, 6, 7];

    const component = shallow(
      <ColorPaletteSelector
        userDataIndex={userDataIndices}
        isGrouped={true}
        colorscale={COLOR_SCALES[0]}
        isPie={false}
      />
    );

    const basicColorscaleLength = COLOR_SCALES[0].length;
    const colorpalette = component.find(".js-color-palette");
    const enhancedColorPaletteLength =
      colorpalette.nodes[0].props.children.length;

    expect(userDataIndices.length === enhancedColorPaletteLength).toBe(true);
    expect(basicColorscaleLength < enhancedColorPaletteLength).toBe(true);
  });

  it("completes colorscale for pie traces", () => {
    const additionalScales = ["rgb(1, 1, 1)", "rgb(3, 3, 3)"];
    const finalScale = COLOR_SCALES[0].concat(additionalScales);
    const component = shallow(
      <ColorPaletteSelector
        userDataIndex={0}
        colorscale={finalScale}
        isPie={true}
        interpolated={false}
      />
    );

    const basicColorscaleLength = COLOR_SCALES[0].length;
    const colorpalette = component.find(".js-color-palette");
    const enhancedColorPaletteLength =
      colorpalette.nodes[0].props.children.length;

    expect(finalScale.length === enhancedColorPaletteLength).toBe(true);
    expect(basicColorscaleLength < enhancedColorPaletteLength).toBe(true);
  });

  it("passes the colorscale on click", () => {
    const fn = jest.fn();
    const component = shallow(
      <ColorPaletteSelector
        onClick={fn}
        userDataIndex={0}
        colorscale={COLOR_SCALES[0]}
        isPie={false}
      />
    );

    component
      .find(".js-color-palette")
      .first()
      .simulate("click");
    expect(fn).toBeCalledWith(COLOR_SCALES[0]);
  });

  it("passes un-nested colorscales when interpolated is false", () => {
    const fn = jest.fn();
    const component = shallow(
      <ColorPaletteSelector
        onClick={fn}
        interpolated={false}
        userDataIndex={0}
        isPie={false}
      />
    );

    component
      .find(".js-color-palette")
      .first()
      .simulate("click");
    expect(fn).toBeCalledWith(COLOR_SCALES[0].map(colorPair => colorPair[1]));
  });

  it("works with named plotly.js colorscales", () => {
    const component = shallow(
      <ColorPaletteSelector
        colorscale="Viridis"
        userDataIndex={0}
        isPie={false}
      />
    );

    const colorscales = component.state("colorscales");
    // The new unknown colorscale is added
    expect(colorscales.length).toBe(13);
  });

  it("adds a new colorscales correctly", () => {
    const aRealNewColorscale = [[0, "rgb(1, 1, 1)"], [1, "rgb(2, 2, 2)"]];
    const initialColorscalesLength = COLOR_SCALES.length;

    const component = shallow(
      <ColorPaletteSelector
        colorscale={aRealNewColorscale}
        userDataIndex={0}
        isPie={false}
      />
    );

    const renderedColorscales = component.state("colorscales");
    expect(initialColorscalesLength + 1 === renderedColorscales.length).toBe(
      true
    );
  });

  it("does not add colorscale for trimmed down version of existing colorscale", () => {
    // Trimmed down version of existing colorscale
    const newColorscale = COLOR_SCALES[0].slice(0, 3);
    const initialColorscalesLength = COLOR_SCALES.length;

    const component = shallow(
      <ColorPaletteSelector
        colorscale={newColorscale}
        userDataIndex={0}
        isPie={false}
      />
    );

    const renderedColorscales = component.state("colorscales");
    expect(initialColorscalesLength === renderedColorscales.length).toBe(true);
  });
});

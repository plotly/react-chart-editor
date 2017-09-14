import React from "react";
import TieredColorPicker from "../TieredColorPicker";
import tinycolor from "tinycolor2";
import { mount } from "enzyme";

describe("<TieredColorPicker />", () => {
  function render(color = "#fff") {
    const colorObject = tinycolor(color);

    const rgb = colorObject.toRgb();

    const props = {
      color: colorObject.toRgbString(),
      rgb,
      onChangeComplete: jest.fn(),
    };

    return mount(<TieredColorPicker {...props} />);
  }

  it("should render text to indicate free/pro colours", () => {
    const wrapper = render();

    const texts = wrapper.find(".color-picker-title");

    expect(texts.at(0).text()).toEqual("Custom colors (Pro users)");

    expect(texts.at(1).text()).toEqual("Default colors (Free users)");
  });

  it("swatch should display correct colour", () => {
    const color = "rgba(12, 12, 12, 0.5)";
    const wrapper = render(color);

    const swatch = wrapper.find(".color-picker-active-swatch");

    expect(swatch.prop("style").backgroundColor).toEqual(color);
  });
});

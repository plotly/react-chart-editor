jest.mock("../../../../common/actions/notification");

import ColorPicker from "../ColorPicker";
import React from "react";
import tinycolor from "tinycolor2";
import { merge } from "ramda";
import { mockUser } from "_utils/testUtils";
import { mount } from "enzyme";
import { showNotification } from "@common/actions/notification";

describe("ColorPicker", () => {
  function render(additionalProps = {}, user = "community") {
    const currentUser = mockUser({ feature_set_id: user });

    const defaultProps = {
      selectedColor: "#fff",
      onColorChange: jest.fn(),
      dispatch: jest.fn(),
    };

    const context = { currentUser };

    const props = merge(defaultProps, additionalProps);

    return mount(<ColorPicker {...props} />, { context });
  }

  it(`should overwrite local state with props when the parent
        component passes in a new color`, () => {
    /*
             * Passing in default values should populate the local state
             * and the component DOM elements correctly.
             */
    const initialSelectedColor = "rgba(100, 10, 10, 0.8)";
    const onColorChange = jest.fn();
    const wrapper = render({
      selectedColor: initialSelectedColor,
      onColorChange: onColorChange,
    });

    let selectedColorText, swatchElement, swatchBackgroundColor;

    // initial user values should be rendered and assigned to local state.
    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual(
      tinycolor(initialSelectedColor).toHexString()
    );
    expect(swatchBackgroundColor).toEqual(initialSelectedColor);
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(
      initialSelectedColor
    );

    /*
             * Simulate a parent component sending new selected color prop.
             * Internal state should change and component should update and
             * props should match internal state.
             */
    const newColorFromProps = "rgba(28, 88, 88, 0.6)";
    wrapper.setProps({
      selectedColor: newColorFromProps,
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual(
      tinycolor(newColorFromProps).toHexString()
    );
    expect(swatchBackgroundColor).toEqual(newColorFromProps);
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(
      newColorFromProps
    );

    // Simulate a completed user interaction with the ColorPicker.
    const mockUserSelectedColor = "rgba(88, 20, 28, 0.2)";
    wrapper
      .instance()
      .onSelectedColorChange(tinycolor({ r: 88, g: 20, b: 28, a: 0.2 }));

    // Local state should be set, and onColorChange fired
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(
      mockUserSelectedColor
    );

    expect(onColorChange).toBeCalledWith(mockUserSelectedColor);

    /*
             * Pretend that user change was not accepted by the store.
             * Next props will change local state back to store state values.
             */
    const colorFromStore = "rgba(28, 88, 88, 0.6)";
    wrapper.setProps({
      selectedColor: colorFromStore,
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual(tinycolor(colorFromStore).toHexString());
    expect(swatchBackgroundColor).toEqual(colorFromStore);

    /*
             * Test passing in a HEX color from the store.
             * Our component only handles RGBA values internally for now, so
             * it should be equivalent, but it will spit out RGBA.
             */
    const hexColor = "#FFFFFF"; // White!
    wrapper.setProps({
      selectedColor: hexColor,
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    // Component will display HEX as text
    expect(selectedColorText).toEqual(tinycolor(hexColor).toHexString());

    // Here we expect the RGBA version of #FFFFFF as the style prop.
    const RGBAWhite = "rgb(255, 255, 255)";
    expect(swatchBackgroundColor).toEqual(RGBAWhite);
  });

  describe("colour tiering", () => {
    it("doesnt open upgrade dialogue if free colour is selected", () => {
      const wrapper = render();
      wrapper.setState({ isVisible: true });

      const picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#ffffff" });

      expect(wrapper.props().dispatch).not.toBeCalled();
    });

    it("opens notif and renders probadge if pro colour is selected", () => {
      const wrapper = render();
      wrapper.setState({ isVisible: true });

      const picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#aaa112" });

      const callArgs = showNotification.mock.calls[0];
      const opts = callArgs[1];
      expect(opts.showOnce).toBe(true);
    });

    it("should not open upgrade dialogue if logged in as pro", () => {
      const wrapper = render({}, "professional_2016_10");
      wrapper.setState({ isVisible: true });

      const picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#aaa112" });

      expect(wrapper.props().dispatch).not.toBeCalled();
    });
  });
});

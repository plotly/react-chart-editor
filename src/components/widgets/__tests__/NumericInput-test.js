import EditableText from "@workspace/components/widgets/EditableText";
import NumericInputStatefulWrapper from "@workspace/components/widgets/NumericInputStatefulWrapper";
import React from "react";
import { MIXED_VALUES } from "@workspace/constants/workspace";
import {
  UP_ARROW,
  DOWN_ARROW,
} from "@workspace/components/widgets/NumericInput";
import { mount } from "enzyme";

function addTextToInput(wrapper, text) {
  const input = wrapper.find(EditableText).find("input");
  input.simulate("change", { target: { value: text } });
  return input;
}

describe("NumericInputStatefulWrapper", () => {
  function render(overrideProps = {}) {
    const props = Object.assign(
      {
        value: 24,
        step: 2,
        min: 0,
        max: 100,
        onUpdate: jest.fn(),
      },
      overrideProps
    );

    return mount(<NumericInputStatefulWrapper {...props} />);
  }

  it("increases NumericInputStatefulWrapper value as expected", () => {
    const wrapper = render();
    const increaseButton = wrapper.find(".js-numeric-increase");
    expect(wrapper.prop("step")).toEqual(2);
    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    increaseButton.simulate("click");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(26);
  });

  it("decreases NumericInputStatefulWrapper value as expected", () => {
    const wrapper = render();
    const decreaseButton = wrapper.find(".js-numeric-decrease");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    decreaseButton.simulate("click");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("increases NumericInputStatefulWrapper value as expected onKeyDown", () => {
    const onUpdate = jest.fn();
    const wrapper = render({ onUpdate });

    const inputField = wrapper.find(EditableText);

    expect(wrapper.prop("step")).toEqual(2);
    expect(onUpdate).not.toBeCalled();

    inputField.simulate("keyDown", { keyCode: UP_ARROW });
    expect(onUpdate).toBeCalledWith(26);

    onUpdate.mockClear();

    inputField.simulate("keyDown", { keyCode: DOWN_ARROW });
    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("stays within min and max values when these props are provided", () => {
    let wrapper;

    wrapper = render({ value: 0 });
    wrapper.find(".js-numeric-decrease").simulate("click");
    expect(wrapper.prop("onUpdate")).toBeCalledWith(0);

    wrapper = render({ value: 100 });
    wrapper.find(".js-numeric-increase").simulate("click");
    expect(wrapper.prop("onUpdate")).toBeCalledWith(100);
  });

  it("increases NumericInputStatefulWrapper when MIXED_VALUE", () => {
    const wrapper = render({ value: MIXED_VALUES, min: 8 });
    const increaseButton = wrapper.find(".js-numeric-increase");

    increaseButton.simulate("click");

    // it calls update with the minumum value
    expect(wrapper.prop("onUpdate")).toBeCalledWith(8);

    // but it will continue to render '-' until parent sends in new prop
    expect(wrapper.find(EditableText).prop("text")).toEqual("-");
  });

  it("updates using defaultValue (when provided) on blank input", () => {
    const wrapper = render({ value: 2, defaultValue: 4 });

    addTextToInput(wrapper, "  ").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(4);
  });

  it("doesn't update on blank input when no default provided", () => {
    const wrapper = render({ value: 2 });

    addTextToInput(wrapper, "  ").simulate("blur");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();
  });

  it("truncates integers onBlur when integerOnly", () => {
    const wrapper = render({ value: 2, integerOnly: true });

    addTextToInput(wrapper, "22.5").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("calls onUpdate when bluring from MixedMode", () => {
    const wrapper = render({ value: MIXED_VALUES });

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    addTextToInput(wrapper, "22").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it('doesn\'t call onUpdate and shows "-" on bad MixedMode blur', () => {
    const wrapper = render({ value: MIXED_VALUES });

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    addTextToInput(wrapper, "hodor").simulate("blur");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    // but it will continue to render '-' until parent sends in new prop
    expect(wrapper.find(EditableText).prop("text")).toEqual("-");
  });
});

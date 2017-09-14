import DropdownWithTextInput from "../DropdownWithTextInput";
import React from "react";
import { mount } from "enzyme";
import { merge, append } from "ramda";

describe("DropdownWithTextInput", () => {
  const options = [
    { label: "label 1", value: "value 1" },
    { label: "label 2", value: "value 2" },
  ];

  function render(overrideProps = {}) {
    const defaultProps = {
      options,
      onUpdate: jest.fn(),
      value: options[0].value,
      minWidth: "100px",
      clearable: false,
    };

    const props = merge(defaultProps, overrideProps);
    return mount(<DropdownWithTextInput {...props} />);
  }

  function selectOption(wrapper, value) {
    const select = wrapper.ref("dropdown").prop("onChange");
    select(value);
  }

  it("calls onChange on existing dropdown option", () => {
    const wrapper = render();
    const secondOption = options[1].value;

    selectOption(wrapper, secondOption);
    expect(wrapper.prop("onUpdate")).toBeCalledWith(secondOption);
  });

  it("calls onChange on a custom option", () => {
    const wrapper = render();

    const value = "banana";
    const list = append(wrapper.prop("options"), {
      label: "potato",
      value,
    });

    wrapper.setState({ list });
    selectOption(wrapper, value);
    expect(wrapper.prop("onUpdate")).toBeCalledWith(value);
  });
});

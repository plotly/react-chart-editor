import AnchorPositioning from "../AnchorPositioning";
import React from "react";
import { mount } from "enzyme";

describe("AnchorPositioning", () => {
  function render(customProps) {
    const onOptionChange = jest.fn();
    const props = customProps || {
      onOptionChange,
      activeOption: "middle center",
    };

    return mount(<AnchorPositioning {...props} />);
  }

  it("initialy checks only the default active option", () => {
    const component = render();

    const selectedOption = component
      .find(".radio-item__input")
      .filterWhere(e => e.props().checked);

    expect(selectedOption.length).toBe(1);
    expect(selectedOption.props().value).toBe("middle center");
  });

  it("fires our onOptionChange prop onChange", () => {
    const component = render();

    const topLeftOption = component
      .find(".radio-item__input")
      .filterWhere(e => e.props().value === "top left");

    topLeftOption
      .props()
      .onChange({ target: { value: topLeftOption.props().value } });

    expect(component.props().onOptionChange).toBeCalledWith("top left");

    const bottomRightOption = component
      .find(".radio-item__input")
      .filterWhere(e => e.props().value === "bottom right");

    bottomRightOption
      .props()
      .onChange({ target: { value: bottomRightOption.props().value } });
    expect(component.props().onOptionChange).toBeCalledWith("bottom right");
  });
});

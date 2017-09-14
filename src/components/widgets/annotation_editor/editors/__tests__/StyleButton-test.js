import React from "react";
import { mount, shallow } from "enzyme";

import StyleButton from "../StyleButton";

describe("StyleButton", () => {
  const getButtonElement = component =>
    component.find(".rich-text-editor__styleButton");

  it("Renders an inactive StyleButton", () => {
    const labelElement = <span>B</span>;

    const component = shallow(
      <StyleButton
        active={false}
        label={labelElement}
        onToggle={() => {}}
        value="BOLD"
      />
    );

    const button = getButtonElement(component);

    expect(button.length).toBe(1);
    expect(button.prop("data-role")).toBe("button");
    expect(button.prop("data-pressed")).toBe(false);
    expect(button.contains(labelElement)).toBe(true);
  });

  it("Renders an active StyleButton", () => {
    const labelElement = <span>B</span>;

    const component = shallow(
      <StyleButton
        active={true}
        label={labelElement}
        onToggle={() => {}}
        value="BOLD"
      />
    );

    const activeClass = "rich-text-editor__styleButton--active";
    const button = getButtonElement(component);

    expect(button.hasClass(activeClass)).toBe(true);
    expect(button.prop("data-role")).toBe("button");
    expect(button.prop("data-pressed")).toBe(true);
    expect(button.contains(labelElement)).toBe(true);
  });

  it("Calls back when toggled", () => {
    const labelElement = <span>B</span>;
    const mockOnToggle = jest.genMockFn();

    const component = mount(
      <StyleButton
        active={false}
        label={labelElement}
        value={"BOLD"}
        onToggle={mockOnToggle}
      />
    );

    getButtonElement(component).simulate("mousedown");

    expect(mockOnToggle).toBeCalledWith("BOLD");
  });
});

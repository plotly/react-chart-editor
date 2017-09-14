import { mount } from "enzyme";
import React from "react";
import ToolMenuItemSubmenu from "../ToolMenuItemSubmenu";

describe("ToolMenuItemSubmenu", () => {
  it("opens and closes according to state", () => {
    const wrapper = mount(
      <ToolMenuItemSubmenu
        iconClass="icon-plotlylogo"
        title="First Submenu"
        mainText="This is the main text."
      >
        <div />
      </ToolMenuItemSubmenu>
    );

    // Make sure the component is rendered as expected
    expect(wrapper.state("isOpen")).toBe(false);

    // Check if a click changes the state back and forth
    wrapper
      .find(ToolMenuItemSubmenu)
      .find("span")
      .at(1)
      .simulate("click");

    expect(wrapper.state("isOpen")).toEqual(true);

    wrapper
      .find(ToolMenuItemSubmenu)
      .find("div")
      .at(1)
      .simulate("click");

    expect(wrapper.state("isOpen")).toEqual(false);
  });
});

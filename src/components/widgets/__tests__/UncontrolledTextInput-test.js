import DelayedTextInput from "@workspace/components/widgets/DelayedTextInput";
import UncontrolledTextInput from "@workspace/components/widgets/UncontrolledTextInput";
import React from "react";
import { mount } from "enzyme";

describe("UncontrolledTextInput", () => {
  var onUpdate = jest.fn();

  it("should render a DelayedTextInput if immediate is false", () => {
    const component = mount(
      <UncontrolledTextInput value="" onUpdate={onUpdate} immediate={false} />
    );
    expect(component.find(DelayedTextInput).length).toBe(1);
  });

  it("should render a bare input if immediate is true", () => {
    const component = mount(
      <UncontrolledTextInput value="" onUpdate={onUpdate} immediate={true} />
    );

    expect(component.find(DelayedTextInput).length).toBe(0);
  });
});

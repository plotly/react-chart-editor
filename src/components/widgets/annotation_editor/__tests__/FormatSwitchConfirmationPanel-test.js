import React from "react";
import { shallow } from "enzyme";

import FormatSwitchConfirmationPanel from "@workspace/components/widgets/annotation_editor/FormatSwitchConfirmationPanel";

describe("FormatSwitchConfirmationPanel", () => {
  it("calls onCancel when Cancel is clicked", () => {
    const mockOnCancel = jest.genMockFn();
    const component = shallow(
      <FormatSwitchConfirmationPanel
        onCancel={mockOnCancel}
        onContinue={() => {}}
        value=""
      />
    );

    component.find(".confirmation-panel__btn-cancel").simulate("click");

    expect(mockOnCancel).toBeCalled();
  });

  it("calls onContinue when Continue is clicked", () => {
    const mockOnContinue = jest.genMockFn();
    const component = shallow(
      <FormatSwitchConfirmationPanel
        onCancel={() => {}}
        onContinue={mockOnContinue}
        value=""
      />
    );

    component.find(".confirmation-panel__btn-continue").simulate("click");

    expect(mockOnContinue).toBeCalled();
  });

  it("shows the correct message for non-latex value", () => {
    const component = shallow(
      <FormatSwitchConfirmationPanel
        onCancel={() => {}}
        onContinue={() => {}}
        value="Some text"
      />
    );

    expect(component.text()).toContain("convert your note to LaTeX");
  });

  it("shows the correct message for latex value with text", () => {
    const component = shallow(
      <FormatSwitchConfirmationPanel
        onCancel={() => {}}
        onContinue={() => {}}
        value="$\text{foo}$"
      />
    );

    expect(component.text()).toContain(
      "convert your LaTeX expression into raw text"
    );
  });

  it("shows the correct message for latex value without text", () => {
    const component = shallow(
      <FormatSwitchConfirmationPanel
        onCancel={() => {}}
        onContinue={() => {}}
        value="$\alpha$"
      />
    );

    expect(component.text()).toContain("will remove your expression");
  });
});

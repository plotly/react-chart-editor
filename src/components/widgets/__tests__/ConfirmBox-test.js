import React from "react";
import { shallow } from "enzyme";

import ConfirmBox from "../ConfirmBox";

describe("ConfirmBox", () => {
  let defaultProps;
  let message;
  let onConfirm;
  let onCancel;

  beforeEach(() => {
    message = "I hereby allow Plotly to be the sole beneficiary of my will";
    onCancel = jest.genMockFn();
    onConfirm = jest.genMockFn();
    defaultProps = { message, onCancel, onConfirm };
  });

  it("renders with minimal props and has decent defaults", () => {
    const minimalProps = { message, onCancel, onConfirm };
    const wrapper = shallow(<ConfirmBox {...minimalProps} />);

    // Cancel button.
    const cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.text()).toEqual("Cancel");

    // Confirm button.
    const confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.text()).toEqual("Confirm");

    // Header.
    const header = wrapper.find(".js-confirm-box__header");
    expect(header.text()).toEqual("Confirm?");
  });

  it("calls onConfirm and onCancel when buttons are clicked", () => {
    const wrapper = shallow(<ConfirmBox {...defaultProps} />);

    const confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.length).toEqual(1);
    confirmButton.simulate("click");
    expect(onConfirm).toBeCalled();

    const cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.length).toEqual(1);
    cancelButton.simulate("click");
    expect(onCancel).toBeCalled();
  });

  it("renders text in the right places", () => {
    // In case more things are added to defaultProps. Be explicit here.
    const cancelText = "no.";
    const confirmText = "yes!";
    const headerText = "ready?";
    const props = Object.assign({}, defaultProps, {
      cancelText,
      confirmText,
      headerText,
    });

    const wrapper = shallow(<ConfirmBox {...props} />);

    // Cancel button.
    const cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.text()).toEqual(cancelText);

    // Confirm button.
    const confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.text()).toEqual(confirmText);

    // Header.
    const header = wrapper.find(".js-confirm-box__header");
    expect(header.text()).toEqual(headerText);
  });

  it("allows gives us a wrapper div to do additional styling", () => {
    const wrapperClassName = "mc-hammer";
    const props = { ...defaultProps, wrapperClassName };
    const wrapper = shallow(<ConfirmBox {...props} />);

    // Check that the wrapper has the expected class.
    expect(wrapper.hasClass(wrapperClassName)).toBe(true);
  });
});

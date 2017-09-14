import DelayedTextInput from "@workspace/components/widgets/DelayedTextInput";
import React from "react";
import { mount } from "enzyme";

describe("DelayedTextInput", () => {
  function render(value, props) {
    // props.onEnter = props.onEnter || null;
    props.onUpdate = props.onUpdate || jest.fn();

    return mount(<DelayedTextInput value={value} {...props} />);
  }

  it("renders text", () => {
    var expected = "cool placeholder text";
    var component = render(expected, {});
    var actual = component.ref("text").prop("value");
    expect(actual).toEqual(expected);
  });

  describe("input type", () => {
    it("defaults to a text input", () => {
      var component = render("", {});
      var $input = component.ref("text");
      expect($input.prop("type")).toEqual("text");
    });

    it("renders a password input", () => {
      var component = render("", { type: "password" });
      var $input = component.ref("text");
      expect($input.prop("type")).toEqual("password");
    });
  });

  describe("when Enter is pressed", () => {
    var enterKey = { key: "Enter", keyCode: 13, which: 13 };

    it("calls the onEnter handler but not onUpdate", () => {
      var onUpdate = jest.fn();
      var onEnter = jest.fn();
      var component = render("test", { onUpdate, onEnter });
      var node = component.ref("text");
      expect(onUpdate).not.toBeCalled();
      expect(onEnter).not.toBeCalled();
      node.simulate("keyDown", enterKey);
      expect(onUpdate).not.toBeCalled();
      expect(onEnter).toBeCalled();
    });

    it("calls the onUpdate handler if onEnter does not exist", () => {
      var onUpdate = jest.fn();
      var component = render("test", { onUpdate });
      var node = component.ref("text");
      expect(onUpdate).not.toBeCalled();
      node.simulate("keyDown", enterKey);
      expect(onUpdate).toBeCalled();
    });
  });

  describe("when escape is pressed", () => {
    var escapeKey = { key: "Escape", keyCode: 27, which: 27 };

    it("reverts the value without calling onUpdate", () => {
      var onUpdate = jest.fn();
      var component = render("cheese", { onUpdate });
      expect(component.state()).toEqual({ value: "cheese" });

      // user types
      component.setState({ value: "wine" });
      expect(component.state()).toEqual({ value: "wine" });

      // user presses escape
      component.ref("text").simulate("keyDown", escapeKey);
      expect(component.state()).toEqual({ value: "cheese" });
      expect(onUpdate).not.toBeCalled();
    });
  });

  describe("on blur", () => {
    it("calls the onUpdate handler", () => {
      var onUpdate = jest.fn();
      var component = render("test", { onUpdate });
      expect(onUpdate).not.toBeCalled();
      component.simulate("blur");
      expect(onUpdate).toBeCalled();
    });
  });

  it("highlights text on focus but not subsequent click", () => {
    var mockSelect = jest.fn();
    var component = render("test", {});
    var node = component.ref("text");

    // first click focuses before the click event
    node.simulate("focus", { target: { select: mockSelect } });
    node.simulate("click", { target: { select: mockSelect } });
    expect(mockSelect.mock.calls.length).toBe(1);

    // click again - no select
    node.simulate("click", { target: { select: mockSelect } });
    expect(mockSelect.mock.calls.length).toBe(1);
  });

  it("does not highlight if autoSelect is false", () => {
    var mockSelect = jest.fn();
    var component = render("test", { autoSelect: false });
    var node = component.ref("text");

    // first click focuses before the click event
    node.simulate("focus", { target: { select: mockSelect } });
    node.simulate("click", { target: { select: mockSelect } });
    expect(mockSelect).not.toBeCalled();
  });
});

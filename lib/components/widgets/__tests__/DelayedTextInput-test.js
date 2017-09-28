"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _DelayedTextInput = require("@workspace/components/widgets/DelayedTextInput");

var _DelayedTextInput2 = _interopRequireDefault(_DelayedTextInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("DelayedTextInput", function () {
  function render(value, props) {
    // props.onEnter = props.onEnter || null;
    props.onUpdate = props.onUpdate || jest.fn();

    return (0, _enzyme.mount)(_react2.default.createElement(_DelayedTextInput2.default, _extends({ value: value }, props)));
  }

  it("renders text", function () {
    var expected = "cool placeholder text";
    var component = render(expected, {});
    var actual = component.ref("text").prop("value");
    expect(actual).toEqual(expected);
  });

  describe("input type", function () {
    it("defaults to a text input", function () {
      var component = render("", {});
      var $input = component.ref("text");
      expect($input.prop("type")).toEqual("text");
    });

    it("renders a password input", function () {
      var component = render("", { type: "password" });
      var $input = component.ref("text");
      expect($input.prop("type")).toEqual("password");
    });
  });

  describe("when Enter is pressed", function () {
    var enterKey = { key: "Enter", keyCode: 13, which: 13 };

    it("calls the onEnter handler but not onUpdate", function () {
      var onUpdate = jest.fn();
      var onEnter = jest.fn();
      var component = render("test", { onUpdate: onUpdate, onEnter: onEnter });
      var node = component.ref("text");
      expect(onUpdate).not.toBeCalled();
      expect(onEnter).not.toBeCalled();
      node.simulate("keyDown", enterKey);
      expect(onUpdate).not.toBeCalled();
      expect(onEnter).toBeCalled();
    });

    it("calls the onUpdate handler if onEnter does not exist", function () {
      var onUpdate = jest.fn();
      var component = render("test", { onUpdate: onUpdate });
      var node = component.ref("text");
      expect(onUpdate).not.toBeCalled();
      node.simulate("keyDown", enterKey);
      expect(onUpdate).toBeCalled();
    });
  });

  describe("when escape is pressed", function () {
    var escapeKey = { key: "Escape", keyCode: 27, which: 27 };

    it("reverts the value without calling onUpdate", function () {
      var onUpdate = jest.fn();
      var component = render("cheese", { onUpdate: onUpdate });
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

  describe("on blur", function () {
    it("calls the onUpdate handler", function () {
      var onUpdate = jest.fn();
      var component = render("test", { onUpdate: onUpdate });
      expect(onUpdate).not.toBeCalled();
      component.simulate("blur");
      expect(onUpdate).toBeCalled();
    });
  });

  it("highlights text on focus but not subsequent click", function () {
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

  it("does not highlight if autoSelect is false", function () {
    var mockSelect = jest.fn();
    var component = render("test", { autoSelect: false });
    var node = component.ref("text");

    // first click focuses before the click event
    node.simulate("focus", { target: { select: mockSelect } });
    node.simulate("click", { target: { select: mockSelect } });
    expect(mockSelect).not.toBeCalled();
  });
});
//# sourceMappingURL=DelayedTextInput-test.js.map
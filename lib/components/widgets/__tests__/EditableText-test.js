"use strict";

jest.dontMock("../EditableText");

describe("EditableText", function () {
  var React;
  var ReactDOM;
  var TestUtils;
  var EditableText;

  beforeEach(function () {
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    EditableText = require("../EditableText");
  });

  function render(text, callbacks, type) {
    var callbacks = callbacks || {};
    var onChange = callbacks.onChange || jest.genMockFunction();
    var onUpdate = callbacks.onUpdate || jest.genMockFunction();

    return TestUtils.renderIntoDocument(React.createElement(EditableText, {
      text: text,
      type: type,
      onChange: onChange,
      onUpdate: onUpdate
    }));
  }

  it("renders text", function () {
    var expected = "cool placeholder text";
    var component = render(expected);
    var actual = component.refs.text.value;
    expect(actual).toEqual(expected);
  });

  describe("input type", function () {
    it("defaults to a text input", function () {
      var component = render();
      var $input = component.refs.text;
      expect($input.type).toEqual("text");
    });

    it("renders a password input", function () {
      var component = render("", {}, "password");
      var $input = component.refs.text;
      expect($input.type).toEqual("password");
    });
  });

  describe("on user input", function () {
    it("calls the onChange handler", function () {
      var onChange = jest.genMockFunction();
      var component = render("test", { onChange: onChange });
      var node = ReactDOM.findDOMNode(component);
      expect(onChange).not.toBeCalled();
      TestUtils.Simulate.change(node, { target: { value: "a" } });
      expect(onChange).toBeCalled();
    });
  });

  describe("on save", function () {
    it("calls the onUpdate handler", function () {
      var onUpdate = jest.genMockFunction();
      var component = render("test", { onUpdate: onUpdate });
      var node = ReactDOM.findDOMNode(component);
      expect(onUpdate).not.toBeCalled();
      TestUtils.Simulate.blur(node);
      expect(onUpdate).toBeCalled();
    });

    it("allows saving by pressing the enter key", function () {
      var onUpdate = jest.genMockFunction();
      var component = render("test", { onUpdate: onUpdate });
      var node = ReactDOM.findDOMNode(component);

      component.refs.text.blur = function () {
        return TestUtils.Simulate.blur(component.refs.text);
      };

      expect(onUpdate).not.toBeCalled();
      TestUtils.Simulate.change(node, { target: { value: "hodor" } });
      TestUtils.Simulate.keyPress(node, { keyCode: 13 });
      expect(onUpdate).toBeCalled();
    });
  });

  it("highlights text on click", function () {
    var mockSelect = jest.genMockFunction();
    var node = ReactDOM.findDOMNode(render("test"));
    TestUtils.Simulate.click(node, { target: { select: mockSelect } });
    expect(mockSelect).toBeCalled();
  });
});
//# sourceMappingURL=EditableText-test.js.map
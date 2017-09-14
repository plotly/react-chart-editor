jest.dontMock("../TextAreaInput");

import deepAssign from "assign-deep";

describe("TextAreaInput", () => {
  let TextAreaInput;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    TextAreaInput = require("../TextAreaInput");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(
    props = {
      value: "First Note",
      placeholder: "Some placeholder text...",
      onChange: jest.genMockFn(),
    }
  ) {
    return TestUtils.renderIntoDocument(<TextAreaInput {...props} />);
  }

  it("passes on the new value on change and updates state", () => {
    const onChange = jest.genMockFn();
    const component = render();

    expect(component).toBeDefined();
    expect(component.state.value).toEqual("First Note");
    expect(component.props.onChange).not.toBeCalled();
    TestUtils.Simulate.change(component.refs.textinput, {
      target: { value: "A change of text" },
    });
    expect(component.props.onChange).toBeCalledWith("A change of text");
    expect(component.state.value).toEqual("A change of text");
    expect(component.refs.textinput.value).toEqual("A change of text");
  });

  it("should update local state and value on new props from parent", () => {
    const onChange = jest.genMockFn();
    const component = render();

    expect(component.state.value).toEqual("First Note");
    component.componentWillReceiveProps({
      value: "Crazy Craig",
    });
    expect(component.state.value).toEqual("Crazy Craig");
    expect(component.refs.textinput.value).toEqual("Crazy Craig");
  });
});

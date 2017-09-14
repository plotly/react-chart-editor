jest.dontMock("../DashSelector");

import deepAssign from "assign-deep";

describe("DashSelector", () => {
  let DashSelector;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    DashSelector = require("../DashSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(
    props = {
      activeOption: "dash",
      lineColor: "rgb(31, 119, 180)",
      onChange: jest.genMockFn(),
    }
  ) {
    return TestUtils.renderIntoDocument(<DashSelector {...props} />);
  }

  it("passes on the new value on change", () => {
    const onChange = jest.genMockFn();
    const component = render();
    const dropdown = component.refs.dropdown;
    const firstOption = component.refs.dropdown.props.options[0].value;

    expect(component).toBeDefined();
    expect(component.props.onChange).not.toBeCalled();
    dropdown.props.onChange(firstOption);
    expect(component.props.onChange).toBeCalledWith("solid");
  });

  it("should update local state on new props from parent", () => {
    const onChange = jest.genMockFn();
    const component = render();

    expect(component.state.activeOption).toEqual("dash");
    expect(component.state.lineColor).toEqual("rgb(31, 119, 180)");
    component.componentWillReceiveProps({
      activeOption: "longdash",
      lineColor: "rgb(255, 119, 180)",
    });
    expect(component.state.activeOption).toEqual("longdash");
    expect(component.state.lineColor).toEqual("rgb(255, 119, 180)");
  });
});

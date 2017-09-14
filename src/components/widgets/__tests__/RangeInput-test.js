import RangeInput from "@workspace/components/widgets/RangeInput";
import React from "react";
import TestUtils from "react-dom/test-utils";
import deepAssign from "assign-deep";
import { findDOMNode } from "react-dom";

describe("RangeInput", () => {
  function render(props) {
    const propsWithDefault = deepAssign(
      {
        value: [5, 24],
        onChange: jest.genMockFn(),
        min: 0,
        max: 100,
      },
      props || {}
    );
    return TestUtils.renderIntoDocument(<RangeInput {...propsWithDefault} />);
  }

  it("renders RangeInput as expected", () => {
    const component = render();
    expect(component).toBeDefined();
    expect(component.refs.inputMin.props.value).toEqual(5);
    expect(component.refs.inputMax.props.value).toEqual(24);
  });

  it("should update local state and value on new props from parent", () => {
    const component = render();

    expect(component.state).toEqual({
      valueMin: 5,
      valueMax: 24,
    });
    component.componentWillReceiveProps({
      value: [48, 69],
    });
    expect(component.state.valueMin).toEqual(48);
    expect(component.state.valueMax).toEqual(69);
    expect(component.refs.inputMin.props.value).toEqual(48);
    expect(component.refs.inputMax.props.value).toEqual(69);
  });

  it("component text input fires our onChange prop", () => {
    const component = render();

    TestUtils.Simulate.change(findDOMNode(component.refs.inputMin), {
      target: 7,
    });
    expect(component.props.onChange).not.toBeCalled();
    const minNode = findDOMNode(component.refs.inputMin);
    TestUtils.Simulate.keyPress(minNode, {
      key: "Enter",
      keyCode: 13,
      which: 13,
    });
    component.onUpdate(7);
  });
});

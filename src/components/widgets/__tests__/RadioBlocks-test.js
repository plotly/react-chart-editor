jest.dontMock("../RadioBlocks");

import deepAssign from "assign-deep";

describe("RadioBlocks", () => {
  let RadioBlocks;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    RadioBlocks = require("../RadioBlocks");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(props) {
    const onOptionChange = jest.genMockFn();

    var props = deepAssign(
      {
        options: [
          { value: true, label: "Bing" },
          { value: false, label: "Bang" },
        ],
        onOptionChange: onOptionChange,
        activeOption: true,
      },
      props || {}
    );

    return TestUtils.renderIntoDocument(<RadioBlocks {...props} />);
  }

  it("Default active option is correctly checked", () => {
    const component = render();

    // Make sure that default active option is correctly 'checked'

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });

  it("component onChange fires our onOptionChange prop", () => {
    const component = render();
    // Make sure that component onChange fires our onOptionChange prop

    TestUtils.Simulate.click(component.refs.Bang);
    expect(component.props.onOptionChange).toBeCalledWith(false);

    expect(component.refs.Bing.checked).toEqual(false);
    expect(component.refs.Bang.checked).toEqual(true);

    TestUtils.Simulate.click(component.refs.Bing);
    expect(component.props.onOptionChange).toBeCalledWith(false);

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });

  it("component onChange fires our onOptionChange prop with correct values", () => {
    const component = render({
      options: [
        { value: "on", label: "Bing" },
        { value: "off", label: "Bang" },
      ],
    });
    // Make sure that component onChange fires our onOptionChange prop

    TestUtils.Simulate.click(component.refs.Bang);
    expect(component.props.onOptionChange).toBeCalledWith("off");

    expect(component.refs.Bing.checked).toEqual(false);
    expect(component.refs.Bang.checked).toEqual(true);

    TestUtils.Simulate.click(component.refs.Bing);
    expect(component.props.onOptionChange).toBeCalledWith("on");

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });
});

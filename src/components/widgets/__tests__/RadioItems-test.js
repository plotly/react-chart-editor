jest.dontMock("../RadioItems");

import deepAssign from "assign-deep";

describe("RadioItems", () => {
  let RadioItems;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    RadioItems = require("../RadioItems");
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

    return TestUtils.renderIntoDocument(<RadioItems {...props} />);
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
    TestUtils.Simulate.change(component.refs.Bing, {
      target: component.refs.Bing,
    });
    expect(component.props.onOptionChange).toBeCalledWith(true);

    TestUtils.Simulate.change(component.refs.Bang, {
      target: component.refs.Bang,
    });
    expect(component.props.onOptionChange).toBeCalledWith(false);
  });

  it("returns the icon layout if icons are passed in", () => {
    const component = render({
      options: [
        { value: true, label: "Bing", icon: "icon-align-left" },
        { value: false, label: "Bang", icon: "icon-align-right" },
      ],
    });

    // Make sure that default active option is correctly 'checked'
    expect(component.refs.iconOption).toBeDefined();
    expect(component.refs.textOption).not.toBeDefined();
  });

  it("return the text layout if no icons are passed in", () => {
    const component = render({
      options: [
        { value: true, label: "Bing" },
        { value: false, label: "Bang" },
      ],
    });

    // Make sure that default active option is correctly 'checked'
    expect(component.refs.iconOption).not.toBeDefined();
    expect(component.refs.textOption).toBeDefined();
  });
});

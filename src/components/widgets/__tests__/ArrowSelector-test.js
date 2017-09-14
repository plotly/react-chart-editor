jest.dontMock("../ArrowSelector");

describe("ArrowSelector", () => {
  const plotlyjsBundlePath =
    "../../../../../../../../plotlyjs/static/" +
    "plotlyjs/build/plotlyjs-bundle.js";
  let ArrowSelector;
  let React;
  let ReactDOM;
  let TestUtils;
  let Plotly;

  beforeEach(() => {
    ArrowSelector = require("../ArrowSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    Plotly = require(plotlyjsBundlePath);
  });

  function render(
    props = { activeOption: 3, onChange: jest.genMockFn(), Plotly: Plotly }
  ) {
    return TestUtils.renderIntoDocument(<ArrowSelector {...props} />);
  }

  it("passes on the new value on change", () => {
    const onChange = jest.genMockFn();
    const component = render();
    const dropdown = component.refs.dropdown;
    const firstOption = component.refs.dropdown.props.options[0].value;

    expect(component).toBeDefined();
    expect(component.props.onChange).not.toBeCalled();
    dropdown.props.onChange(firstOption);
    expect(component.props.onChange).toBeCalledWith(0);
  });

  it("should update local state on new props from parent", () => {
    const onChange = jest.genMockFn();
    const component = render();

    expect(component.state.activeOption).toEqual(3);
    component.componentWillReceiveProps({
      activeOption: 7,
    });
    expect(component.state.activeOption).toEqual(7);
  });
});

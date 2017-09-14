jest.dontMock("../CheckboxGroup");

describe("CheckboxGroup", () => {
  let React;
  let ReactDOM;
  let TestUtils;
  let CheckboxGroup;

  beforeEach(() => {
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    CheckboxGroup = require("../CheckboxGroup");
  });

  function render(props = {}) {
    return TestUtils.renderIntoDocument(<CheckboxGroup {...props} />);
  }

  it("should fire onChange with correct new options on click", () => {
    // Set up initial options passed down as props
    const options = [
      {
        label: "Apples",
        value: "apples",
        checked: false,
      },
      {
        label: "Oranges",
        value: "oranges",
        checked: false,
      },
      {
        label: "Banaynays",
        value: "banaynays",
        checked: false,
      },
    ];

    const onChange = jest.genMockFn();
    const component = render({
      options,
      onChange,
    });

    expect(component).toBeDefined();

    // Click on the apples checkbox
    const applesCheckbox = component.refs.apples;

    expect(onChange).not.toBeCalled();

    TestUtils.Simulate.click(applesCheckbox);

    // onChange handler should be called with new options
    expect(onChange).toBeCalledWith([
      {
        label: "Apples",
        value: "apples",
        checked: true,
      },
      {
        label: "Oranges",
        value: "oranges",
        checked: false,
      },
      {
        label: "Banaynays",
        value: "banaynays",
        checked: false,
      },
    ]);
  });

  it("should update local state on new props from parent", () => {
    // Set up initial options passed down as props
    const options = [
      {
        label: "Apples",
        value: "apples",
        checked: false,
      },
      {
        label: "Oranges",
        value: "oranges",
        checked: false,
      },
      {
        label: "Banaynays",
        value: "banaynays",
        checked: false,
      },
    ];

    const onChange = jest.genMockFn();
    const component = render({
      options,
      onChange,
    });

    // Local component state and props should be the same
    expect(component.state.options).toEqual(options);

    const newOptionsFromParent = [
      {
        label: "Apples",
        value: "apples",
        checked: true,
      },
      {
        label: "Oranges",
        value: "oranges",
        checked: true,
      },
      {
        label: "Banaynays",
        value: "banaynays",
        checked: true,
      },
    ];

    // Simulate parent passing down some new props
    component.componentWillReceiveProps({
      options: newOptionsFromParent,
    });

    // Local component state shoudl be synced
    expect(component.state.options).toEqual(newOptionsFromParent);
  });
});

jest.dontMock("../Dropdown");

describe("Dropdown", () => {
  let React;
  let ReactDOM;
  let TestUtils;
  let Dropdown;

  beforeEach(() => {
    React = require("react");
    TestUtils = require("react-dom/test-utils");
    Dropdown = require("../Dropdown");
  });

  function render(props = {}) {
    return TestUtils.renderIntoDocument(<Dropdown {...props} />);
  }

  it("should pass out new option value on change", () => {
    const options = [
      {
        label: "Cookies",
        value: "cookies",
      },
      {
        label: "Bubblegum",
        value: "bubblegum",
      },
    ];

    const onChange = jest.genMockFn();

    const component = render({
      options: options,
      onChange: onChange,
    });

    const dropdown = component.refs.dropdown;

    dropdown.props.onChange(options[1]);

    // Should get value, not full option.
    expect(onChange).toBeCalledWith(options[1].value);
  });

  it("should pass null as onChange arg when cleared", () => {
    const options = [
      {
        label: "Cookies",
        value: "cookies",
      },
      {
        label: "Bubblegum",
        value: "bubblegum",
      },
    ];

    const onChange = jest.genMockFn();

    const component = render({
      options: options,
      onChange: onChange,
    });

    const dropdown = component.refs.dropdown;

    // Simulate clearing the select
    dropdown.props.onChange("");

    // Should get null, then the action passed can handle.
    expect(onChange).toBeCalledWith(null);
  });

  it("should pass out new option array on multi change", () => {
    const options = [
      {
        label: "Cookies",
        value: "cookies",
      },
      {
        label: "Bubblegum",
        value: "bubblegum",
      },
      {
        label: "Twizzlers",
        value: "twizzlers",
      },
    ];

    const onChange = jest.genMockFn();

    const component = render({
      options: options,
      onChange: onChange,
      value: options,
      multi: true,
    });

    const dropdown = component.refs.dropdown;

    // Simluate removing the first option, options[0]
    dropdown.props.onChange([options[1], options[2]]);

    // Should get array of full options, not just values.
    expect(onChange).toBeCalledWith([options[1].value, options[2].value]);
  });
});

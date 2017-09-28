"use strict";

jest.dontMock("../Dropdown");

describe("Dropdown", function () {
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;
  var Dropdown = void 0;

  beforeEach(function () {
    React = require("react");
    TestUtils = require("react-dom/test-utils");
    Dropdown = require("../Dropdown");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return TestUtils.renderIntoDocument(React.createElement(Dropdown, props));
  }

  it("should pass out new option value on change", function () {
    var options = [{
      label: "Cookies",
      value: "cookies"
    }, {
      label: "Bubblegum",
      value: "bubblegum"
    }];

    var onChange = jest.genMockFn();

    var component = render({
      options: options,
      onChange: onChange
    });

    var dropdown = component.refs.dropdown;

    dropdown.props.onChange(options[1]);

    // Should get value, not full option.
    expect(onChange).toBeCalledWith(options[1].value);
  });

  it("should pass null as onChange arg when cleared", function () {
    var options = [{
      label: "Cookies",
      value: "cookies"
    }, {
      label: "Bubblegum",
      value: "bubblegum"
    }];

    var onChange = jest.genMockFn();

    var component = render({
      options: options,
      onChange: onChange
    });

    var dropdown = component.refs.dropdown;

    // Simulate clearing the select
    dropdown.props.onChange("");

    // Should get null, then the action passed can handle.
    expect(onChange).toBeCalledWith(null);
  });

  it("should pass out new option array on multi change", function () {
    var options = [{
      label: "Cookies",
      value: "cookies"
    }, {
      label: "Bubblegum",
      value: "bubblegum"
    }, {
      label: "Twizzlers",
      value: "twizzlers"
    }];

    var onChange = jest.genMockFn();

    var component = render({
      options: options,
      onChange: onChange,
      value: options,
      multi: true
    });

    var dropdown = component.refs.dropdown;

    // Simluate removing the first option, options[0]
    dropdown.props.onChange([options[1], options[2]]);

    // Should get array of full options, not just values.
    expect(onChange).toBeCalledWith([options[1].value, options[2].value]);
  });
});
//# sourceMappingURL=Dropdown-test.js.map
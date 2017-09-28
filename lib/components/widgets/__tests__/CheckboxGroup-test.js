"use strict";

jest.dontMock("../CheckboxGroup");

describe("CheckboxGroup", function () {
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;
  var CheckboxGroup = void 0;

  beforeEach(function () {
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    CheckboxGroup = require("../CheckboxGroup");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return TestUtils.renderIntoDocument(React.createElement(CheckboxGroup, props));
  }

  it("should fire onChange with correct new options on click", function () {
    // Set up initial options passed down as props
    var options = [{
      label: "Apples",
      value: "apples",
      checked: false
    }, {
      label: "Oranges",
      value: "oranges",
      checked: false
    }, {
      label: "Banaynays",
      value: "banaynays",
      checked: false
    }];

    var onChange = jest.genMockFn();
    var component = render({
      options: options,
      onChange: onChange
    });

    expect(component).toBeDefined();

    // Click on the apples checkbox
    var applesCheckbox = component.refs.apples;

    expect(onChange).not.toBeCalled();

    TestUtils.Simulate.click(applesCheckbox);

    // onChange handler should be called with new options
    expect(onChange).toBeCalledWith([{
      label: "Apples",
      value: "apples",
      checked: true
    }, {
      label: "Oranges",
      value: "oranges",
      checked: false
    }, {
      label: "Banaynays",
      value: "banaynays",
      checked: false
    }]);
  });

  it("should update local state on new props from parent", function () {
    // Set up initial options passed down as props
    var options = [{
      label: "Apples",
      value: "apples",
      checked: false
    }, {
      label: "Oranges",
      value: "oranges",
      checked: false
    }, {
      label: "Banaynays",
      value: "banaynays",
      checked: false
    }];

    var onChange = jest.genMockFn();
    var component = render({
      options: options,
      onChange: onChange
    });

    // Local component state and props should be the same
    expect(component.state.options).toEqual(options);

    var newOptionsFromParent = [{
      label: "Apples",
      value: "apples",
      checked: true
    }, {
      label: "Oranges",
      value: "oranges",
      checked: true
    }, {
      label: "Banaynays",
      value: "banaynays",
      checked: true
    }];

    // Simulate parent passing down some new props
    component.componentWillReceiveProps({
      options: newOptionsFromParent
    });

    // Local component state shoudl be synced
    expect(component.state.options).toEqual(newOptionsFromParent);
  });
});
//# sourceMappingURL=CheckboxGroup-test.js.map
"use strict";

jest.dontMock("../ArrowSelector");

describe("ArrowSelector", function () {
  var plotlyjsBundlePath = "../../../../../../../../plotlyjs/static/" + "plotlyjs/build/plotlyjs-bundle.js";
  var ArrowSelector = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;
  var Plotly = void 0;

  beforeEach(function () {
    ArrowSelector = require("../ArrowSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    Plotly = require(plotlyjsBundlePath);
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { activeOption: 3, onChange: jest.genMockFn(), Plotly: Plotly };

    return TestUtils.renderIntoDocument(React.createElement(ArrowSelector, props));
  }

  it("passes on the new value on change", function () {
    var onChange = jest.genMockFn();
    var component = render();
    var dropdown = component.refs.dropdown;
    var firstOption = component.refs.dropdown.props.options[0].value;

    expect(component).toBeDefined();
    expect(component.props.onChange).not.toBeCalled();
    dropdown.props.onChange(firstOption);
    expect(component.props.onChange).toBeCalledWith(0);
  });

  it("should update local state on new props from parent", function () {
    var onChange = jest.genMockFn();
    var component = render();

    expect(component.state.activeOption).toEqual(3);
    component.componentWillReceiveProps({
      activeOption: 7
    });
    expect(component.state.activeOption).toEqual(7);
  });
});
//# sourceMappingURL=ArrowSelector-test.js.map
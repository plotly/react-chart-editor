"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../DashSelector");

describe("DashSelector", function () {
  var DashSelector = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    DashSelector = require("../DashSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      activeOption: "dash",
      lineColor: "rgb(31, 119, 180)",
      onChange: jest.genMockFn()
    };

    return TestUtils.renderIntoDocument(React.createElement(DashSelector, props));
  }

  it("passes on the new value on change", function () {
    var onChange = jest.genMockFn();
    var component = render();
    var dropdown = component.refs.dropdown;
    var firstOption = component.refs.dropdown.props.options[0].value;

    expect(component).toBeDefined();
    expect(component.props.onChange).not.toBeCalled();
    dropdown.props.onChange(firstOption);
    expect(component.props.onChange).toBeCalledWith("solid");
  });

  it("should update local state on new props from parent", function () {
    var onChange = jest.genMockFn();
    var component = render();

    expect(component.state.activeOption).toEqual("dash");
    expect(component.state.lineColor).toEqual("rgb(31, 119, 180)");
    component.componentWillReceiveProps({
      activeOption: "longdash",
      lineColor: "rgb(255, 119, 180)"
    });
    expect(component.state.activeOption).toEqual("longdash");
    expect(component.state.lineColor).toEqual("rgb(255, 119, 180)");
  });
});
//# sourceMappingURL=DashSelector-test.js.map
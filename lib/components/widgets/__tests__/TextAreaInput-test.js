"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../TextAreaInput");

describe("TextAreaInput", function () {
  var TextAreaInput = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    TextAreaInput = require("../TextAreaInput");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      value: "First Note",
      placeholder: "Some placeholder text...",
      onChange: jest.genMockFn()
    };

    return TestUtils.renderIntoDocument(React.createElement(TextAreaInput, props));
  }

  it("passes on the new value on change and updates state", function () {
    var onChange = jest.genMockFn();
    var component = render();

    expect(component).toBeDefined();
    expect(component.state.value).toEqual("First Note");
    expect(component.props.onChange).not.toBeCalled();
    TestUtils.Simulate.change(component.refs.textinput, {
      target: { value: "A change of text" }
    });
    expect(component.props.onChange).toBeCalledWith("A change of text");
    expect(component.state.value).toEqual("A change of text");
    expect(component.refs.textinput.value).toEqual("A change of text");
  });

  it("should update local state and value on new props from parent", function () {
    var onChange = jest.genMockFn();
    var component = render();

    expect(component.state.value).toEqual("First Note");
    component.componentWillReceiveProps({
      value: "Crazy Craig"
    });
    expect(component.state.value).toEqual("Crazy Craig");
    expect(component.refs.textinput.value).toEqual("Crazy Craig");
  });
});
//# sourceMappingURL=TextAreaInput-test.js.map
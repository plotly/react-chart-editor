"use strict";

var _RangeInput = require("@workspace/components/widgets/RangeInput");

var _RangeInput2 = _interopRequireDefault(_RangeInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _testUtils = require("react-dom/test-utils");

var _testUtils2 = _interopRequireDefault(_testUtils);

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("RangeInput", function () {
  function render(props) {
    var propsWithDefault = (0, _assignDeep2.default)({
      value: [5, 24],
      onChange: jest.genMockFn(),
      min: 0,
      max: 100
    }, props || {});
    return _testUtils2.default.renderIntoDocument(_react2.default.createElement(_RangeInput2.default, propsWithDefault));
  }

  it("renders RangeInput as expected", function () {
    var component = render();
    expect(component).toBeDefined();
    expect(component.refs.inputMin.props.value).toEqual(5);
    expect(component.refs.inputMax.props.value).toEqual(24);
  });

  it("should update local state and value on new props from parent", function () {
    var component = render();

    expect(component.state).toEqual({
      valueMin: 5,
      valueMax: 24
    });
    component.componentWillReceiveProps({
      value: [48, 69]
    });
    expect(component.state.valueMin).toEqual(48);
    expect(component.state.valueMax).toEqual(69);
    expect(component.refs.inputMin.props.value).toEqual(48);
    expect(component.refs.inputMax.props.value).toEqual(69);
  });

  it("component text input fires our onChange prop", function () {
    var component = render();

    _testUtils2.default.Simulate.change((0, _reactDom.findDOMNode)(component.refs.inputMin), {
      target: 7
    });
    expect(component.props.onChange).not.toBeCalled();
    var minNode = (0, _reactDom.findDOMNode)(component.refs.inputMin);
    _testUtils2.default.Simulate.keyPress(minNode, {
      key: "Enter",
      keyCode: 13,
      which: 13
    });
    component.onUpdate(7);
  });
});
//# sourceMappingURL=RangeInput-test.js.map
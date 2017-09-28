"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../RadioBlocks");

describe("RadioBlocks", function () {
  var RadioBlocks = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    RadioBlocks = require("../RadioBlocks");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(props) {
    var onOptionChange = jest.genMockFn();

    var props = (0, _assignDeep2.default)({
      options: [{ value: true, label: "Bing" }, { value: false, label: "Bang" }],
      onOptionChange: onOptionChange,
      activeOption: true
    }, props || {});

    return TestUtils.renderIntoDocument(React.createElement(RadioBlocks, props));
  }

  it("Default active option is correctly checked", function () {
    var component = render();

    // Make sure that default active option is correctly 'checked'

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });

  it("component onChange fires our onOptionChange prop", function () {
    var component = render();
    // Make sure that component onChange fires our onOptionChange prop

    TestUtils.Simulate.click(component.refs.Bang);
    expect(component.props.onOptionChange).toBeCalledWith(false);

    expect(component.refs.Bing.checked).toEqual(false);
    expect(component.refs.Bang.checked).toEqual(true);

    TestUtils.Simulate.click(component.refs.Bing);
    expect(component.props.onOptionChange).toBeCalledWith(false);

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });

  it("component onChange fires our onOptionChange prop with correct values", function () {
    var component = render({
      options: [{ value: "on", label: "Bing" }, { value: "off", label: "Bang" }]
    });
    // Make sure that component onChange fires our onOptionChange prop

    TestUtils.Simulate.click(component.refs.Bang);
    expect(component.props.onOptionChange).toBeCalledWith("off");

    expect(component.refs.Bing.checked).toEqual(false);
    expect(component.refs.Bang.checked).toEqual(true);

    TestUtils.Simulate.click(component.refs.Bing);
    expect(component.props.onOptionChange).toBeCalledWith("on");

    expect(component.refs.Bing.checked).toEqual(true);
    expect(component.refs.Bang.checked).toEqual(false);
  });
});
//# sourceMappingURL=RadioBlocks-test.js.map
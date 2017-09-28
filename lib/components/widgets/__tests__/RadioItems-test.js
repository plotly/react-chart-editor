"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../RadioItems");

describe("RadioItems", function () {
  var RadioItems = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    RadioItems = require("../RadioItems");
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

    return TestUtils.renderIntoDocument(React.createElement(RadioItems, props));
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
    TestUtils.Simulate.change(component.refs.Bing, {
      target: component.refs.Bing
    });
    expect(component.props.onOptionChange).toBeCalledWith(true);

    TestUtils.Simulate.change(component.refs.Bang, {
      target: component.refs.Bang
    });
    expect(component.props.onOptionChange).toBeCalledWith(false);
  });

  it("returns the icon layout if icons are passed in", function () {
    var component = render({
      options: [{ value: true, label: "Bing", icon: "icon-align-left" }, { value: false, label: "Bang", icon: "icon-align-right" }]
    });

    // Make sure that default active option is correctly 'checked'
    expect(component.refs.iconOption).toBeDefined();
    expect(component.refs.textOption).not.toBeDefined();
  });

  it("return the text layout if no icons are passed in", function () {
    var component = render({
      options: [{ value: true, label: "Bing" }, { value: false, label: "Bang" }]
    });

    // Make sure that default active option is correctly 'checked'
    expect(component.refs.iconOption).not.toBeDefined();
    expect(component.refs.textOption).toBeDefined();
  });
});
//# sourceMappingURL=RadioItems-test.js.map
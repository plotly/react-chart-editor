"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("InputSlider", function () {
  var InputSlider = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    InputSlider = require("../InputSlider");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(props) {
    var propsWithDefault = (0, _assignDeep2.default)({
      value: 50,
      onChange: jest.genMockFn(),
      min: 0,
      max: 100,
      step: 5
    }, props || {});

    return TestUtils.renderIntoDocument(React.createElement(InputSlider, propsWithDefault));
  }

  it("renders Slider as expected", function () {
    var component = render();
    var sliderHandle = TestUtils.findRenderedDOMComponentWithClass(component, "slider__handle");
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.left).toEqual("50%");
  });

  it("updates Slider on new props from parent", function () {
    var component = render({
      orientation: "horizontal"
    });
    var sliderHandle = TestUtils.findRenderedDOMComponentWithClass(component, "slider__handle");
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.left).toEqual("50%");
    component.componentWillReceiveProps({
      value: 90
    });
    expect(component.state.value).toEqual(90);
  });
});
//# sourceMappingURL=InputSlider-test.js.map
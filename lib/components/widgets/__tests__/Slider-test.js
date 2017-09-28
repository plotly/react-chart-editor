"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../Slider");

describe("Slider", function () {
  var Slider = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    Slider = require("../Slider");
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
      step: 5,
      orientation: "vertical"
    }, props || {});

    return TestUtils.renderIntoDocument(React.createElement(Slider, propsWithDefault));
  }

  it("renders vertical Slider as expected", function () {
    var component = render({
      value: 30
    });
    var sliderHandle = TestUtils.findRenderedDOMComponentWithClass(component, "slider__handle");
    expect(component.state.value).toEqual(30);
    expect(sliderHandle.style.top).toEqual("70%");
  });

  it("renders horizontal Slider as expected", function () {
    var component = render({
      value: 40,
      orientation: "horizontal"
    });
    var sliderHandle = TestUtils.findRenderedDOMComponentWithClass(component, "slider__handle");
    expect(component.state.value).toEqual(40);
    expect(sliderHandle.style.left).toEqual("40%");
  });

  it("updates vertical slider on new props from parent", function () {
    var component = render();
    var sliderHandle = TestUtils.findRenderedDOMComponentWithClass(component, "slider__handle");
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.top).toEqual("50%");
    component.componentWillReceiveProps({
      value: 90
    });
    expect(component.state.value).toEqual(90);
    expect(sliderHandle.style.top).toEqual("10%");
  });

  it("updates horizontal slider on new props from parent", function () {
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
    expect(sliderHandle.style.left).toEqual("90%");
  });
});
//# sourceMappingURL=Slider-test.js.map
jest.dontMock("../Slider");

import deepAssign from "assign-deep";

describe("Slider", () => {
  let Slider;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    Slider = require("../Slider");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(props) {
    const propsWithDefault = deepAssign(
      {
        value: 50,
        onChange: jest.genMockFn(),
        min: 0,
        max: 100,
        step: 5,
        orientation: "vertical",
      },
      props || {}
    );

    return TestUtils.renderIntoDocument(<Slider {...propsWithDefault} />);
  }

  it("renders vertical Slider as expected", () => {
    const component = render({
      value: 30,
    });
    const sliderHandle = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "slider__handle"
    );
    expect(component.state.value).toEqual(30);
    expect(sliderHandle.style.top).toEqual("70%");
  });

  it("renders horizontal Slider as expected", () => {
    const component = render({
      value: 40,
      orientation: "horizontal",
    });
    const sliderHandle = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "slider__handle"
    );
    expect(component.state.value).toEqual(40);
    expect(sliderHandle.style.left).toEqual("40%");
  });

  it("updates vertical slider on new props from parent", () => {
    const component = render();
    const sliderHandle = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "slider__handle"
    );
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.top).toEqual("50%");
    component.componentWillReceiveProps({
      value: 90,
    });
    expect(component.state.value).toEqual(90);
    expect(sliderHandle.style.top).toEqual("10%");
  });

  it("updates horizontal slider on new props from parent", () => {
    const component = render({
      orientation: "horizontal",
    });
    const sliderHandle = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "slider__handle"
    );
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.left).toEqual("50%");
    component.componentWillReceiveProps({
      value: 90,
    });
    expect(component.state.value).toEqual(90);
    expect(sliderHandle.style.left).toEqual("90%");
  });
});

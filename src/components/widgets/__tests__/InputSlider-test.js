import deepAssign from "assign-deep";

describe("InputSlider", () => {
  let InputSlider;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    InputSlider = require("../InputSlider");
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
      },
      props || {}
    );

    return TestUtils.renderIntoDocument(<InputSlider {...propsWithDefault} />);
  }

  it("renders Slider as expected", () => {
    const component = render();
    const sliderHandle = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "slider__handle"
    );
    expect(component.state.value).toEqual(50);
    expect(sliderHandle.style.left).toEqual("50%");
  });

  it("updates Slider on new props from parent", () => {
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
  });
});

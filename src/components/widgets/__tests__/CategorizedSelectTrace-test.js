import CategorizedSelectTrace, { ESC_KEYCODE } from "../CategorizedSelectTrace";
import Immutable from "immutable";
import R from "ramda";
import React from "react";
import { CATEGORY_LAYOUT } from "@workspace/constants/workspace";
import { GET_ENCODING_SCHEMA } from "@workspace/constants/graphTable";
import { mount } from "enzyme";

describe("CategorizedSelectTrace", () => {
  const chartTypes = Object.keys(GET_ENCODING_SCHEMA());

  const chartOptions = chartTypes.map(chartType => {
    const { label, type } = GET_ENCODING_SCHEMA()[chartType].meta;

    return {
      type,
      label,
      value: type,
      disabled: false,
    };
  });

  // Given a chart button DOM element, find the chart Type.
  function labelToChartType(optionDOM) {
    const label = optionDOM.text();
    const matchingChartTypes = chartTypes.filter(type => {
      return GET_ENCODING_SCHEMA()[type].meta.label === label;
    });

    if (matchingChartTypes.length > 0) {
      return matchingChartTypes[0];
    }

    throw new Error(`Cannot find chart type for ${label}.`);
  }

  function render(overrideProps = {}) {
    const traceOptions = Immutable.fromJS(chartOptions);
    const defaultProps = {
      traceSelectHandler: jest.fn(),
      selectedTraceValue: "scatter",
      traceOptions,
      isOpen: false,
      onMenuToggle: jest.fn(),
    };

    const props = R.merge(defaultProps, overrideProps);

    const wrapper = mount(<CategorizedSelectTrace {...props} />);

    const onMenuToggle = jest.fn(() => {
      wrapper.setProps({ isOpen: !wrapper.prop("isOpen") });
    });

    wrapper.setProps({ onMenuToggle });
    return wrapper;
  }

  function findOverlay(wrapper) {
    return wrapper.find(".categorized-select-trace__overlay");
  }

  function toggleOverlay(wrapper) {
    wrapper.ref("input").simulate("click");
  }

  function overlayCountIs(wrapper, count) {
    expect(findOverlay(wrapper).length).toBe(count);
  }

  function triggerWindowClick() {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    window.dispatchEvent(evt);
  }

  function triggerEscKeyPress() {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("keydown", false, true);
    evt.keyCode = ESC_KEYCODE;
    window.dispatchEvent(evt);
  }

  it("toggles the menu if you click the chart input", () => {
    const wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 0);
  });

  it("closes the chart menu if you click outside the menu", () => {
    const wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    triggerWindowClick();
    overlayCountIs(wrapper, 0);
  });

  it("closes the chart menu if you press escape", () => {
    const wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    triggerEscKeyPress();
    overlayCountIs(wrapper, 0);
  });

  it("fires selection handler when a non-disabled button is clicked.", () => {
    const spiedHandler = jest.fn();
    const wrapper = render({ traceSelectHandler: spiedHandler });

    wrapper.ref("input").simulate("click");

    const firstOptionButton = wrapper
      .find(".categorized-select-trace__overlay__option")
      .first();

    firstOptionButton.simulate("click");

    // expect(spiedHandler).toBeCalled();
    // Make sure handler is passed the correspending button's chart type.
    expect(spiedHandler).toBeCalledWith(labelToChartType(firstOptionButton));
  });

  it(`won't fire selection handler when a
        disabled button is clicked.`, () => {
    const spiedHandler = jest.fn();
    const disabledOptions = R.map(R.assoc("disabled", true), chartOptions);

    const wrapper = render({
      traceSelectHandler: spiedHandler,
      traceOptions: Immutable.fromJS(disabledOptions),
    });

    wrapper.ref("input").simulate("click");

    const firstOptionButton = wrapper
      .find(".categorized-select-trace__overlay__option")
      .first();

    firstOptionButton.simulate("click");

    expect(spiedHandler).not.toBeCalled();
  });

  it("renders all charts in the dropdown menu", () => {
    const wrapper = render();

    wrapper.ref("input").simulate("click");

    const optionButtons = wrapper.find(
      ".categorized-select-trace__overlay__option"
    );
    const renderedCharts = optionButtons.map(labelToChartType).sort();
    const sortedChartTypes = R.clone(chartTypes).sort();
    expect(renderedCharts).toEqual(sortedChartTypes);
  });

  it("renders buttons in the right categories", () => {
    const wrapper = render();

    wrapper.ref("input").simulate("click");

    // Check if all rendered charts are under the right columns.
    CATEGORY_LAYOUT.forEach(column => {
      wrapper
        .ref(column.category)
        .find(".categorized-select-trace__overlay__option")
        .map(labelToChartType)
        .forEach(chartType => {
          const category = GET_ENCODING_SCHEMA()[chartType].meta.category;
          expect(category).toEqual(column.category);
        });
    });
  });
});

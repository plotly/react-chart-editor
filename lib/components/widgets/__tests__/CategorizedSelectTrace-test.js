"use strict";

var _CategorizedSelectTrace = require("../CategorizedSelectTrace");

var _CategorizedSelectTrace2 = _interopRequireDefault(_CategorizedSelectTrace);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _workspace = require("@workspace/constants/workspace");

var _graphTable = require("@workspace/constants/graphTable");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("CategorizedSelectTrace", function () {
  var chartTypes = Object.keys((0, _graphTable.GET_ENCODING_SCHEMA)());

  var chartOptions = chartTypes.map(function (chartType) {
    var _GET_ENCODING_SCHEMA$ = (0, _graphTable.GET_ENCODING_SCHEMA)()[chartType].meta,
        label = _GET_ENCODING_SCHEMA$.label,
        type = _GET_ENCODING_SCHEMA$.type;


    return {
      type: type,
      label: label,
      value: type,
      disabled: false
    };
  });

  // Given a chart button DOM element, find the chart Type.
  function labelToChartType(optionDOM) {
    var label = optionDOM.text();
    var matchingChartTypes = chartTypes.filter(function (type) {
      return (0, _graphTable.GET_ENCODING_SCHEMA)()[type].meta.label === label;
    });

    if (matchingChartTypes.length > 0) {
      return matchingChartTypes[0];
    }

    throw new Error("Cannot find chart type for " + label + ".");
  }

  function render() {
    var overrideProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var traceOptions = _immutable2.default.fromJS(chartOptions);
    var defaultProps = {
      traceSelectHandler: jest.fn(),
      selectedTraceValue: "scatter",
      traceOptions: traceOptions,
      isOpen: false,
      onMenuToggle: jest.fn()
    };

    var props = _ramda2.default.merge(defaultProps, overrideProps);

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_CategorizedSelectTrace2.default, props));

    var onMenuToggle = jest.fn(function () {
      wrapper.setProps({ isOpen: !wrapper.prop("isOpen") });
    });

    wrapper.setProps({ onMenuToggle: onMenuToggle });
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
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    window.dispatchEvent(evt);
  }

  function triggerEscKeyPress() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keydown", false, true);
    evt.keyCode = _CategorizedSelectTrace.ESC_KEYCODE;
    window.dispatchEvent(evt);
  }

  it("toggles the menu if you click the chart input", function () {
    var wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 0);
  });

  it("closes the chart menu if you click outside the menu", function () {
    var wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    triggerWindowClick();
    overlayCountIs(wrapper, 0);
  });

  it("closes the chart menu if you press escape", function () {
    var wrapper = render();
    toggleOverlay(wrapper);
    overlayCountIs(wrapper, 1);
    triggerEscKeyPress();
    overlayCountIs(wrapper, 0);
  });

  it("fires selection handler when a non-disabled button is clicked.", function () {
    var spiedHandler = jest.fn();
    var wrapper = render({ traceSelectHandler: spiedHandler });

    wrapper.ref("input").simulate("click");

    var firstOptionButton = wrapper.find(".categorized-select-trace__overlay__option").first();

    firstOptionButton.simulate("click");

    // expect(spiedHandler).toBeCalled();
    // Make sure handler is passed the correspending button's chart type.
    expect(spiedHandler).toBeCalledWith(labelToChartType(firstOptionButton));
  });

  it("won't fire selection handler when a\n        disabled button is clicked.", function () {
    var spiedHandler = jest.fn();
    var disabledOptions = _ramda2.default.map(_ramda2.default.assoc("disabled", true), chartOptions);

    var wrapper = render({
      traceSelectHandler: spiedHandler,
      traceOptions: _immutable2.default.fromJS(disabledOptions)
    });

    wrapper.ref("input").simulate("click");

    var firstOptionButton = wrapper.find(".categorized-select-trace__overlay__option").first();

    firstOptionButton.simulate("click");

    expect(spiedHandler).not.toBeCalled();
  });

  it("renders all charts in the dropdown menu", function () {
    var wrapper = render();

    wrapper.ref("input").simulate("click");

    var optionButtons = wrapper.find(".categorized-select-trace__overlay__option");
    var renderedCharts = optionButtons.map(labelToChartType).sort();
    var sortedChartTypes = _ramda2.default.clone(chartTypes).sort();
    expect(renderedCharts).toEqual(sortedChartTypes);
  });

  it("renders buttons in the right categories", function () {
    var wrapper = render();

    wrapper.ref("input").simulate("click");

    // Check if all rendered charts are under the right columns.
    _workspace.CATEGORY_LAYOUT.forEach(function (column) {
      wrapper.ref(column.category).find(".categorized-select-trace__overlay__option").map(labelToChartType).forEach(function (chartType) {
        var category = (0, _graphTable.GET_ENCODING_SCHEMA)()[chartType].meta.category;
        expect(category).toEqual(column.category);
      });
    });
  });
});
//# sourceMappingURL=CategorizedSelectTrace-test.js.map
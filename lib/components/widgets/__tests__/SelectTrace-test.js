"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SelectTrace = require("../SelectTrace");

var _SelectTrace2 = _interopRequireDefault(_SelectTrace);

var _Dropdown = require("@workspace/components/widgets/Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _workspace = require("@workspace/constants/workspace");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<SelectTrace>", function () {
  it("renders <Dropdown> with a formatted list of options", function () {
    var traceSelectHandler = jest.fn();
    var selectedTraceValue = "";
    var traceOptions = [{
      value: "ed45tr",
      type: "scatter",
      label: "Scatter",
      disabled: false
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SelectTrace2.default, {
      traceSelectHandler: traceSelectHandler,
      selectedTraceValue: selectedTraceValue,
      traceOptions: traceOptions
    }));

    var options = wrapper.find(_Dropdown2.default).get(0).props.options;
    var _options$ = options[0],
        value = _options$.value,
        label = _options$.label;


    var icon = label.props.children[0];
    var text = label.props.children[1];

    expect(value).toEqual("ed45tr");
    expect(icon.props.className.indexOf(_workspace.CHART_TYPE_ICON.scatter)).toBeGreaterThan(-1);
    expect(text).toBe("Scatter");
  });
});
//# sourceMappingURL=SelectTrace-test.js.map
"use strict";

var _DelayedTextInput = require("@workspace/components/widgets/DelayedTextInput");

var _DelayedTextInput2 = _interopRequireDefault(_DelayedTextInput);

var _DateTextInput = require("../DateTextInput");

var _DateTextInput2 = _interopRequireDefault(_DateTextInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _workspace = require("@workspace/constants/workspace");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plotly = require("@workspace/__mocks__/plotly");

var globalUtils = require("_utils/globalUtils");
globalUtils.getWindow = jest.fn().mockReturnValue({ Plotly: Plotly });

describe("DateTextInput", function () {
  function addTextToInput(input, text) {
    input.simulate("change", { target: { value: text } });
  }

  function render(props) {
    return (0, _enzyme.mount)(_react2.default.createElement(_DateTextInput2.default, props));
  }

  var originalLib = void 0;

  beforeEach(function () {
    originalLib = Plotly.Lib;
    // any string with "not" is not a date; otherwise it is a date
    Plotly.Lib = {
      isDateTime: function isDateTime(v) {
        return v.indexOf("not") === -1;
      }
    };
  });

  afterEach(function () {
    Plotly.Lib = originalLib;
  });

  it("should show MIXED_MODE_VALUE and pass only dates to onUpdate", function () {
    var onUpdate = jest.fn();
    var wrapper = render({
      value: _workspace.MIXED_VALUES,
      onUpdate: onUpdate,
      calendar: "gregorian"
    });
    var input = wrapper.find(_DelayedTextInput2.default).find("input");
    var nonDate = "not a date";
    var newDate = "tomorrow";

    expect(input.prop("value")).toBe(_workspace.MIXED_MODE_VALUE);

    addTextToInput(input, nonDate);

    // you're allowed to type a non-date
    expect(input.prop("value")).toBe(nonDate);

    // but on blur it reverts without calling onUpdate
    input.simulate("blur");
    expect(input.prop("value")).toBe(_workspace.MIXED_MODE_VALUE);
    expect(onUpdate).not.toBeCalled();

    // now type a "real" date
    addTextToInput(input, newDate);

    // still haven't called onUpdate
    expect(onUpdate).not.toBeCalled();

    input.simulate("blur");
    expect(onUpdate).toBeCalledWith(newDate);
    expect(input.prop("value")).toBe(newDate);
  });
});
//# sourceMappingURL=DateTextInput-test.js.map
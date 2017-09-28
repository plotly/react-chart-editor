"use strict";

var _EditableText = require("@workspace/components/widgets/EditableText");

var _EditableText2 = _interopRequireDefault(_EditableText);

var _NumericInputStatefulWrapper = require("@workspace/components/widgets/NumericInputStatefulWrapper");

var _NumericInputStatefulWrapper2 = _interopRequireDefault(_NumericInputStatefulWrapper);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _workspace = require("@workspace/constants/workspace");

var _NumericInput = require("@workspace/components/widgets/NumericInput");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addTextToInput(wrapper, text) {
  var input = wrapper.find(_EditableText2.default).find("input");
  input.simulate("change", { target: { value: text } });
  return input;
}

describe("NumericInputStatefulWrapper", function () {
  function render() {
    var overrideProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var props = Object.assign({
      value: 24,
      step: 2,
      min: 0,
      max: 100,
      onUpdate: jest.fn()
    }, overrideProps);

    return (0, _enzyme.mount)(_react2.default.createElement(_NumericInputStatefulWrapper2.default, props));
  }

  it("increases NumericInputStatefulWrapper value as expected", function () {
    var wrapper = render();
    var increaseButton = wrapper.find(".js-numeric-increase");
    expect(wrapper.prop("step")).toEqual(2);
    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    increaseButton.simulate("click");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(26);
  });

  it("decreases NumericInputStatefulWrapper value as expected", function () {
    var wrapper = render();
    var decreaseButton = wrapper.find(".js-numeric-decrease");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    decreaseButton.simulate("click");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("increases NumericInputStatefulWrapper value as expected onKeyDown", function () {
    var onUpdate = jest.fn();
    var wrapper = render({ onUpdate: onUpdate });

    var inputField = wrapper.find(_EditableText2.default);

    expect(wrapper.prop("step")).toEqual(2);
    expect(onUpdate).not.toBeCalled();

    inputField.simulate("keyDown", { keyCode: _NumericInput.UP_ARROW });
    expect(onUpdate).toBeCalledWith(26);

    onUpdate.mockClear();

    inputField.simulate("keyDown", { keyCode: _NumericInput.DOWN_ARROW });
    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("stays within min and max values when these props are provided", function () {
    var wrapper = void 0;

    wrapper = render({ value: 0 });
    wrapper.find(".js-numeric-decrease").simulate("click");
    expect(wrapper.prop("onUpdate")).toBeCalledWith(0);

    wrapper = render({ value: 100 });
    wrapper.find(".js-numeric-increase").simulate("click");
    expect(wrapper.prop("onUpdate")).toBeCalledWith(100);
  });

  it("increases NumericInputStatefulWrapper when MIXED_VALUE", function () {
    var wrapper = render({ value: _workspace.MIXED_VALUES, min: 8 });
    var increaseButton = wrapper.find(".js-numeric-increase");

    increaseButton.simulate("click");

    // it calls update with the minumum value
    expect(wrapper.prop("onUpdate")).toBeCalledWith(8);

    // but it will continue to render '-' until parent sends in new prop
    expect(wrapper.find(_EditableText2.default).prop("text")).toEqual("-");
  });

  it("updates using defaultValue (when provided) on blank input", function () {
    var wrapper = render({ value: 2, defaultValue: 4 });

    addTextToInput(wrapper, "  ").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(4);
  });

  it("doesn't update on blank input when no default provided", function () {
    var wrapper = render({ value: 2 });

    addTextToInput(wrapper, "  ").simulate("blur");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();
  });

  it("truncates integers onBlur when integerOnly", function () {
    var wrapper = render({ value: 2, integerOnly: true });

    addTextToInput(wrapper, "22.5").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it("calls onUpdate when bluring from MixedMode", function () {
    var wrapper = render({ value: _workspace.MIXED_VALUES });

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    addTextToInput(wrapper, "22").simulate("blur");

    expect(wrapper.prop("onUpdate")).toBeCalledWith(22);
  });

  it('doesn\'t call onUpdate and shows "-" on bad MixedMode blur', function () {
    var wrapper = render({ value: _workspace.MIXED_VALUES });

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    addTextToInput(wrapper, "hodor").simulate("blur");

    expect(wrapper.prop("onUpdate")).not.toBeCalled();

    // but it will continue to render '-' until parent sends in new prop
    expect(wrapper.find(_EditableText2.default).prop("text")).toEqual("-");
  });
});
//# sourceMappingURL=NumericInput-test.js.map
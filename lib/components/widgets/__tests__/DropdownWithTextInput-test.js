"use strict";

var _DropdownWithTextInput = require("../DropdownWithTextInput");

var _DropdownWithTextInput2 = _interopRequireDefault(_DropdownWithTextInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("DropdownWithTextInput", function () {
  var options = [{ label: "label 1", value: "value 1" }, { label: "label 2", value: "value 2" }];

  function render() {
    var overrideProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaultProps = {
      options: options,
      onUpdate: jest.fn(),
      value: options[0].value,
      minWidth: "100px",
      clearable: false
    };

    var props = (0, _ramda.merge)(defaultProps, overrideProps);
    return (0, _enzyme.mount)(_react2.default.createElement(_DropdownWithTextInput2.default, props));
  }

  function selectOption(wrapper, value) {
    var select = wrapper.ref("dropdown").prop("onChange");
    select(value);
  }

  it("calls onChange on existing dropdown option", function () {
    var wrapper = render();
    var secondOption = options[1].value;

    selectOption(wrapper, secondOption);
    expect(wrapper.prop("onUpdate")).toBeCalledWith(secondOption);
  });

  it("calls onChange on a custom option", function () {
    var wrapper = render();

    var value = "banana";
    var list = (0, _ramda.append)(wrapper.prop("options"), {
      label: "potato",
      value: value
    });

    wrapper.setState({ list: list });
    selectOption(wrapper, value);
    expect(wrapper.prop("onUpdate")).toBeCalledWith(value);
  });
});
//# sourceMappingURL=DropdownWithTextInput-test.js.map
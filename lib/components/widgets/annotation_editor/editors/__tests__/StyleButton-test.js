"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _StyleButton = require("../StyleButton");

var _StyleButton2 = _interopRequireDefault(_StyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("StyleButton", function () {
  var getButtonElement = function getButtonElement(component) {
    return component.find(".rich-text-editor__styleButton");
  };

  it("Renders an inactive StyleButton", function () {
    var labelElement = _react2.default.createElement(
      "span",
      null,
      "B"
    );

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_StyleButton2.default, {
      active: false,
      label: labelElement,
      onToggle: function onToggle() {},
      value: "BOLD"
    }));

    var button = getButtonElement(component);

    expect(button.length).toBe(1);
    expect(button.prop("data-role")).toBe("button");
    expect(button.prop("data-pressed")).toBe(false);
    expect(button.contains(labelElement)).toBe(true);
  });

  it("Renders an active StyleButton", function () {
    var labelElement = _react2.default.createElement(
      "span",
      null,
      "B"
    );

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_StyleButton2.default, {
      active: true,
      label: labelElement,
      onToggle: function onToggle() {},
      value: "BOLD"
    }));

    var activeClass = "rich-text-editor__styleButton--active";
    var button = getButtonElement(component);

    expect(button.hasClass(activeClass)).toBe(true);
    expect(button.prop("data-role")).toBe("button");
    expect(button.prop("data-pressed")).toBe(true);
    expect(button.contains(labelElement)).toBe(true);
  });

  it("Calls back when toggled", function () {
    var labelElement = _react2.default.createElement(
      "span",
      null,
      "B"
    );
    var mockOnToggle = jest.genMockFn();

    var component = (0, _enzyme.mount)(_react2.default.createElement(_StyleButton2.default, {
      active: false,
      label: labelElement,
      value: "BOLD",
      onToggle: mockOnToggle
    }));

    getButtonElement(component).simulate("mousedown");

    expect(mockOnToggle).toBeCalledWith("BOLD");
  });
});
//# sourceMappingURL=StyleButton-test.js.map
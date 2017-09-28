"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _FormatSwitchConfirmationPanel = require("@workspace/components/widgets/annotation_editor/FormatSwitchConfirmationPanel");

var _FormatSwitchConfirmationPanel2 = _interopRequireDefault(_FormatSwitchConfirmationPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("FormatSwitchConfirmationPanel", function () {
  it("calls onCancel when Cancel is clicked", function () {
    var mockOnCancel = jest.genMockFn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: mockOnCancel,
      onContinue: function onContinue() {},
      value: ""
    }));

    component.find(".confirmation-panel__btn-cancel").simulate("click");

    expect(mockOnCancel).toBeCalled();
  });

  it("calls onContinue when Continue is clicked", function () {
    var mockOnContinue = jest.genMockFn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: function onCancel() {},
      onContinue: mockOnContinue,
      value: ""
    }));

    component.find(".confirmation-panel__btn-continue").simulate("click");

    expect(mockOnContinue).toBeCalled();
  });

  it("shows the correct message for non-latex value", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: function onCancel() {},
      onContinue: function onContinue() {},
      value: "Some text"
    }));

    expect(component.text()).toContain("convert your note to LaTeX");
  });

  it("shows the correct message for latex value with text", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: function onCancel() {},
      onContinue: function onContinue() {},
      value: "$\\text{foo}$"
    }));

    expect(component.text()).toContain("convert your LaTeX expression into raw text");
  });

  it("shows the correct message for latex value without text", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: function onCancel() {},
      onContinue: function onContinue() {},
      value: "$\\alpha$"
    }));

    expect(component.text()).toContain("will remove your expression");
  });
});
//# sourceMappingURL=FormatSwitchConfirmationPanel-test.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _convertFormats = require("@workspace/components/widgets/annotation_editor/convertFormats");

var _i18n = require("@common/utils/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessages = function getMessages(value) {
  if (!(0, _convertFormats.isLaTeXExpr)(value)) {
    return [(0, _i18n._)("LaTeX is a math typesetting language that doesn't work with rich text."), (0, _i18n._)("Continuing will convert your note to LaTeX-style text.")];
  }

  if ((0, _convertFormats.hasTextExpression)(value)) {
    return [(0, _i18n._)("Rich text is incompatible with LaTeX."), (0, _i18n._)("Continuing will convert your LaTeX expression into raw text.")];
  }

  return [(0, _i18n._)("Rich text is incompatible with LaTeX."), (0, _i18n._)("Continuing will remove your expression.")];
};

var FormatSwitchConfirmationPanel = function FormatSwitchConfirmationPanel(props) {
  var messages = getMessages(props.value);

  return _react2.default.createElement(
    "div",
    { className: "confirmation-panel" },
    _react2.default.createElement(
      "div",
      { className: "block-group" },
      _react2.default.createElement(
        "div",
        { className: "block +text-center" },
        _react2.default.createElement(
          "h5",
          { className: "confirmation-panel__header +weight-semibold" },
          (0, _i18n._)("Heads up!")
        ),
        _react2.default.createElement(
          "p",
          { className: "+weight-normal" },
          messages[0]
        ),
        _react2.default.createElement(
          "p",
          { className: "+weight-light" },
          messages[1]
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "block block-50 +text-center" },
        _react2.default.createElement(
          "button",
          {
            className: "btnbase btn--default confirmation-panel__btn-cancel",
            onClick: props.onCancel
          },
          (0, _i18n._)("Go back")
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "block block-50 +text-center" },
        _react2.default.createElement(
          "button",
          {
            className: "btnbase btn--primary confirmation-panel__btn-continue",
            onClick: props.onContinue
          },
          (0, _i18n._)("Continue")
        )
      )
    )
  );
};

FormatSwitchConfirmationPanel.propTypes = {
  onCancel: _react.PropTypes.func.isRequired,
  onContinue: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.string.isRequired
};

exports.default = FormatSwitchConfirmationPanel;
module.exports = exports["default"];
//# sourceMappingURL=FormatSwitchConfirmationPanel.js.map
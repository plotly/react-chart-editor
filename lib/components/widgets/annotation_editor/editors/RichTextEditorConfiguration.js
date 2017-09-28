"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_EDITOR_HORIZONTAL_OFFSET = exports.LINK_EDITOR_VERTICAL_OFFSET = exports.EDITOR_TEXT_HEIGHT = exports.INLINE_STYLES = exports.STYLE_MAP = exports.STYLES_TO_HTML_TAGS = exports.ITALIC = exports.BOLD = exports.LINK = exports.SUBSCRIPT = exports.SUPERSCRIPT = undefined;

var _STYLES_TO_HTML_TAGS, _STYLE_MAP;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJsTools = require("draft-js-tools");

var _workspace = require("@workspace/constants/workspace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Configuration constants used by the RichTextEditor.
                                                                                                                                                                                                                   */

exports.SUPERSCRIPT = _workspace.INLINE_STYLE_SUPER;
exports.SUBSCRIPT = _workspace.INLINE_STYLE_SUB;
exports.LINK = _workspace.INLINE_STYLE_LINK;
var BOLD = _draftJsTools.INLINE_STYLE.BOLD,
    ITALIC = _draftJsTools.INLINE_STYLE.ITALIC;
exports.BOLD = BOLD;
exports.ITALIC = ITALIC;
var STYLES_TO_HTML_TAGS = exports.STYLES_TO_HTML_TAGS = (_STYLES_TO_HTML_TAGS = {}, _defineProperty(_STYLES_TO_HTML_TAGS, BOLD, "b"), _defineProperty(_STYLES_TO_HTML_TAGS, ITALIC, "i"), _defineProperty(_STYLES_TO_HTML_TAGS, _workspace.INLINE_STYLE_SUPER, "sup"), _defineProperty(_STYLES_TO_HTML_TAGS, _workspace.INLINE_STYLE_SUB, "sub"), _defineProperty(_STYLES_TO_HTML_TAGS, _workspace.INLINE_STYLE_LINK, "a"), _STYLES_TO_HTML_TAGS);

var STYLE_MAP = exports.STYLE_MAP = (_STYLE_MAP = {}, _defineProperty(_STYLE_MAP, BOLD, {
  fontWeight: "bolder"
}), _defineProperty(_STYLE_MAP, ITALIC, {
  fontStyle: "italic"
}), _defineProperty(_STYLE_MAP, _workspace.INLINE_STYLE_SUB, {
  /*
       * Can't use text-align; IE renders `text-bottom` properly, but
       * FF doesn't (same height as `bottom`). Chrome doesn't understand
       * `text-align: bottom`. Use relative positioning instead.
       */
  lineHeight: 0,
  fontSize: "65%",
  position: "relative",
  bottom: "-3px"
}), _defineProperty(_STYLE_MAP, _workspace.INLINE_STYLE_SUPER, {
  /*
       * Can't use text-align; IE renders `text-top` properly, but
       * FF doesn't (same height as `top`). Chrome doesn't understand
       * `text-align: top`. Use relative positioning instead.
       */
  lineHeight: 0,
  fontSize: "65%",
  position: "relative",
  top: "-5px"
}), _defineProperty(_STYLE_MAP, _workspace.INLINE_STYLE_LINK, {
  color: "#447bdc", // $color-link
  linkDecoration: "none",
  cursor: "pointer"
}), _STYLE_MAP);

var INLINE_STYLES = exports.INLINE_STYLES = [{
  label: _react2.default.createElement(
    "span",
    { style: STYLE_MAP[BOLD] },
    "B"
  ),
  value: BOLD
}, {
  label: _react2.default.createElement(
    "span",
    { style: STYLE_MAP[ITALIC] },
    "I"
  ),
  value: ITALIC
}, {
  label: _react2.default.createElement(
    "span",
    null,
    "x",
    _react2.default.createElement(
      "span",
      { style: STYLE_MAP[_workspace.INLINE_STYLE_SUB] },
      "2"
    )
  ),
  value: _workspace.INLINE_STYLE_SUB
}, {
  label: _react2.default.createElement(
    "span",
    null,
    "x",
    _react2.default.createElement(
      "span",
      { style: STYLE_MAP[_workspace.INLINE_STYLE_SUPER] },
      "2"
    )
  ),
  value: _workspace.INLINE_STYLE_SUPER
}, {
  label: _react2.default.createElement(
    "span",
    null,
    _react2.default.createElement("i", { className: "icon icon-link" })
  ),
  value: _workspace.INLINE_STYLE_LINK
}];

// TODO Calculate text height rather than hard-coding.
var EDITOR_TEXT_HEIGHT = exports.EDITOR_TEXT_HEIGHT = 15;
var LINK_EDITOR_VERTICAL_OFFSET = exports.LINK_EDITOR_VERTICAL_OFFSET = EDITOR_TEXT_HEIGHT + 5;
var LINK_EDITOR_HORIZONTAL_OFFSET = exports.LINK_EDITOR_HORIZONTAL_OFFSET = 30;
//# sourceMappingURL=RichTextEditorConfiguration.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EDIT_MODE_STATE_TRAN;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require("react-immutable-proptypes");

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _TabPanel = require("@workspace/components/widgets/TabPanel");

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _ModeSwitchPanel = require("@workspace/components/widgets/annotation_editor/ModeSwitchPanel");

var _ModeSwitchPanel2 = _interopRequireDefault(_ModeSwitchPanel);

var _i18n = require("@common/utils/i18n");

var _convertFormats = require("@workspace/components/widgets/annotation_editor/convertFormats");

var _FormatSwitchConfirmationPanel = require("@workspace/components/widgets/annotation_editor/FormatSwitchConfirmationPanel");

var _FormatSwitchConfirmationPanel2 = _interopRequireDefault(_FormatSwitchConfirmationPanel);

var _RichTextEditor = require("./editors/RichTextEditor");

var _RichTextEditor2 = _interopRequireDefault(_RichTextEditor);

var _HTMLEditor = require("./editors/HTMLEditor");

var _HTMLEditor2 = _interopRequireDefault(_HTMLEditor);

var _LaTeXEditor = require("./editors/LaTeXEditor");

var _LaTeXEditor2 = _interopRequireDefault(_LaTeXEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MULTI_MODE_TAB = {
  key: "RICH_TEXT",
  label: (0, _i18n._)("Rich Text")
};
var LATEX_TAB = {
  key: "LATEX",
  label: (0, _i18n._)("LaTeX")
};

var EDIT_MODE_HTML = "HTML";
var EDIT_MODE_RICH_TEXT = "RICH_TEXT";

var EDIT_MODE_STATE_TRANSITIONS = (_EDIT_MODE_STATE_TRAN = {}, _defineProperty(_EDIT_MODE_STATE_TRAN, EDIT_MODE_HTML, EDIT_MODE_RICH_TEXT), _defineProperty(_EDIT_MODE_STATE_TRAN, EDIT_MODE_RICH_TEXT, EDIT_MODE_HTML), _EDIT_MODE_STATE_TRAN);

var AnnotationEditor = _react2.default.createClass({
  displayName: "AnnotationEditor",

  propTypes: {
    defaultValuePattern: _react.PropTypes.instanceOf(RegExp),
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValuePattern: /^$/,
      placeholder: "",
      value: ""
    };
  },
  getInitialState: function getInitialState() {
    var startTab = (0, _convertFormats.isLaTeXExpr)(this.props.value) ? LATEX_TAB.key : MULTI_MODE_TAB.key;

    return {
      /*
             * When nextTab is set, we are waiting for confirmation from the
             * user before switching to the next tab.
             */
      nextTab: null,
      selectedTab: startTab
    };
  },


  /**
     * Convert a value to the format expected by the provided editor.
     *
     * @param {String} value The current value
     * @param {String} editor The editor to convert for [RICH_TEXT|LATEX]
     * @returns {String} The converted value
     */
  convertValue: function convertValue(value, editor) {
    return editor === LATEX_TAB.key ? (0, _convertFormats.htmlToLaTeX)(value) : (0, _convertFormats.laTeXToHTML)(value);
  },
  renderTabPanel: function renderTabPanel(render) {
    var _ref,
        _ref2,
        _this = this,
        _ref3;

    if (!render) return null;

    var _props = this.props,
        onChange = _props.onChange,
        placeholder = _props.placeholder,
        value = _props.value;


    var RichTextEditorPanelContent = _react2.default.createElement(_RichTextEditor2.default, {
      onChange: onChange,
      placeholder: placeholder,
      value: value
    });

    var HTMLEditorPanelContent = _react2.default.createElement(_HTMLEditor2.default, { onChange: onChange, placeholder: placeholder, value: value });

    var MultiModeTabContent = _react2.default.createElement(_ModeSwitchPanel2.default, {
      modesToComponents: (_ref = {}, _defineProperty(_ref, EDIT_MODE_RICH_TEXT, RichTextEditorPanelContent), _defineProperty(_ref, EDIT_MODE_HTML, HTMLEditorPanelContent), _ref),
      modesToButtonLabels: (_ref2 = {}, _defineProperty(_ref2, EDIT_MODE_RICH_TEXT, (0, _i18n._)("Edit in HTML")), _defineProperty(_ref2, EDIT_MODE_HTML, (0, _i18n._)("Edit in Rich Text")), _ref2),
      modeTransitions: EDIT_MODE_STATE_TRANSITIONS,
      defaultMode: EDIT_MODE_RICH_TEXT
    });

    var LaTeXTabContent = _react2.default.createElement(_LaTeXEditor2.default, {
      onChange: onChange,
      placeholder: placeholder,
      value: value
    });

    var onTabChange = function onTabChange(selectedTab, nextTab) {
      var defaultValuePattern = _this.props.defaultValuePattern;

      var trimmedValue = value.trim();
      var trimmedValueLength = trimmedValue.length;
      var convertedValue = _this.convertValue(trimmedValue, nextTab);
      /*
             * Check against default value - we have to compare the plain
             * value, not the LaTeX format value with `\text{}` wrapping.
             */
      var isDefaultValue = (0, _convertFormats.isLaTeXExpr)(trimmedValue) ? defaultValuePattern.test(convertedValue) : defaultValuePattern.test(trimmedValue);

      if (!isDefaultValue && trimmedValueLength > 0) {
        // Show confirmation dialogue and defer tab change.
        return _this.setState({
          nextTab: nextTab
        });
      }

      // Show requested tab immediately.
      _this.setState({
        selectedTab: nextTab
      });

      // Convert the annotation and dispatch onChange action
      onChange(convertedValue);
    };

    /*
         * Can't use `components/Tabs.react`; the parent component needs
         * to control the state which tab is active. `Tabs.react` takes an
         * `onBeforeChange` callback prop that can cancel tab switching
         * synchronously, but we need to be able to fully control when the
         * switch takes place.
         * Further, an initial attempt to use `Tabs.react` resulted in the
         * following bugs:
         *   1. Rich text editor style controls would not work.
         *   2. Click on second tab would not register until user had
         *      clicked on first tab.
         * Issue: https://github.com/plotly/streambed/issues/6120
         */
    return _react2.default.createElement(_TabPanel2.default, {
      tabs: [MULTI_MODE_TAB, LATEX_TAB],
      components: (_ref3 = {}, _defineProperty(_ref3, MULTI_MODE_TAB.key, MultiModeTabContent), _defineProperty(_ref3, LATEX_TAB.key, LaTeXTabContent), _ref3),
      selectedTab: this.state.selectedTab,
      onTabChange: onTabChange
    });
  },
  renderConfirmationPanel: function renderConfirmationPanel(render) {
    var _this2 = this;

    if (!render) return null;

    var onCancel = function onCancel() {
      _this2.setState({
        nextTab: null
      });
    };

    var onContinue = function onContinue() {
      var nextTab = _this2.state.nextTab;
      var _props2 = _this2.props,
          onChange = _props2.onChange,
          value = _props2.value;

      // Set next tab as active

      _this2.setState({
        selectedTab: nextTab,
        nextTab: null
      });

      // Convert the annotation
      var convertedValue = _this2.convertValue(value, nextTab);
      onChange(convertedValue);
    };

    return _react2.default.createElement(_FormatSwitchConfirmationPanel2.default, {
      onCancel: onCancel,
      onContinue: onContinue,
      value: this.props.value
    });
  },
  render: function render() {
    var renderConfirmationPanel = this.state.nextTab !== null;

    /*
         * `renderConfirmationPanel` and `renderTabPanel` are mutually
         * exclusive; only one will return a component.
         */
    return _react2.default.createElement(
      "div",
      null,
      this.renderConfirmationPanel(renderConfirmationPanel),
      this.renderTabPanel(!renderConfirmationPanel)
    );
  }
});

exports.default = AnnotationEditor;
module.exports = exports["default"];
//# sourceMappingURL=AnnotationEditor.js.map
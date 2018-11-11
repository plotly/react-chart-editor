'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HTML = require('./HTML');

var _HTML2 = _interopRequireDefault(_HTML);

var _LaTeX = require('./LaTeX');

var _LaTeX2 = _interopRequireDefault(_LaTeX);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RichText = require('./RichText');

var _RichText2 = _interopRequireDefault(_RichText);

var _convertFormats = require('./convertFormats');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _context = require('../../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiFormatTextEditor = function (_Component) {
  _inherits(MultiFormatTextEditor, _Component);

  function MultiFormatTextEditor(props, context) {
    _classCallCheck(this, MultiFormatTextEditor);

    var _this = _possibleConstructorReturn(this, (MultiFormatTextEditor.__proto__ || Object.getPrototypeOf(MultiFormatTextEditor)).call(this, props, context));

    var _ = context.localize;

    var editors = [{
      key: 'RICH_TEXT',
      label: _('Rich Text'),
      component: _RichText2.default
    }, {
      key: 'LATEX',
      label: _('LaTeX'),
      component: _LaTeX2.default
    }, {
      key: 'HTML',
      label: _('Edit in HTML'),
      component: _HTML2.default
    }];

    var startTab = (0, _convertFormats.isLaTeXExpr)(props.value) ? 'LATEX' : 'RICH_TEXT';

    _this.state = {
      /*
       * When nextTab is set, we are waiting for confirmation from the
       * user before switching to the next tab.
       */
      nextTab: null,
      currentTab: startTab,
      messages: []
    };

    _this.onModeChange = _this.onModeChange.bind(_this);
    _this.editors = editors;
    return _this;
  }

  /**
   * Convert a value to the format expected by the provided editor.
   *
   * @param {String} value The current value
   * @param {String} editor The editor to convert for [RICH_TEXT|LATEX]
   * @returns {String} The converted value
   */


  _createClass(MultiFormatTextEditor, [{
    key: 'convertValue',
    value: function convertValue(value, editor) {
      var currentTab = this.state.currentTab;


      if (currentTab === 'RICH_TEXT' && editor === 'LATEX') {
        return (0, _convertFormats.htmlToLaTeX)(value);
      }

      if (currentTab === 'LATEX' && editor === 'RICH_TEXT') {
        return (0, _convertFormats.laTeXToHTML)(value);
      }

      if (currentTab === 'HTML' && editor === 'LATEX') {
        return (0, _convertFormats.htmlToLaTeX)(value);
      }

      /*
       * Else we're switching from / to HTML / Rich Text Editor
       * no conversion is needed
       */
      return value;
    }
  }, {
    key: 'onModeChange',
    value: function onModeChange(nextTab) {
      var _ = this.context.localize;
      var _props = this.props,
          defaultValuePattern = _props.defaultValuePattern,
          value = _props.value,
          onChange = _props.onChange;
      var currentTab = this.state.currentTab;

      var trimmedValue = value.trim();
      var trimmedValueLength = trimmedValue.length;
      var convertedValue = this.convertValue(trimmedValue, nextTab);

      /*
       * Check against default value - we have to compare the plain
       * value, not the LaTeX format value with `\text{}` wrapping.
       */
      var isDefaultValue = (0, _convertFormats.isLaTeXExpr)(trimmedValue) ? defaultValuePattern.test(convertedValue) : defaultValuePattern.test(trimmedValue);

      var switchingBetweenRichAndHtml = currentTab === 'RICH_TEXT' && nextTab === 'HTML' || currentTab === 'HTML' && nextTab === 'RICH_TEXT';

      if (!isDefaultValue && trimmedValueLength > 0 && !switchingBetweenRichAndHtml) {
        // Show confirmation dialogue and defer tab change.
        var messages = void 0;

        if (!(0, _convertFormats.isLaTeXExpr)(value)) {
          messages = [_("LaTeX is a math typesetting language that doesn't work with rich text."), _('Continuing will convert your note to LaTeX-style text.')];
        } else if ((0, _convertFormats.hasTextExpression)(value)) {
          messages = [_('Rich text is incompatible with LaTeX.'), _('Continuing will convert your LaTeX expression into raw text.')];
        } else {
          messages = [_('Rich text is incompatible with LaTeX.'), _('Continuing will remove your expression.')];
        }

        this.setState({
          nextTab: nextTab,
          messages: messages
        });

        return;
      }

      // Show requested tab immediately.
      this.setState({
        currentTab: nextTab
      });

      // Convert the annotation and dispatch onChange action
      onChange(convertedValue);
    }
  }, {
    key: 'renderConfirmationPanel',
    value: function renderConfirmationPanel(render) {
      var _this2 = this;

      if (!render) {
        return null;
      }

      var _ = this.context.localize;
      var messages = this.state.messages;


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
          currentTab: nextTab,
          nextTab: null
        });

        // Convert the annotation
        var convertedValue = _this2.convertValue(value, nextTab);
        onChange(convertedValue);
      };

      return _react2.default.createElement(
        'div',
        { className: 'multi-format-editor__confirmation-panel' },
        _react2.default.createElement(
          'div',
          { className: 'multi-format-editor__confirmation-panel__content' },
          _react2.default.createElement(
            'h3',
            { className: 'multi-format-editor__confirmation-panel__header' },
            _('Heads up!')
          ),
          _react2.default.createElement(
            'div',
            { className: 'multi-format-editor__confirmation-panel__message' },
            _react2.default.createElement(
              'p',
              { className: 'multi-format-editor__confirmation-panel__message-primary' },
              messages[0]
            ),
            _react2.default.createElement(
              'p',
              { className: 'multi-format-editor__confirmation-panel__message-secondary' },
              messages[1]
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'multi-format-editor__confirmation-panel__actions' },
          _react2.default.createElement(
            _Button2.default,
            {
              variant: 'default',
              className: 'multi-format-editor__confirmation-panel__cancel-button',
              onClick: onCancel
            },
            _('Go back')
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              variant: 'primary',
              className: 'multi-format-editor__confirmation-panel__continue-button',
              onClick: onContinue
            },
            _('Continue')
          )
        )
      );
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(render) {
      var _this3 = this;

      if (!render) {
        return null;
      }
      var _ = this.context.localize;
      var _props3 = this.props,
          onChange = _props3.onChange,
          placeholder = _props3.placeholder,
          value = _props3.value;
      var currentTab = this.state.currentTab;


      var richTextClassNames = (0, _classnames2.default)('multi-format-editor__tab', 'top-tab', 'left', {
        selected: currentTab === 'RICH_TEXT'
      });
      var latexClassNames = (0, _classnames2.default)('multi-format-editor__tab', 'top-tab', 'right', {
        selected: currentTab === 'LATEX'
      });
      var bottomTabClassNames = (0, _classnames2.default)('multi-format-editor__tab', 'bottom-tab');

      var Editor = this.editors.filter(function (editor) {
        return editor.key === currentTab;
      })[0].component;

      var ModeTabsText = this.editors.map(function (editor) {
        return editor.label;
      });

      var showBottomTab = currentTab === 'HTML' || currentTab === 'RICH_TEXT';
      var BottomTab = currentTab === 'HTML' ? _react2.default.createElement(
        'div',
        { className: bottomTabClassNames, onClick: function onClick() {
            return _this3.onModeChange('RICH_TEXT');
          } },
        _('Edit in Rich Text')
      ) : _react2.default.createElement(
        'div',
        { className: bottomTabClassNames, onClick: function onClick() {
            return _this3.onModeChange('HTML');
          } },
        _('Edit in HTML')
      );

      return _react2.default.createElement(
        'div',
        { className: 'multi-format-editor__root__wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'multi-format-editor__tabs' },
          _react2.default.createElement(
            'div',
            { className: richTextClassNames, onClick: function onClick() {
                return _this3.onModeChange('RICH_TEXT');
              } },
            ModeTabsText[0]
          ),
          _react2.default.createElement(
            'div',
            { className: latexClassNames, onClick: function onClick() {
                return _this3.onModeChange('LATEX');
              } },
            ModeTabsText[1]
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'multi-format-editor__content__wrapper__' + currentTab.toLowerCase() },
          _react2.default.createElement(Editor, {
            className: 'multi-format-editor__' + currentTab.toLowerCase(),
            onChange: onChange,
            placeholder: placeholder,
            value: value
          })
        ),
        showBottomTab ? BottomTab : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      /*
       * `renderConfirmationPanel` and `renderEditor` are mutually
       * exclusive; only one will return a component.
       */
      var nextTab = this.state.nextTab;

      var content = this.renderConfirmationPanel(nextTab !== null) || this.renderEditor(nextTab === null);

      return _react2.default.createElement(
        'div',
        { className: 'multi-format-editor__root' },
        content
      );
    }
  }]);

  return MultiFormatTextEditor;
}(_react.Component);

MultiFormatTextEditor.propTypes = {
  defaultValuePattern: _propTypes2.default.instanceOf(RegExp),
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string
};

MultiFormatTextEditor.defaultProps = {
  defaultValuePattern: /^$/,
  placeholder: '',
  value: ''
};

MultiFormatTextEditor.contextType = _context.EditorControlsContext;

exports.default = MultiFormatTextEditor;
//# sourceMappingURL=MultiFormat.js.map
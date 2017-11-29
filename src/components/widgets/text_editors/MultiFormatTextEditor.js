import HTMLEditor from './HTML';
import LaTeXEditor from './LaTeX';
import React, {PropTypes, Component} from 'react';
import RichTextEditor from './RichText';
import localize from '../../../lib/localize';
import {
  isLaTeXExpr,
  htmlToLaTeX,
  laTeXToHTML,
  hasTextExpression,
} from './convertFormats';

class MultiFormatTextEditor extends Component {
  constructor(props) {
    super(props);

    const _ = props.localize;

    const editors = [
      {
        key: 'RICH_TEXT',
        label: _('Rich Text'),
        component: RichTextEditor,
      },
      {
        key: 'LATEX',
        label: _('LaTeX'),
        component: LaTeXEditor,
      },
      {
        key: 'HTML',
        label: _('Edit in HTML'),
        component: HTMLEditor,
      },
    ];

    const startTab = isLaTeXExpr(props.value) ? 'LATEX' : 'RICH_TEXT';

    this.state = {
      /*
       * When nextTab is set, we are waiting for confirmation from the
       * user before switching to the next tab.
       */
      nextTab: null,
      mode: startTab,
      messages: [],
    };

    this.onModeChange = this.onModeChange.bind(this);
    this.editors = editors;
  }

  /**
   * Convert a value to the format expected by the provided editor.
   *
   * @param {String} value The current value
   * @param {String} editor The editor to convert for [RICH_TEXT|LATEX]
   * @returns {String} The converted value
   */
  convertValue(value, editor) {
    return editor === this.editors[1].key
      ? htmlToLaTeX(value)
      : laTeXToHTML(value);
  }

  onModeChange(nextMode) {
    const {defaultValuePattern, value, onChange, localize: _} = this.props;
    const trimmedValue = value.trim();
    const trimmedValueLength = trimmedValue.length;
    const convertedValue = this.convertValue(trimmedValue, nextMode);

    /*
     * Check against default value - we have to compare the plain
     * value, not the LaTeX format value with `\text{}` wrapping.
     */
    const isDefaultValue = isLaTeXExpr(trimmedValue)
      ? defaultValuePattern.test(convertedValue)
      : defaultValuePattern.test(trimmedValue);

    if (!isDefaultValue && trimmedValueLength > 0) {
      // Show confirmation dialogue and defer tab change.
      let messages;

      if (!isLaTeXExpr(value)) {
        messages = [
          _(
            "LaTeX is a math typesetting language that doesn't work with rich text."
          ),
          _('Continuing will convert your note to LaTeX-style text.'),
        ];
      } else if (hasTextExpression(value)) {
        messages = [
          _('Rich text is incompatible with LaTeX.'),
          _('Continuing will convert your LaTeX expression into raw text.'),
        ];
      } else {
        messages = [
          _('Rich text is incompatible with LaTeX.'),
          _('Continuing will remove your expression.'),
        ];
      }

      this.setState({
        nextTab: nextMode,
        messages,
      });

      return;
    }

    // Show requested tab immediately.
    this.setState({
      mode: nextMode,
    });

    // Convert the annotation and dispatch onChange action
    onChange(convertedValue);
  }

  renderConfirmationPanel(render) {
    if (!render) {
      return null;
    }

    const {localize: _} = this.props;
    const {messages} = this.state;

    const onCancel = () => {
      this.setState({
        nextTab: null,
      });
    };

    const onContinue = () => {
      const {nextTab} = this.state;
      const {onChange, value} = this.props;

      // Set next tab as active
      this.setState({
        mode: nextTab,
        nextTab: null,
      });

      // Convert the annotation
      const convertedValue = this.convertValue(value, nextTab);
      onChange(convertedValue);
    };

    return (
      <div className="confirmation-panel">
        <h5 className="confirmation-panel__header">{_('Heads up!')}</h5>

        <p className="+weight-normal">{messages[0]}</p>

        <p className="+weight-light">{messages[1]}</p>

        <button
          className="btnbase btn--default confirmation-panel__btn-cancel"
          onClick={onCancel}
        >
          {_('Go back')}
        </button>
        <button
          className="btnbase btn--primary confirmation-panel__btn-continue"
          onClick={onContinue}
        >
          {_('Continue')}
        </button>
      </div>
    );
  }

  renderEditor(render) {
    if (!render) {
      return null;
    }

    const {onChange, placeholder, value, localize: _} = this.props;
    const {mode} = this.state;

    const Editor = this.editors.filter(editor => editor.key === mode)[0]
      .component;

    const ModeTabsText = this.editors.map(editor => editor.label);

    const showHTMLButton = mode === 'HTML' || mode === 'RICH_TEXT';

    return (
      <div>
        <div className="multi-format-editor__top-tabs">
          <span onClick={() => this.onModeChange('RICH_TEXT')}>
            {ModeTabsText[0]}
          </span>
          <span onClick={() => this.onModeChange('LATEX')}>
            {ModeTabsText[1]}
          </span>
        </div>
        <div>
          <Editor onChange={onChange} placeholder={placeholder} value={value} />
          {showHTMLButton ? (
            <div onClick={() => this.onModeChange('HTML')}>
              {ModeTabsText[2]}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const renderConfirmationPanel = this.state.nextTab !== null;
    /*
     * `renderConfirmationPanel` and `renderTabPanel` are mutually
     * exclusive; only one will return a component.
     */
    return (
      this.renderConfirmationPanel(renderConfirmationPanel) ||
      this.renderEditor(!renderConfirmationPanel)
    );
  }
}

MultiFormatTextEditor.propTypes = {
  defaultValuePattern: PropTypes.instanceOf(RegExp),
  localize: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

MultiFormatTextEditor.defaultProps = {
  defaultValuePattern: /^$/,
  placeholder: '',
  value: '',
};

export default localize(MultiFormatTextEditor);

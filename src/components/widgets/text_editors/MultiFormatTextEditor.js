import HTMLEditor from './HTML';
import LaTeXEditor from './LaTeX';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from './RichText';
import localize from '../../../lib/localize';
import {
  isLaTeXExpr,
  htmlToLaTeX,
  laTeXToHTML,
  hasTextExpression,
} from './convertFormats';
import classnames from 'classnames';

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
      currentTab: startTab,
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
    const {currentTab} = this.state;

    if (currentTab === 'RICH_TEXT' && editor === 'LATEX') {
      return htmlToLaTeX(value);
    }

    if (currentTab === 'LATEX' && editor === 'RICH_TEXT') {
      return laTeXToHTML(value);
    }

    if (currentTab === 'HTML' && editor === 'LATEX') {
      return htmlToLaTeX(value);
    }

    /*
     * Else we're switching from / to HTML / Rich Text Editor
     * no conversion is needed
     */
    return value;
  }

  onModeChange(nextTab) {
    const {defaultValuePattern, value, onChange, localize: _} = this.props;
    const {currentTab} = this.state;
    const trimmedValue = value.trim();
    const trimmedValueLength = trimmedValue.length;
    const convertedValue = this.convertValue(trimmedValue, nextTab);

    /*
     * Check against default value - we have to compare the plain
     * value, not the LaTeX format value with `\text{}` wrapping.
     */
    const isDefaultValue = isLaTeXExpr(trimmedValue)
      ? defaultValuePattern.test(convertedValue)
      : defaultValuePattern.test(trimmedValue);

    const switchingBetweenRichAndHtml =
      (currentTab === 'RICH_TEXT' && nextTab === 'HTML') ||
      (currentTab === 'HTML' && nextTab === 'RICH_TEXT');

    if (
      !isDefaultValue &&
      trimmedValueLength > 0 &&
      !switchingBetweenRichAndHtml
    ) {
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
        nextTab,
        messages,
      });

      return;
    }

    // Show requested tab immediately.
    this.setState({
      currentTab: nextTab,
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
        currentTab: nextTab,
        nextTab: null,
      });

      // Convert the annotation
      const convertedValue = this.convertValue(value, nextTab);
      onChange(convertedValue);
    };

    return (
      <div className="confirmation-panel">
        <div className="confirmation-panel__content">
          <h3 className="confirmation-panel__header">{_('Heads up!')}</h3>
          <div className="confirmation-panel__message">
            <p className="confirmation-panel__message-primary">{messages[0]}</p>
            <p className="confirmation-panel__message-secondary">
              {messages[1]}
            </p>
          </div>

          <button
            className="confirmation-panel__cancel-button"
            onClick={onCancel}
          >
            {_('Go back')}
          </button>
          <button
            className="confirmation-panel__continue-button"
            onClick={onContinue}
          >
            {_('Continue')}
          </button>
        </div>
      </div>
    );
  }

  renderEditor(render) {
    if (!render) {
      return null;
    }

    const {onChange, placeholder, value, localize: _} = this.props;
    const {currentTab} = this.state;

    const richTextClassNames = classnames(
      'multi-format-editor__tab',
      'top-tab',
      'left',
      {selected: currentTab === 'RICH_TEXT'}
    );
    const latexClassNames = classnames(
      'multi-format-editor__tab',
      'top-tab',
      'right',
      {selected: currentTab === 'LATEX'}
    );
    const bottomTabClassNames = classnames(
      'multi-format-editor__tab',
      'bottom-tab'
    );

    const Editor = this.editors.filter(editor => editor.key === currentTab)[0]
      .component;

    const ModeTabsText = this.editors.map(editor => editor.label);

    const showBottomTab = currentTab === 'HTML' || currentTab === 'RICH_TEXT';
    const BottomTab =
      currentTab === 'HTML' ? (
        <div
          className={bottomTabClassNames}
          onClick={() => this.onModeChange('RICH_TEXT')}
        >
          {_('Edit in Rich Text')}
        </div>
      ) : (
        <div
          className={bottomTabClassNames}
          onClick={() => this.onModeChange('HTML')}
        >
          {_('Edit in HTML')}
        </div>
      );

    return (
      <div>
        <div
          className={richTextClassNames}
          onClick={() => this.onModeChange('RICH_TEXT')}
        >
          {ModeTabsText[0]}
        </div>
        <div
          className={latexClassNames}
          onClick={() => this.onModeChange('LATEX')}
        >
          {ModeTabsText[1]}
        </div>

        <Editor
          className="editor-content"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />

        {showBottomTab ? BottomTab : null}
      </div>
    );
  }

  render() {
    /*
     * `renderConfirmationPanel` and `renderEditor` are mutually
     * exclusive; only one will return a component.
     */
    const {nextTab} = this.state;
    const content =
      this.renderConfirmationPanel(nextTab !== null) ||
      this.renderEditor(nextTab === null);

    return <div className="multi-format-editor__root">{content}</div>;
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

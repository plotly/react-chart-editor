import HTMLEditor from './HTML';
import LaTeXEditor from './LaTeX';
import {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from './RichText';
import {isLaTeXExpr, htmlToLaTeX, laTeXToHTML, hasTextExpression} from './convertFormats';
import classnames from 'classnames';
import Button from 'components/widgets/Button';

class MultiFormatTextEditor extends Component {
  constructor(props, context) {
    super(props, context);

    const _ = context.localize;

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
    const {localize: _} = this.context;
    const {defaultValuePattern, value, onChange} = this.props;
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

    if (!isDefaultValue && trimmedValueLength > 0 && !switchingBetweenRichAndHtml) {
      // Show confirmation dialogue and defer tab change.
      let messages;

      if (!isLaTeXExpr(value)) {
        messages = [
          _("LaTeX is a math typesetting language that doesn't work with rich text."),
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

    const {localize: _} = this.context;
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
      <div className="multi-format-editor__confirmation-panel">
        <div className="multi-format-editor__confirmation-panel__content">
          <h3 className="multi-format-editor__confirmation-panel__header">{_('Heads up!')}</h3>
          <div className="multi-format-editor__confirmation-panel__message">
            <p className="multi-format-editor__confirmation-panel__message-primary">
              {messages[0]}
            </p>
            <p className="multi-format-editor__confirmation-panel__message-secondary">
              {messages[1]}
            </p>
          </div>
        </div>
        <div className="multi-format-editor__confirmation-panel__actions">
          <Button
            variant="default"
            className="multi-format-editor__confirmation-panel__cancel-button"
            onClick={onCancel}
          >
            {_('Go back')}
          </Button>
          <Button
            variant="primary"
            className="multi-format-editor__confirmation-panel__continue-button"
            onClick={onContinue}
          >
            {_('Continue')}
          </Button>
        </div>
      </div>
    );
  }

  renderEditor(render) {
    if (!render) {
      return null;
    }
    const {localize: _} = this.context;
    const {onChange, placeholder, value} = this.props;

    const {currentTab} = this.state;

    const richTextClassNames = classnames('multi-format-editor__tab', 'top-tab', 'left', {
      selected: currentTab === 'RICH_TEXT',
    });
    const latexClassNames = classnames('multi-format-editor__tab', 'top-tab', 'right', {
      selected: currentTab === 'LATEX',
    });
    const bottomTabClassNames = classnames('multi-format-editor__tab', 'bottom-tab');

    const Editor = this.editors.filter((editor) => editor.key === currentTab)[0].component;

    const ModeTabsText = this.editors.map((editor) => editor.label);

    const showBottomTab = currentTab === 'HTML' || currentTab === 'RICH_TEXT';
    const BottomTab =
      currentTab === 'HTML' ? (
        <div className={bottomTabClassNames} onClick={() => this.onModeChange('RICH_TEXT')}>
          {_('Edit in Rich Text')}
        </div>
      ) : (
        <div className={bottomTabClassNames} onClick={() => this.onModeChange('HTML')}>
          {_('Edit in HTML')}
        </div>
      );

    return (
      <div className="multi-format-editor__root__wrapper">
        <div className="multi-format-editor__tabs">
          <div className={richTextClassNames} onClick={() => this.onModeChange('RICH_TEXT')}>
            {ModeTabsText[0]}
          </div>
          <div className={latexClassNames} onClick={() => this.onModeChange('LATEX')}>
            {ModeTabsText[1]}
          </div>
        </div>
        <div className={`multi-format-editor__content__wrapper__${currentTab.toLowerCase()}`}>
          <Editor
            className={`multi-format-editor__${currentTab.toLowerCase()}`}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        </div>
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
      this.renderConfirmationPanel(nextTab !== null) || this.renderEditor(nextTab === null);

    return <div className="multi-format-editor__root">{content}</div>;
  }
}

MultiFormatTextEditor.propTypes = {
  defaultValuePattern: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

MultiFormatTextEditor.defaultProps = {
  defaultValuePattern: /^$/,
  placeholder: '',
  value: '',
};

MultiFormatTextEditor.contextTypes = {
  localize: PropTypes.func,
};

export default MultiFormatTextEditor;

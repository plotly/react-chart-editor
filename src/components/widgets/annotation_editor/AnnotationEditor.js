import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import TabPanel from "@workspace/components/widgets/TabPanel";
import ModeSwitchPanel from "@workspace/components/widgets/annotation_editor/ModeSwitchPanel";

import { _ } from "@common/utils/i18n";
import {
  isLaTeXExpr,
  htmlToLaTeX,
  laTeXToHTML,
} from "@workspace/components/widgets/annotation_editor/convertFormats";

import FormatSwitchConfirmationPanel from "@workspace/components/widgets/annotation_editor/FormatSwitchConfirmationPanel";
import RichTextEditor from "./editors/RichTextEditor";
import HTMLEditor from "./editors/HTMLEditor";
import LaTeXEditor from "./editors/LaTeXEditor";

const MULTI_MODE_TAB = {
  key: "RICH_TEXT",
  label: _("Rich Text"),
};
const LATEX_TAB = {
  key: "LATEX",
  label: _("LaTeX"),
};

const EDIT_MODE_HTML = "HTML";
const EDIT_MODE_RICH_TEXT = "RICH_TEXT";

const EDIT_MODE_STATE_TRANSITIONS = {
  [EDIT_MODE_HTML]: EDIT_MODE_RICH_TEXT,
  [EDIT_MODE_RICH_TEXT]: EDIT_MODE_HTML,
};

const AnnotationEditor = React.createClass({
  propTypes: {
    defaultValuePattern: PropTypes.instanceOf(RegExp),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  },

  getDefaultProps() {
    return {
      defaultValuePattern: /^$/,
      placeholder: "",
      value: "",
    };
  },

  getInitialState() {
    const startTab = isLaTeXExpr(this.props.value)
      ? LATEX_TAB.key
      : MULTI_MODE_TAB.key;

    return {
      /*
             * When nextTab is set, we are waiting for confirmation from the
             * user before switching to the next tab.
             */
      nextTab: null,
      selectedTab: startTab,
    };
  },

  /**
     * Convert a value to the format expected by the provided editor.
     *
     * @param {String} value The current value
     * @param {String} editor The editor to convert for [RICH_TEXT|LATEX]
     * @returns {String} The converted value
     */
  convertValue(value, editor) {
    return editor === LATEX_TAB.key ? htmlToLaTeX(value) : laTeXToHTML(value);
  },

  renderTabPanel(render) {
    if (!render) return null;

    const { onChange, placeholder, value } = this.props;

    const RichTextEditorPanelContent = (
      <RichTextEditor
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    );

    const HTMLEditorPanelContent = (
      <HTMLEditor onChange={onChange} placeholder={placeholder} value={value} />
    );

    const MultiModeTabContent = (
      <ModeSwitchPanel
        modesToComponents={{
          [EDIT_MODE_RICH_TEXT]: RichTextEditorPanelContent,
          [EDIT_MODE_HTML]: HTMLEditorPanelContent,
        }}
        modesToButtonLabels={{
          [EDIT_MODE_RICH_TEXT]: _("Edit in HTML"),
          [EDIT_MODE_HTML]: _("Edit in Rich Text"),
        }}
        modeTransitions={EDIT_MODE_STATE_TRANSITIONS}
        defaultMode={EDIT_MODE_RICH_TEXT}
      />
    );

    const LaTeXTabContent = (
      <LaTeXEditor
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    );

    const onTabChange = (selectedTab, nextTab) => {
      const { defaultValuePattern } = this.props;
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

      if (!isDefaultValue && trimmedValueLength > 0) {
        // Show confirmation dialogue and defer tab change.
        return this.setState({
          nextTab,
        });
      }

      // Show requested tab immediately.
      this.setState({
        selectedTab: nextTab,
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
    return (
      <TabPanel
        tabs={[MULTI_MODE_TAB, LATEX_TAB]}
        components={{
          [MULTI_MODE_TAB.key]: MultiModeTabContent,
          [LATEX_TAB.key]: LaTeXTabContent,
        }}
        selectedTab={this.state.selectedTab}
        onTabChange={onTabChange}
      />
    );
  },

  renderConfirmationPanel(render) {
    if (!render) return null;

    const onCancel = () => {
      this.setState({
        nextTab: null,
      });
    };

    const onContinue = () => {
      const { nextTab } = this.state;
      const { onChange, value } = this.props;

      // Set next tab as active
      this.setState({
        selectedTab: nextTab,
        nextTab: null,
      });

      // Convert the annotation
      const convertedValue = this.convertValue(value, nextTab);
      onChange(convertedValue);
    };

    return (
      <FormatSwitchConfirmationPanel
        onCancel={onCancel}
        onContinue={onContinue}
        value={this.props.value}
      />
    );
  },

  render() {
    const renderConfirmationPanel = this.state.nextTab !== null;

    /*
         * `renderConfirmationPanel` and `renderTabPanel` are mutually
         * exclusive; only one will return a component.
         */
    return (
      <div>
        {this.renderConfirmationPanel(renderConfirmationPanel)}
        {this.renderTabPanel(!renderConfirmationPanel)}
      </div>
    );
  },
});

export default AnnotationEditor;

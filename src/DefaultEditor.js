import React, { Component } from "react";
import PropTypes from "prop-types";
import { localize } from "./lib";

import TraceAccordion from "./components/TraceAccordion";
import Panel from "./components/Panel";
import Select from "./components/Select";
import Numeric from "./components/Numeric";
import ColorPicker from "./components/Color";
import Section from "./components/Section";
import Flaglist from "./components/Flaglist";
import Radio from "./components/Radio";
import PanelMenuWrapper from "./components/PanelMenuWrapper";

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;
  }

  render() {
    const _ = this.props.localize;

    return (
      <PanelMenuWrapper>
        <Panel section="Graph" name="Create">
          <TraceAccordion>
            <Section heading={_("Trace")}>
              <Numeric
                label={_("Opacity")}
                min={0}
                max={1}
                step={0.1}
                attr="opacity"
              />
            </Section>
          </TraceAccordion>
        </Panel>

        <Panel section="Style" name="Traces">
          <TraceAccordion />
        </Panel>
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.contextTypes = {
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
};

export default localize(DefaultEditor);

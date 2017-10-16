import React, { Component } from "react";
import PropTypes from "prop-types";
import { localize } from "./lib";

import TraceAccordion from "./components/TraceAccordion";
import Panel from "./components/Panel";
import Numeric from "./components/Numeric";
import ColorPicker from "./components/Color";
import Section from "./components/Section";
import Flaglist from "./components/Flaglist";
import Radio from "./components/Radio";
import PanelMenuWrapper from "./components/PanelMenuWrapper";
import Dropdown from "./components/Dropdown";

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
          <TraceAccordion canAdd>
            <Dropdown
              label="Plot Type"
              clearable={false}
              attr="mode"
              options={[
                { label: "Line", value: "lines" },
                { label: "Scatter", value: "markers" },
                { label: "Scatter line", value: "lines+markers" },
              ]}
            />

            <Dropdown
              label="X"
              attr="xsrc"
              options={this.dataSourceNames}
              clearable={false}
              show
              hasBlank
            />

            <Dropdown
              label="Y"
              attr="ysrc"
              options={this.dataSourceNames}
              clearable={false}
              show
              hasBlank
            />
          </TraceAccordion>
        </Panel>

        <Panel section="Style" name="Traces">
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

            <Section heading={_("Display")}>
              <Flaglist
                attr="mode"
                options={[
                  { label: "Lines", value: "lines" },
                  { label: "Points", value: "markers" },
                ]}
              />
            </Section>

            <Section heading={_("Filled Area")}>
              <Dropdown
                label="Fill to"
                attr="fill"
                clearable={false}
                options={[
                  { label: "None", value: "none" },
                  { label: "Y = 0", value: "tozeroy" },
                  { label: "X = 0", value: "tozerox" },
                  { label: "Previous Y", value: "tonexty" },
                  { label: "Previous X", value: "tonextx" },
                ]}
              />

              <ColorPicker label={_("Color")} attr="fillcolor" />
            </Section>

            <Section heading={_("Points")}>
              <Numeric
                label={_("Marker Opacity")}
                min={0}
                max={1}
                step={0.1}
                attr="marker.opacity"
              />

              <ColorPicker label={_("Marker Color")} attr="marker.color" />

              <Numeric label={_("Size")} min={0} attr="marker.size" />

              <Numeric
                label={_("Line width")}
                min={0}
                attr="marker.line.width"
              />
            </Section>

            <Section heading={_("Lines")}>
              <Numeric
                label={_("Width")}
                min={0}
                step={1.0}
                attr="line.width"
              />

              <ColorPicker label={_("Line color")} attr="line.color" />

              <Radio
                label={_("Connect Gaps")}
                attr="connectgaps"
                options={[
                  { value: true, label: "Connect" },
                  { value: false, label: "Blank" },
                ]}
              />
            </Section>
          </TraceAccordion>
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

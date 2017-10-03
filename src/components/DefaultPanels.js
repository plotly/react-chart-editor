import React from "react";
import Base from "./base";
import PropTypes from "prop-types";

import TraceAccordion from "./TraceAccordion";
import Panel from "./Panel";
import Select from "./Select";
import Numeric from "./Numeric";
import ColorPicker from "./Color";
import Section from "./Section";
import Flaglist from "./Flaglist";
import Radio from "./Radio";

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
class DefaultPanels extends Base {
  constructor(props, context) {
    super(props, context);
    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;
  }

  render() {
    const _ = this._;

    return (
      <div>
        <Panel name="graph-create">
          <TraceAccordion
            render={() => (
              <div>
                <Select
                  label="Plot Type"
                  attr="mode"
                  options={[
                    { label: "Line", value: "lines" },
                    { label: "Scatter", value: "markers" },
                    { label: "Scatter line", value: "lines+markers" },
                  ]}
                />

                <Select label="X" attr="xsrc" options={this.dataSourceNames} />

                <Select label="Y" attr="ysrc" options={this.dataSourceNames} />

                <Numeric label={_("Marker Size")} attr="marker.size" />
              </div>
            )}
          />
        </Panel>

        <Panel name="style-traces">
          <TraceAccordion
            render={() => (
              <div>
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

                  <Radio label={_("Connect Gaps")} attr="connectgaps" />
                </Section>
              </div>
            )}
          />
        </Panel>
      </div>
    );
  }
}

// It's not enough for Base to specify which context it accepts. This component
// must manually pull Base's defined context types into its own.
DefaultPanels.contextTypes = Object.assign(
  {
    dataSources: PropTypes.object,
    dataSourceNames: PropTypes.array,
  },
  Base.contextTypes
);

export default DefaultPanels;

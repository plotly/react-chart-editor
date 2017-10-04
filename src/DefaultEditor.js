import React from "react";

import {
  TraceAccordion,
  Panel,
  Select,
  Numeric,
  ColorPicker,
  Section,
  Flaglist,
  Radio,
  PanelsWithModeMenu,
  PlotlyEditorBase,
} from "./components";

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
class DefaultEditor extends PlotlyEditorBase {
  render() {
    const _ = this._;

    return (
      <PanelsWithModeMenu>
        <Panel section="Graph" name="Create">
          <TraceAccordion>
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
          </TraceAccordion>
        </Panel>
      </PanelsWithModeMenu>
    );
  }
}

export default DefaultEditor;

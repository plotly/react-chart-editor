import React, { Component } from "react";
import PropTypes from "prop-types";

import TraceAccordion from "./trace-accordion";
import Panel from "./panel";
import Select from "./select";

/*
 * These are the built-in panels for the editor. If the editor has children specified,
 * those panels will override these.
 */
class DefaultPanels extends Component {
  constructor(props, context) {
    super(props);
    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;
  }

  render() {
    return (
      <div>
        <Panel name="graph-create">
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

            <Select
              label="Marker Size"
              attr="marker.size"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14]}
            />
          </TraceAccordion>
        </Panel>
      </div>
    );
  }
}

DefaultPanels.contextTypes = {
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
};

export default DefaultPanels;

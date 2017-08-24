import React, { Component } from "react";
import PropTypes from "prop-types";

import TraceAccordion from "./trace-accordion";
import Panel from "./panel";
import Select from "./select";

class Panels extends Component {
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
          </TraceAccordion>
        </Panel>
      </div>
    );
  }
}

Panels.contextTypes = {
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
};

export default Panels;

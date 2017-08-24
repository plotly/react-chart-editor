import React, { Component } from "react";

import TraceAccordion from "./trace-accordion";
import Panel from "./panel";
import Select from "./select";

class Editor extends Component {
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

            <Select
              label="Marker Color"
              attr="marker.color"
              options={[
                { label: "Red", value: "red" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ]}
            />
          </TraceAccordion>
        </Panel>
      </div>
    );
  }
}

export default Editor;

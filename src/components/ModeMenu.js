import React, { Component } from "react";
import { bem } from "../common";

import ModeMenuSection from "./ModeMenuSection";

export default class ModeMenu extends Component {
  render() {
    return (
      <div className={bem("mode-menu")}>
        <ModeMenuSection
          label="Graph"
          section="graph"
          expanded
          onChangeSection={this.props.onChangeSection}
          currentSection={this.props.currentSection}
          sections={["Create", "Filter", "Group"]}
        />
        <ModeMenuSection
          label="Style"
          section="style"
          expanded
          onChangeSection={this.props.onChangeSection}
          currentSection={this.props.currentSection}
          sections={[
            "Traces",
            "Layout",
            "Notes",
            "Axes",
            "Legend",
            "Shapes",
            "Images",
          ]}
        />
      </div>
    );
  }
}

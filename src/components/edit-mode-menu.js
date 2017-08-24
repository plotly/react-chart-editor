import React, { Component } from "react";

import EditModeMenuItem from "./edit-mode-menu-item.js";

export default class EditModeMenu extends Component {
  render() {
    return (
      <div className="editModeMenu">
        <EditModeMenuItem
          name="Graph"
          expanded
          onChangeSection={this.props.onChangeSection}
          currentSection={this.props.currentSection}
          sections={["Create", "Filter", "Group"]}
        />
        <EditModeMenuItem
          name="Style"
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

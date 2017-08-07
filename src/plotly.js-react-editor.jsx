import React, { Component } from "react";
import constants from "./constants";

import EditModeMenu from "./components/edit-mode-menu.jsx";

export default class PlotlyReactEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "Graph-Create",
    };

    this.setSection = this.setSection.bind(this);
  }

  setSection(section) {
    this.setState({ section });
  }

  render() {
    return (
      <div className="plotlyjsReactEditor">
        <EditModeMenu
          currentSection={this.state.section}
          onChangeSection={this.setSection}
        />
      </div>
    );
  }
}

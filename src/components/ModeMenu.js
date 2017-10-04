import React, { Component } from "react";
import { bem } from "../common";

import ModeMenuSection from "./ModeMenuSection";

export default class ModeMenu extends Component {
  render() {
    return (
      <div className={bem("mode-menu")}>
        {this.props.sections.map(this.renderSection)}
      </div>
    );
  }
}

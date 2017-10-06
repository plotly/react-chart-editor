import React, { Component } from "react";
import { bem } from "../lib";

export default class ModeMenuItem extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={bem("mode-menu-item", [
          this.props.active ? "is-active" : "",
        ])}
      >
        {this.props.label}
      </div>
    );
  }
}

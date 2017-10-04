import React, { Component } from "react";
import PropTypes from "prop-types";
import { bem } from "../common";

class Panel extends Component {
  render() {
    if (this.props.visible) {
      return <div className={bem("panel")}>{this.props.children}</div>;
    } else {
      return <div />;
    }
  }
}

export default Panel;

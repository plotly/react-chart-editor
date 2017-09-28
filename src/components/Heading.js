import React, { Component } from "react";
import PropTypes from "prop-types";
import { bem } from "../common";

class Heading extends Component {
  constructor(props, context) {
    super(props);
    this.section = context.section;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.section = nextContext.section;
  }

  render() {
    return (
      <div className={bem("section")}>
        <div className={bem("section", "heading")}>{this.props.label}</div>
        {this.props.children}
      </div>
    );
  }
}

Heading.contextTypes = {
  label: PropTypes.string,
};

export default Heading;

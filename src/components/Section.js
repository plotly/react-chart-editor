import React, { Component } from "react";
import PropTypes from "prop-types";
import { bem } from "../lib";

class Section extends Component {
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
        <div className={bem("section", "heading")}>{this.props.heading}</div>
        {this.props.children}
      </div>
    );
  }
}

Section.contextTypes = {
  heading: PropTypes.string,
};

export default Section;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { bem } from "../common";

class Panel extends Component {
  constructor(props, context) {
    super(props);
    this.section = context.section;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.section = nextContext.section;
  }

  render() {
    if (this.props.name === this.section) {
      return <div className={bem("panel")}>{this.props.children}</div>;
    } else {
      return <div />;
    }
  }
}

Panel.contextTypes = {
  section: PropTypes.string,
};

export default Panel;

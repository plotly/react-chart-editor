import React, { Component } from "react";
import PropTypes from "prop-types";

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
      return (
        <div className="panel">
          {this.props.children}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Panel.contextTypes = {
  section: PropTypes.string,
};

export default Panel;

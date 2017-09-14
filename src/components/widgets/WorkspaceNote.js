import React, { Component } from "react";
import PropTypes from "prop-types";

class WorkspaceNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu-item__multiple +line-height-tall">
        {this.props.note}
      </div>
    );
  }
}

WorkspaceNote.propTypes = {
  note: PropTypes.string,
};

module.exports = WorkspaceNote;

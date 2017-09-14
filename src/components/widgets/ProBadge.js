import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class ProBadge extends Component {
  render() {
    if (this.props.hide) {
      return null;
    }

    const className = classnames(
      "probadge",
      "js-probadge",
      this.props.className
    );

    return <div className={className}>pro</div>;
  }
}

ProBadge.propTypes = {
  hide: PropTypes.bool,
  className: PropTypes.string,
};

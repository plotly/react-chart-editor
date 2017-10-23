import classnames from "classnames";
import React, { Component } from "react";

class Spinny extends Component {
  /*
   * Basic Spinner. Has a few size options: 'large spinny', 'small spinny', 'tiny spinny', 'tiniest spinny', 'spinny'
   * Defaults to 'spinny' -> 12 px
   * Can also pass in text to display
   */
  renderText() {
    if (!this.props.text) return null;
    else return <span ref="textIndicator">{this.props.text}</span>;
  }

  render() {
    let spinnyClass = classnames("spinny", this.props.size);

    return (
      <span>
        <div ref="loadingIndicator" className={spinnyClass} />
        {this.renderText()}
      </span>
    );
  }
}

Spinny.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string,
};

export default Spinny;

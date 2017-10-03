import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Hint extends Component {
  constructor() {
    super();

    this.delay = this.delay.bind(this);
    this.reset = this.reset.bind(this);
    this.shown = false;
  }

  delay() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(() => {
      this.timeoutHandle = null;
      this.show = true;
      this.forceUpdate();
    }, this.props.delayMilliseconds);
  }

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.show = false;
  }

  render() {
    const { position, hint, error, children, delayMilliseconds } = this.props;
    const isShowing = Boolean(hint) && (delayMilliseconds ? this.show : true);

    /*
         * When a hint is triggered we reset the timer.
         * Only when a user pauses do we want to show a hint.
         */
    this.reset();

    // If we are using a delay and want to show a hint but its not yet shown
    if (!isShowing && Boolean(hint)) {
      this.delay();
    }

    // If there is no hint or a delayed hint is not being shown
    if (!isShowing) {
      return <div className={this.props.className}>{children}</div>;
    }

    // Now we are either rendering a delayed Hint or a hint with no delay.
    const className = classnames(
      [this.props.className, "hint--always", `hint--${position}`],
      {
        "hint--error": Boolean(hint) && error,
      }
    );

    return (
      <div className={className} data-hint={hint}>
        {children}
      </div>
    );
  }
}

Hint.propTypes = {
  error: PropTypes.bool,
  hint: PropTypes.string,
  className: PropTypes.string,
  delayMilliseconds: PropTypes.number,
  position: PropTypes.oneOf([
    "bottom-right",
    "bottom",
    "bottom-left",
    "right",
    "left",
    "top-right",
    "left",
    "top-right",
    "top",
    "top-left",
  ]),
  children: PropTypes.node,
};

Hint.defaultProps = {
  position: "left",
};

import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * A generic component to handle text input fields that should not
 * propagate their updates until the user blurs or presses enter.
 *
 * If you want to update on every change, use a bare <input> instead.
 *
 * Exposes three events:
 *     onUpdate: fired on blur, and on pressing enter if there is no onEnter
 *     onEnter (optional): fired only when pressing enter
 *     onKeyDown (optional): fired on any keydown. Intended for capturing
 *         special keys like arrow keys, rather than direct changes to the text
 *
 * TODO: use this in NumericInput as well
 * https://github.com/plotly/streambed/issues/8440
 */
export default class DelayedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  getRef(c) {
    this._ref = c;
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  // Selects/highlights all of the text in the input on focus
  handleFocus(event) {
    if (this.props.autoSelect) {
      event.target.select();
    }
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
  }

  handleUpdate({ target: { value } }) {
    const { onUpdate } = this.props;

    this.setState({ value });

    if (onUpdate) {
      onUpdate(value);
    }
  }

  handleKeyDown(event) {
    const { onEnter, onUpdate, onKeyDown } = this.props;

    const key = event.keyCode || event.which;

    // Allow the input to be saved when the enter key is pressed
    if (key === 13) {
      const value = this._ref.value;

      if (onEnter) {
        onEnter(value);
      } else {
        onUpdate(value);
      }
    } else if (key === 27) {
      // revert input with escape key
      this.setState({ value: this.props.value });
    } else if (onKeyDown) {
      // pass anything else on to onKeyDown from props
      onKeyDown(event);
    }
  }

  render() {
    const {
      type,
      className,
      disabled,
      autoFocus,
      placeholder,
      readOnly,
      size,
    } = this.props;
    const { value } = this.state;
    return (
      <input
        ref={this.getRef}
        type={type}
        className={className || ""}
        value={value}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        onBlur={this.handleUpdate}
        disabled={disabled}
        autoFocus={autoFocus}
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        size={size}
      />
    );
  }
}

DelayedTextInput.propTypes = {
  // Called with input value on blur (and enter if no onEnter is given)
  onUpdate: PropTypes.func.isRequired,

  // Called with input value on enter
  onEnter: PropTypes.func,

  // Called on any keydown
  onKeyDown: PropTypes.func,

  // Input value property
  value: PropTypes.string.isRequired,

  // do we select the whole input string on focus?
  autoSelect: PropTypes.bool,

  // Other properties forwarded to <input>
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.oneOf(["text", "password"]),
  size: PropTypes.number,
};

DelayedTextInput.defaultProps = {
  readOnly: false,
  type: "text",
  autoSelect: true,
};

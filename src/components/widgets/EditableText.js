import React, { Component } from "react";
import PropTypes from "prop-types";

// A generic component to handle text that can be edited when the user
// clicks on it.
class EditableText extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getRef(c) {
    this._ref = c;
  }

  // Selects/highlights all of the text in the filename input
  handleClick(event) {
    event.target.select();
  }

  handleChange(event) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  }

  handleUpdate(event) {
    const { onUpdate } = this.props;

    if (onUpdate) {
      onUpdate(event.target.value);
    }
  }

  handleKeyPress(event) {
    // This will force handleUpdate to be called via the input's onBlur
    if ((event.keyCode || event.which) === 13) {
      this._ref.blur();
    }
  }

  render() {
    const {
      type,
      className,
      text,
      disable,
      autoFocus,
      onKeyDown,
      placeholder,
      readOnly,
      size,
    } = this.props;
    return (
      <input
        ref={c => this.getRef}
        type={type}
        className={className || ""}
        value={text}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onBlur={this.handleUpdate}
        disabled={disable}
        autoFocus={autoFocus}
        onKeyPress={this.handleKeyPress}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        size={size}
      />
    );
  }
}

EditableText.propTypes = {
  // Called with input value on changes (as the user types)
  onChange: PropTypes.func,

  // Called with input value on blur (and enter if no onEnter is given)
  onUpdate: PropTypes.func,

  // Called on input keyDown events
  onKeyDown: PropTypes.func,

  // Input value property
  text: PropTypes.string,

  // Input properties
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.oneOf(["text", "password"]),
  size: PropTypes.number,
};

EditableText.defaultProps = {
  readOnly: false,
  type: "text",
};

module.exports = EditableText;

import React, { PropTypes } from "react";
import classnames from "classnames";

const StyleButton = React.createClass({
  propTypes: {
    active: PropTypes.bool,
    // A (styled) React element to display as label
    label: PropTypes.element.isRequired,
    // Callback for clicks
    onToggle: PropTypes.func.isRequired,
    // The value passed to `onToggle` when clicked
    value: PropTypes.string.isRequired,
  },

  onToggle(ev) {
    // Prevent focus moving from editor to button
    ev.preventDefault();
    this.props.onToggle(this.props.value);
  },

  render() {
    const { active, label, value } = this.props;

    const className = classnames(
      "rich-text-editor__styleButton",
      `rich-text-editor__styleButton__${value}`,
      {
        "rich-text-editor__styleButton--active": active,
      }
    );

    return (
      <span className="rich-text-editor__styleButton__wrapper">
        <span
          className={className}
          onMouseDown={this.onToggle}
          data-role="button"
          data-pressed={active}
        >
          {label}
        </span>
      </span>
    );
  },
});

export default StyleButton;

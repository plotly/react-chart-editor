import DelayedTextInput from "./DelayedTextInput";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { MIXED_VALUES, MIXED_MODE_VALUE } from "@workspace/constants/workspace";

export const TEST_SELECTOR_CLASS = "js-TextInput";

/*
 * Input control for text fields without validation
 *
 * Exposes only one event (onUpdate) that fires either
 * on every keystroke (immediate=true) or only on blur/enter
 * (immediate=false)
 */
export default class UncontrolledTextInput extends Component {
  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    this.props.onUpdate(event.target.value);
  }

  // recreate the autoSelect behavior of DelayedTextInput for the
  // immediate, bare <input> case
  handleFocus(event) {
    if (this.props.autoSelect) {
      event.target.select();
    }
  }

  render() {
    const {
      onUpdate,
      immediate,
      value,
      editableClassName,
      disabled,
      readOnly,
      autoSelect,
    } = this.props;

    const displayValue = value === MIXED_VALUES ? MIXED_MODE_VALUE : value;

    // TODO: this isn't *really* numeric but that gives decent style
    const wrapperClassName = classnames("numeric-input__wrapper");

    const editableClass = classnames(
      "numeric-input__number",
      editableClassName,
      TEST_SELECTOR_CLASS
    );

    const commonProps = {
      type: "text",
      value: displayValue,
      className: editableClass,
      disabled,
      readOnly,
    };

    if (immediate) {
      return (
        <div className={wrapperClassName}>
          <input
            onChange={this.handleUpdate}
            onFocus={this.handleFocus}
            {...commonProps}
          />
        </div>
      );
    }

    return (
      <div className={wrapperClassName}>
        <DelayedTextInput
          onUpdate={onUpdate}
          autoSelect={autoSelect}
          {...commonProps}
        />
      </div>
    );
  }
}

UncontrolledTextInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  immediate: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  editableClassName: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoSelect: PropTypes.bool,
};

UncontrolledTextInput.defaultProps = {
  readOnly: false,
  autoSelect: true,
};

import EditableText from "./EditableText";
import React, { Component } from "react";
import PropTypes from "prop-types";
import isNumeric from "fast-isnumeric";
import classnames from "classnames";
import * as customPropTypes from "@workspace/utils/customPropTypes";

export const UP_ARROW = 38;
export const DOWN_ARROW = 40;
export const TEST_SELECTOR_CLASS = "js-NumericInput";

export default class NumericInput extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.incrementValue = this.incrementValue.bind(this);
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case UP_ARROW:
        return this.incrementValue("increase");
      case DOWN_ARROW:
        return this.incrementValue("decrease");
      default:
        break;
    }
  }

  incrementValue(direction) {
    const step = this.props.step || 1;
    let currentValue = this.props.value;

    if (isNumeric(this.props.value)) {
      if (direction === "increase") {
        currentValue = currentValue + step;
      } else {
        currentValue = currentValue - step;
      }
    }

    // incrementers blur the line between blur and onChange.
    if (this.props.onUpdate) {
      this.props.onUpdate(currentValue);
    } else {
      this.props.onChange(currentValue);
    }
  }

  renderArrows() {
    if (!this.props.showArrows) {
      return;
    }

    return (
      <div className="numeric-input__caret-box">
        <div
          className="numeric-input__caret js-numeric-increase"
          onClick={this.incrementValue.bind(this, "increase")}
        >
          <i className="icon-caret-up numeric-top-caret-modifier" />
        </div>
        <div
          className="numeric-input__caret js-numeric-decrease"
          onClick={this.incrementValue.bind(this, "decrease")}
        >
          <i className="icon-caret-down numeric-bottom-caret-modifier" />
        </div>
      </div>
    );
  }

  render() {
    const wrapperClassName = classnames("numeric-input__wrapper");

    const editableClass = classnames(
      "numeric-input__number",
      this.props.editableClassName,
      TEST_SELECTOR_CLASS
    );

    return (
      <div className={wrapperClassName}>
        <EditableText
          className={editableClass}
          text={String(this.props.value)}
          type="text"
          onChange={this.props.onChange}
          onUpdate={this.props.onUpdate}
          onKeyDown={this.onKeyDown}
        />
        {this.renderArrows()}
      </div>
    );
  }
}

NumericInput.propTypes = {
  value: customPropTypes.customOneOfType([
    PropTypes.string,
    customPropTypes.isNumeric,
    customPropTypes.isNull,
  ]).isDefined,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  step: PropTypes.number,
  showArrows: PropTypes.bool,
  editableClassName: PropTypes.string,
};

NumericInput.defaultProps = {
  showError: false,
  showArrows: true,
};

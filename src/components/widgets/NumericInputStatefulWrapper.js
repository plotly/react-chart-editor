import NumericInput from "./NumericInput";
import React, { Component } from "react";
import PropTypes from "prop-types";
import isNumeric from "fast-isnumeric";
import { MIXED_VALUES, MIXED_MODE_VALUE } from "../../lib/constants";
import { clamp } from "../../lib";

// mapPropsToState, What is this absurdity?!? NumericInputStatefulWrapper
// maintains state so that users can muck around in the inner NumericInput
// input box. We don't want to fire updates() each time a user enters a
// character. Only when the user blurs do we want the update method to be fired.
// So why map props onto state? The internal state is mapped to the inputbox
// and with MIXED_VALUE mode we need a way to forcibly change the characters in
// the inputbox. So incoming props update state but the user is then permitted
// to make textual changes to the inputbox outside of the knowledge of the
// Store. Then onBlur we fire onUpdate and the Store can decide whether to keep
// the value the user inputed or change it to something else. There is also
// an edge case where we are in mixedMode and showing some special character in
// the inputbox "-" and the user tries to manually edit the input box with
// garbage and move on. To make it clear that we are still in mixedMode and that
// no other inputs have been changed we revert their garbage back to "-".
// This requires a setState inside the onUpdate method.
function mapPropsToState({ value: propValue, defaultValue = 0 }) {
  let value;
  const mixedMode = propValue === MIXED_VALUES;

  if (mixedMode) {
    // MixedMode is useful when indicating to the user that there
    // is another source of value coming from somewhere else in the
    // app which renders this control optional. For example a user
    // may have selected a value for xaxis range and is now exploring
    // the UI for applying ranges to "all axes". In this case a
    // mixedValue is shown so the user has some visual information that
    // applying a value to "all axes" will somehow supercede some related
    // value elsewhere. WS2 also provides a more helpful message in these
    // cases than just the MIXED_MODE_VALUE
    value = MIXED_MODE_VALUE;
  } else if (propValue === null) {
    // Null is used throughout the App to represent "no value."
    // This may be an unfortunate decision but NumericInput supports
    // null by showing the user that the value is actually
    // "defaultValue" or 0.
    // Actually it would be nice to take this chunk of code out.
    value = defaultValue;
  } else {
    value = propValue;
  }

  return { value, mixedMode };
}

export default class NumericInputStatefulWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = mapPropsToState(props);

    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState(mapPropsToState(nextProps));
    }
  }

  onChange(value) {
    /*
         * Mixed Mode is preserved until new props are sent down from
         * upstream components
         */
    this.setState({ value });
  }

  onUpdate(value) {
    const { defaultValue, integerOnly, max, min } = this.props;

    // defaultValue is truthy or numeric (account for falsey 0)
    const hasDefaultValue = defaultValue || isNumeric(defaultValue);
    let updatedValue = value;

    // If we are in mixed mode and receive the placeholder value then
    // the user is attempting to increment or decrement. If we are in
    // mixed mode and receive some other value then the user has entered
    // this value explicitly in the inputbox and is bluring away.
    // In the case of incrementing and decrementing we set the updatedValue
    // to the default value or min or 0. If the value is set explicitly and
    // is numeric we do the same --- call onUpdate. This allows upstream
    // components to send in new props that toggle this component out of
    // mixedValue state. If it is set explicitly in the input box but is not
    // numeric onUpdate is not called and mixedMode is maintained.
    // In this case we also force MIXED_MODE_VALUE so the user is aware that
    // no settings have actually been changed.
    if (this.state.mixedMode && updatedValue === MIXED_MODE_VALUE) {
      const fallbackValue = min || 0;
      updatedValue = hasDefaultValue ? defaultValue : fallbackValue;
    } else if (this.state.mixedMode && !isNumeric(updatedValue)) {
      // mixed mode takes precedence over showing default values when
      // empty strings are input. We return early to bypass that logic.
      this.setState({ value: MIXED_MODE_VALUE });
      return;
    }
    // If supplied a default value use it when the user blurs on an
    // empty string or string made up of spaces.
    if (typeof updatedValue === "string" && hasDefaultValue) {
      updatedValue = updatedValue.replace(/^\s+/g, "");

      if (updatedValue.length === 0) {
        updatedValue = defaultValue;
      }
    }

    // When correct input is supplied by the user constrain it to be within
    // [max, min] if max and min are supplied. Ditto for forcing an
    // integer value. We take the floor instead of rounding
    // as that is/(may be) less confusing to the user visually.
    const numericBounds = isNumeric(min) && isNumeric(max);
    if (isNumeric(updatedValue)) {
      updatedValue = Number(updatedValue);

      if (integerOnly) {
        updatedValue = Math.floor(updatedValue);
      }

      if (numericBounds) {
        updatedValue = clamp(updatedValue, min, max);
      } else if (isNumeric(min)) {
        updatedValue = Math.max(min, updatedValue);
      } else if (isNumeric(max)) {
        updatedValue = Math.min(max, updatedValue);
      }

      this.props.onUpdate(updatedValue);
    }
  }

  render() {
    return (
      <NumericInput
        value={this.state.value}
        onUpdate={this.onUpdate}
        onChange={this.onChange}
        step={this.props.step}
        showArrows={this.props.showArrows}
        editableClassName={this.props.editableClassName}
      />
    );
  }
}

NumericInputStatefulWrapper.propTypes = {
  // defaultValue is default value used when
  // A) a user leaves the input empty or filled with spaces.
  // B) a user is moving out of mixed mode.
  // C) a `null` value is supplied to this component.
  defaultValue: PropTypes.number,
  editableClassName: PropTypes.string,

  // When integerOnly flag is set any numeric input supplied by
  // the user is constrained to be a whole integer number.
  // Math.floor is used for this operation.
  integerOnly: PropTypes.bool,

  // If min is supplied and defaultValue is *not* supplied the min
  // value will be used when the user moves out of mixed mode.
  // If both min and max are supplied they are used to constrain
  // numeric input from the user to be within this range.
  max: PropTypes.number,
  min: PropTypes.number,

  // Handler run onBlur and called with the updated value.
  onUpdate: PropTypes.func.isRequired,

  // showArrows is a flag that will show or hide the increment and
  // decrement buttons on the side of the inputbox. Defaults to true.
  showArrows: PropTypes.bool,

  // If incrementors are present step size controls the numeric step taken
  // when incrementing and decrementing.
  step: PropTypes.number,

  value: PropTypes.any,
  /*value: customPropTypes.customOneOfType([
    PropTypes.string,
    customPropTypes.isNumeric,
    customPropTypes.isNull,
  ]).isDefined,*/
};

NumericInputStatefulWrapper.defaultProps = {
  showArrows: true,
};

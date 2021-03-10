import EditableText from './EditableText';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isNumeric from 'fast-isnumeric';
import Slider from 'react-rangeslider';
import {CarretDownIcon, CarretUpIcon} from 'plotly-icons';

export const UP_ARROW = 38;
export const DOWN_ARROW = 40;

export default class NumericInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      numericInputClassName: this.getNumericInputClassName(props.value),
    };

    this.onChange = this.onChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  getNumericInputClassName(value) {
    return isNumeric(value) || value === ''
      ? `numeric-input__number ${this.props.editableClassName ? this.props.editableClassName : ''}`
      : `numeric-input__number +error ${
          this.props.editableClassName ? this.props.editableClassName : ''
        }`;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case UP_ARROW:
        this.incrementValue('increase');
        break;
      case DOWN_ARROW:
        this.incrementValue('decrease');
        break;
      default:
        break;
    }
  }

  onWheel(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.deltaY > 0) {
      this.incrementValue('increase');
    } else {
      this.incrementValue('decrease');
    }
  }

  onChange(value) {
    this.setState({value, numericInputClassName: this.getNumericInputClassName(value)});
  }

  updateValue(newValue) {
    const {max, min, integerOnly} = this.props;
    let updatedValue = newValue;

    if (updatedValue === '') {
      this.setState({
        value: this.props.value,
        numericInputClassName: this.getNumericInputClassName(this.props.value),
      });
      return;
    }

    // When the user blurs on non-numeric data reset the component
    // to the last known good value (this.props.value).
    if (!isNumeric(updatedValue)) {
      this.setState({
        value: updatedValue,
        numericInputClassName: this.getNumericInputClassName(updatedValue),
      });
      return;
    }

    updatedValue = Number(updatedValue);
    if (integerOnly) {
      updatedValue = Math.floor(updatedValue);
    }

    if (isNumeric(min)) {
      updatedValue = Math.max(min, updatedValue);
    }

    if (isNumeric(max)) {
      updatedValue = Math.min(max, updatedValue);
    }

    this.props.onUpdate(updatedValue);
  }

  incrementValue(direction) {
    const {defaultValue, min, step = 1, stepmode = 'absolute'} = this.props;
    const {value} = this.state;

    let valueUpdate;
    if (isNumeric(value)) {
      const x = parseFloat(value);
      const absMode = stepmode === 'absolute';
      if (direction === 'increase') {
        valueUpdate = absMode ? x + step : x * (1 + step);
      } else {
        valueUpdate = absMode ? x - step : x / (1 + step);
      }
    } else {
      // if we are multi-valued and the user is incrementing or decrementing
      // update with some sane value so we can "break" out of multi-valued mode.
      if (isNumeric(defaultValue)) {
        valueUpdate = defaultValue;
      } else {
        // TODO smarter handling depending if user decrements or increments?
        valueUpdate = min || 0;
      }
    }

    // incrementers blur the line between blur and onChange.
    this.updateValue(valueUpdate);
  }

  renderArrows() {
    if (!this.props.showArrows || this.props.showSlider) {
      return null;
    }

    return (
      <div className="numeric-input__caret-box">
        <div
          className="numeric-input__caret js-numeric-increase"
          onClick={this.incrementValue.bind(this, 'increase')}
        >
          <CarretUpIcon className="numeric-top-caret-modifier" />
        </div>
        <div
          className="numeric-input__caret js-numeric-decrease"
          onClick={this.incrementValue.bind(this, 'decrease')}
        >
          <CarretDownIcon className="numeric-bottom-caret-modifier" />
        </div>
      </div>
    );
  }

  renderSlider() {
    if (!this.props.showSlider) {
      return null;
    }

    return (
      <Slider
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        value={parseFloat(this.state.value)}
        onChange={this.updateValue}
        tooltip={false}
      />
    );
  }

  render() {
    return (
      <div className="numeric-input__wrapper">
        <EditableText
          className={this.state.numericInputClassName}
          placeholder={this.props.placeholder}
          text={this.state.value}
          type="text"
          onChange={this.onChange}
          onUpdate={this.updateValue}
          onKeyDown={this.onKeyDown}
          onWheel={this.onWheel}
        />
        {this.renderArrows()}
        {this.renderSlider()}
        {this.props.units ? this.props.units : null}
      </div>
    );
  }
}

NumericInput.propTypes = {
  defaultValue: PropTypes.any,
  editableClassName: PropTypes.string,
  integerOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showArrows: PropTypes.bool,
  showSlider: PropTypes.bool,
  step: PropTypes.number,
  stepmode: PropTypes.string,
  value: PropTypes.any,
  units: PropTypes.string,
};

NumericInput.defaultProps = {
  showArrows: true,
};

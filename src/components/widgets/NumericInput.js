import EditableText from './EditableText';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isNumeric from 'fast-isnumeric';
import {CarretDownIcon, CarretUpIcon} from 'plotly-icons';

export const UP_ARROW = 38;
export const DOWN_ARROW = 40;

export default class NumericInput extends Component {
  constructor(props) {
    super(props);

    this.state = {value: props.value};
    this.onChange = this.onChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  onChange(value) {
    this.setState({value});
  }

  updateValue(newValue) {
    const {max, min, integerOnly, value: propsValue} = this.props;
    let updatedValue = newValue;

    // When the user blurs on non-numeric data reset the component
    // to the last known good value (this.props.value).
    if (!isNumeric(updatedValue)) {
      this.setState({value: propsValue});
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
    const {defaultValue, min, step = 1} = this.props;
    const {value} = this.state;

    let valueUpdate;
    if (isNumeric(value)) {
      if (direction === 'increase') {
        valueUpdate = value + step;
      } else {
        valueUpdate = value - step;
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
    if (!this.props.showArrows) {
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

  render() {
    return (
      <div className="numeric-input__wrapper">
        <EditableText
          className={`numeric-input__number ${this.props.editableClassName}`}
          placeholder={this.props.placeholder}
          text={this.state.value}
          type="text"
          onChange={this.onChange}
          onUpdate={this.updateValue}
          onKeyDown={this.onKeyDown}
        />
        {this.renderArrows()}
      </div>
    );
  }
}

NumericInput.propTypes = {
  defaultValue: PropTypes.number,
  editableClassName: PropTypes.string,
  integerOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showArrows: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.any,
};

NumericInput.defaultProps = {
  showArrows: true,
};

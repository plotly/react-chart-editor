import Field from './Field';
import NumericInput from '../widgets/NumericInput';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

export class NumericField extends Component {
  render() {
    let fullValue = this.props.fullValue;
    let placeholder;
    if (this.props.multiValued) {
      placeholder = fullValue;
      fullValue = '';
    }

    return (
      <Field {...this.props}>
        <NumericInput
          value={fullValue}
          defaultValue={this.props.defaultValue}
          placeholder={placeholder}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.updatePlot}
          onUpdate={this.props.updatePlot}
          showArrows={!this.props.hideArrows}
        />
      </Field>
    );
  }
}

NumericField.propTypes = {
  defaultValue: PropTypes.number,
  fullValue: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  multiValued: PropTypes.bool,
  hideArrows: PropTypes.bool,
  step: PropTypes.number,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(NumericField);

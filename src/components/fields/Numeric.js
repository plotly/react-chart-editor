import Field from './Field';
import NumericInput from '../widgets/NumericInputStatefulWrapper';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

class Numeric extends Component {
  render() {
    return (
      <Field {...this.props}>
        <NumericInput
          value={this.props.fullValue()}
          defaultValue={this.props.defaultValue}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.updatePlot}
          onUpdate={this.props.updatePlot}
          showArrows
        />
      </Field>
    );
  }
}

Numeric.propTypes = {
  defaultValue: PropTypes.number,
  fullValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(Numeric);

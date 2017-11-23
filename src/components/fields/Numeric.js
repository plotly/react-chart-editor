import Field from './Field';
import NumericInput from '../widgets/NumericInputStatefulWrapper';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

export class UnconnectedNumeric extends Component {
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
          showArrows={this.props.showArrows}
        />
      </Field>
    );
  }
}

UnconnectedNumeric.propTypes = {
  defaultValue: PropTypes.number,
  fullValue: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  multiValued: PropTypes.bool,
  showArrows: PropTypes.bool,
  step: PropTypes.number,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedNumeric.defaultProps = {
  showArrows: true,
};

export default connectToContainer(UnconnectedNumeric);

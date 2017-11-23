import Field from './Field';
import NumericInput from '../widgets/NumericInputStatefulWrapper';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

export class UnconnectedNumeric extends Component {
  render() {
    return (
      <Field {...this.props}>
        <NumericInput
          value={this.props.fullValue}
          defaultValue={this.props.defaultValue}
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
  showArrows: PropTypes.bool,
  step: PropTypes.number,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedNumeric.defaultProps = {
  showArrows: true,
};

export default connectToContainer(UnconnectedNumeric);

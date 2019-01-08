import Field from './Field';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedDateTimePicker} from './DateTimePicker';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedAxisRangeValue extends Component {
  render() {
    return this.props.multiValued ||
      (this.props.fullContainer && this.props.fullContainer.type === 'date') ? (
      <UnconnectedDateTimePicker {...this.props} />
    ) : (
      <UnconnectedNumeric {...this.props} />
    );
  }
}

UnconnectedAxisRangeValue.propTypes = {
  defaultValue: PropTypes.any,
  fullValue: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  multiValued: PropTypes.bool,
  hideArrows: PropTypes.bool,
  showSlider: PropTypes.bool,
  step: PropTypes.number,
  fullContainer: PropTypes.object,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedAxisRangeValue);

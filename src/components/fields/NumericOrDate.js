import Field from './Field';
import {UnconnectedNumeric} from './Numeric';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';
import {isDateTime} from 'plotly.js/src/lib';
import {isJSDate} from 'plotly.js/src/lib/dates';
import {UnconnectedDateTimePicker} from './DateTimePicker';

export class UnconnectedNumericOrDate extends Component {
  render() {
    const fullValueIsDate =
      typeof this.props.fullValue === 'string' &&
      (isDateTime(this.props.fullValue) || isJSDate(this.props.fullValue));

    return fullValueIsDate ? (
      <UnconnectedDateTimePicker {...this.props} placeholder={'yyyy-mm-dd 00:00:00.00'} />
    ) : (
      <UnconnectedNumeric {...this.props} />
    );
  }
}

UnconnectedNumericOrDate.propTypes = {
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

export default connectToContainer(UnconnectedNumericOrDate);

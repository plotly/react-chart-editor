import Field from './Field';
import {UnconnectedNumeric} from './Numeric';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';
import {isDateTime} from 'plotly.js/src/lib';
import {isJSDate} from 'plotly.js/src/lib/dates';
import {UnconnectedDateTimePicker} from './DateTimePicker';

export class UnconnectedNumericOrDate extends Component {
  render() {
    const date = typeof this.props.fullValue === 'string' && this.props.fullValue.split(' ')[0];
    const fullValueIsDate =
      typeof this.props.fullValue === 'string' && date && (isDateTime(date) || isJSDate(date));

    return fullValueIsDate ? (
      <UnconnectedDateTimePicker {...this.props} placeholder={'yyyy-mm-dd hh:mm:ss.xxx'} />
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

UnconnectedNumericOrDate.displayName = 'UnconnectedNumericOrDate';

export default connectToContainer(UnconnectedNumericOrDate);

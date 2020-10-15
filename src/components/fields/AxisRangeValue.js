import Field from './Field';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedDateTimePicker} from './DateTimePicker';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';
import Info from './Info';
import {MULTI_VALUED} from 'lib/constants';

export class UnconnectedAxisRangeValue extends Component {
  render() {
    // only when all axes have the type date, can we output an UnconnectedDateTimePicker
    if (this.props.fullContainer && this.props.fullContainer.type === 'date') {
      return <UnconnectedDateTimePicker {...this.props} />;
    }
    // If its multivalued, it can be multivalued for different reasons:
    // - the range is different, but same type
    // - the type is different (i.e. date + number axes)
    // If we're in the case of a mixed axis type (i.e. date + number) case,
    // There's going to be a this.props.fullContainer.type, but it's going to be MULTIVALUED
    if (this.props.multiValued && this.props.fullContainer.type === MULTI_VALUED) {
      return <Info {...this.props} />;
    }

    // For cases that the range is numeric, but does not have the same number
    // Or numeric and has the same number
    return <UnconnectedNumeric {...this.props} />;
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

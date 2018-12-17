import React, {Component} from 'react';
import Field from './Field';
import RadioBlocks from '../widgets/RadioBlocks';
import NumericInput from '../widgets/NumericInput';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import {isDateTime} from 'plotly.js/src/lib';
import {isJSDate} from 'plotly.js/src/lib/dates';

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24; // eslint-disable-line
const DAYS_IN_MONTH = 30;

class UnconnectedBinSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 'months',
    };
    this.update = this.update.bind(this);
    this.convertToMilliseconds = this.convertToMilliseconds.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
  }

  convertToMilliseconds(value) {
    if (this.state.units === 'months') {
      let adjustedValue = value;
      // eslint-disable-next-line
      if (adjustedValue > 12) {
        adjustedValue = 12; // eslint-disable-line
      }
      if (adjustedValue < 0) {
        adjustedValue = 0;
      }
      return adjustedValue * MILLISECONDS_IN_DAY * DAYS_IN_MONTH;
    }

    if (this.state.units === 'days') {
      let adjustedValue = value;
      // eslint-disable-next-line
      if (adjustedValue > 366) {
        adjustedValue = 366; // eslint-disable-line
      }
      if (adjustedValue < 0) {
        adjustedValue = 0;
      }
      return adjustedValue * MILLISECONDS_IN_DAY;
    }

    return value;
  }

  update(value) {
    this.props.updatePlot(this.convertToMilliseconds(value));
  }

  onUnitChange(value) {
    const milliseconds =
      value === 'months' &&
      typeof this.props.fullValue === 'string' &&
      this.props.fullValue[0] === 'M'
        ? parseInt(this.props.fullValue.substring(1), 10) * DAYS_IN_MONTH * MILLISECONDS_IN_DAY
        : this.props.fullValue;

    this.setState({units: value});
    this.props.updatePlot(milliseconds);
  }

  getDisplayValue(value) {
    const numberValue =
      typeof value === 'string' && value[0] === 'M' ? parseInt(value.substring(1), 10) : value;

    if (this.state.units === 'months') {
      return Math.round(numberValue / MILLISECONDS_IN_DAY / DAYS_IN_MONTH);
    }
    if (this.state.units === 'days') {
      return Math.round(numberValue / MILLISECONDS_IN_DAY);
    }
    if (this.state.units === 'milliseconds') {
      return numberValue;
    }
    return numberValue;
  }

  render() {
    const _ = this.context.localize;
    const attrHead = this.props.attr.split('.')[0];
    const binStartValue = this.props.fullContainer[attrHead].start;
    const BinStartIsDate =
      typeof binStartValue === 'string' && (isDateTime(binStartValue) || isJSDate(binStartValue));

    return BinStartIsDate ? (
      <Field {...this.props}>
        <RadioBlocks
          options={[
            {value: 'months', label: _('Months')},
            {value: 'days', label: _('Days')},
            {value: 'milliseconds', label: _('Milliseconds')},
          ]}
          onOptionChange={this.onUnitChange}
          activeOption={this.state.units}
        />
        <div style={{height: '7px', width: '100%', display: 'block'}}> </div>
        <NumericInput
          value={this.getDisplayValue(this.props.fullValue)}
          onUpdate={this.update}
          editableClassName="binsize-milliseconds"
        />
      </Field>
    ) : (
      <Field {...this.props}>
        <NumericInput value={this.props.fullValue} onUpdate={this.props.updatePlot} />
      </Field>
    );
  }
}

UnconnectedBinSize.contextTypes = {
  localize: PropTypes.func,
};

UnconnectedBinSize.propTypes = {
  fullValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updatePlot: PropTypes.func,
  attr: PropTypes.string,
  fullContainer: PropTypes.object,
};

export default connectToContainer(UnconnectedBinSize);

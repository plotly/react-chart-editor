import React, {Component} from 'react';
import Field from './Field';
import Dropdown from '../widgets/Dropdown';
import NumericInput from '../widgets/NumericInput';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import {isDateTime} from 'plotly.js/src/lib';
import {isJSDate} from 'plotly.js/src/lib/dates';

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60; // eslint-disable-line
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_MINUTE * 60 * 24; // eslint-disable-line
const DAYS_IN_MONTH = 30;
const MONTHS_IN_YEAR = 12; //eslint-disable-line

function getSmallestUnit(milliseconds) {
  const units = {
    seconds: MILLISECONDS_IN_SECOND,
    minutes: MILLISECONDS_IN_MINUTE,
    days: MILLISECONDS_IN_DAY,
  };

  let smallestUnit = 'milliseconds';

  ['seconds', 'minutes', 'days'].forEach(unit => {
    if (
      milliseconds % units[unit] === 0 &&
      (smallestUnit === 'milliseconds' ||
        (smallestUnit !== 'milliseconds' &&
          milliseconds / units[smallestUnit] > milliseconds / units[unit]))
    ) {
      smallestUnit = unit;
    }
  });

  return smallestUnit;
}

export class UnconnectedAxisInterval extends Component {
  constructor(props) {
    super(props);

    const initialUnit =
      props.fullValue && typeof props.fullValue === 'string' && props.fullValue[0] === 'M'
        ? parseInt(props.fullValue.substring(1), 10) % MONTHS_IN_YEAR === 0
          ? 'years'
          : 'months'
        : getSmallestUnit(props.fullValue);

    this.state = {
      units: initialUnit,
    };
  }

  update(value) {
    let adjustedValue = value < 0 ? 0 : value;

    if (this.state.units === 'years') {
      adjustedValue = 'M' + adjustedValue * MONTHS_IN_YEAR;
    }

    if (this.state.units === 'months') {
      adjustedValue = 'M' + adjustedValue;
    }

    if (this.state.units === 'days') {
      adjustedValue = adjustedValue * MILLISECONDS_IN_DAY;
    }

    if (this.state.units === 'minutes') {
      adjustedValue = adjustedValue * MILLISECONDS_IN_MINUTE;
    }

    if (this.state.units === 'seconds') {
      adjustedValue = adjustedValue * MILLISECONDS_IN_SECOND;
    }

    this.props.updatePlot(adjustedValue);
  }

  onUnitChange(value) {
    const isFullValueMonthFormat =
      typeof this.props.fullValue === 'string' && this.props.fullValue[0] === 'M';

    const milliseconds = isFullValueMonthFormat
      ? parseInt(this.props.fullValue.substring(1), 10) * DAYS_IN_MONTH * MILLISECONDS_IN_DAY
      : this.props.fullValue;

    this.setState({units: value});

    if (['years', 'months'].includes(value)) {
      this.props.updatePlot('M' + Math.round(milliseconds / MILLISECONDS_IN_DAY / DAYS_IN_MONTH));
    } else {
      this.props.updatePlot(milliseconds);
    }
  }

  getDisplayValue(value) {
    const numericValue =
      typeof value === 'string' && value[0] === 'M' ? parseInt(value.substring(1), 10) : value;

    if (this.state.units === 'years') {
      return numericValue / MONTHS_IN_YEAR;
    }
    if (this.state.units === 'months') {
      return numericValue;
    }
    if (this.state.units === 'days') {
      return Math.round(numericValue / MILLISECONDS_IN_DAY);
    }
    if (this.state.units === 'minutes') {
      return Math.round(numericValue / MILLISECONDS_IN_MINUTE);
    }
    if (this.state.units === 'seconds') {
      return Math.round(numericValue / MILLISECONDS_IN_SECOND);
    }
    if (this.state.units === 'milliseconds') {
      return numericValue;
    }
    return null;
  }

  render() {
    const _ = this.context.localize;
    const attrHead = this.props.attr.split('.')[0];
    const binStartValue = this.props.fullContainer[attrHead].start;
    const BinStartIsDate =
      typeof binStartValue === 'string' && (isDateTime(binStartValue) || isJSDate(binStartValue));

    return BinStartIsDate ? (
      <Field {...this.props}>
        <Dropdown
          options={[
            {value: 'years', label: _('Years')},
            {value: 'months', label: _('Months')},
            {value: 'days', label: _('Days')},
            {value: 'minutes', label: _('Minutes')},
            {value: 'seconds', label: _('Seconds')},
            {value: 'milliseconds', label: _('Milliseconds')},
          ]}
          clearable={false}
          onChange={value => this.onUnitChange(value)}
          value={this.state.units}
        />
        <div style={{height: '7px', width: '100%', display: 'block'}}> </div>
        <NumericInput
          value={this.getDisplayValue(this.props.fullValue)}
          onUpdate={value => this.update(value)}
          editableClassName="AxisInterval-milliseconds"
        />
      </Field>
    ) : (
      <Field {...this.props}>
        <NumericInput
          value={this.props.fullValue}
          onUpdate={value => this.props.updatePlot(value)}
        />
      </Field>
    );
  }
}

UnconnectedAxisInterval.contextTypes = {
  localize: PropTypes.func,
};

UnconnectedAxisInterval.propTypes = {
  fullValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updatePlot: PropTypes.func,
  attr: PropTypes.string,
  fullContainer: PropTypes.object,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedAxisInterval);

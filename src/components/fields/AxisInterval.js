import {Component} from 'react';
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

function twoDecimalsRound(value) {
  return Math.round(value * 100) / 100;
}

function getSmallestUnit(milliseconds) {
  const units = {
    seconds: MILLISECONDS_IN_SECOND,
    minutes: MILLISECONDS_IN_MINUTE,
    days: MILLISECONDS_IN_DAY,
  };

  let smallestUnit = 'milliseconds';

  ['seconds', 'minutes', 'days'].forEach((unit) => {
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
    const isValueInteger = adjustedValue % 1 === 0;

    if (this.state.units === 'years') {
      if (isValueInteger) {
        adjustedValue = 'M' + adjustedValue * MONTHS_IN_YEAR;
      } else {
        adjustedValue = adjustedValue * MONTHS_IN_YEAR * DAYS_IN_MONTH * MILLISECONDS_IN_DAY;
      }
    }

    if (this.state.units === 'months') {
      if (isValueInteger) {
        adjustedValue = 'M' + adjustedValue;
      } else {
        adjustedValue = adjustedValue * DAYS_IN_MONTH * MILLISECONDS_IN_DAY;
      }
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
      const nbMonths = milliseconds / MILLISECONDS_IN_DAY / DAYS_IN_MONTH;
      if (nbMonths % 1 === 0) {
        this.props.updatePlot('M' + nbMonths);
      } else {
        this.props.updatePlot(milliseconds);
      }
    } else {
      this.props.updatePlot(milliseconds);
    }
  }

  getDisplayValue(value) {
    const numericValue =
      typeof value === 'string' && value[0] === 'M' ? parseInt(value.substring(1), 10) : value;

    if (this.state.units === 'years') {
      if (typeof value === 'string') {
        return twoDecimalsRound(numericValue / MONTHS_IN_YEAR);
      }
      return twoDecimalsRound(numericValue / MILLISECONDS_IN_DAY / DAYS_IN_MONTH / MONTHS_IN_YEAR);
    }
    if (this.state.units === 'months') {
      if (typeof value === 'string') {
        return twoDecimalsRound(numericValue);
      }
      return twoDecimalsRound(numericValue / MILLISECONDS_IN_DAY / DAYS_IN_MONTH);
    }
    if (this.state.units === 'days') {
      return twoDecimalsRound(numericValue / MILLISECONDS_IN_DAY);
    }
    if (this.state.units === 'minutes') {
      return twoDecimalsRound(numericValue / MILLISECONDS_IN_MINUTE);
    }
    if (this.state.units === 'seconds') {
      return twoDecimalsRound(numericValue / MILLISECONDS_IN_SECOND);
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
    const tick0 =
      this.props.fullContainer.tick0 &&
      (this.props.fullContainer.tick0 || this.props.fullContainer.colorbar.tick0);
    const tick0IsDate = tick0 && (isDateTime(tick0) || isJSDate(tick0));

    return BinStartIsDate || tick0IsDate ? (
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
          onChange={(value) => this.onUnitChange(value)}
          value={this.state.units}
        />
        <div style={{width: '100%', display: 'block'}}> </div>
        <NumericInput
          value={this.getDisplayValue(this.props.fullValue)}
          onUpdate={(value) => this.update(value)}
          editableClassName="AxisInterval-milliseconds"
        />
      </Field>
    ) : (
      <Field {...this.props}>
        <NumericInput
          value={this.props.fullValue}
          onUpdate={(value) => this.props.updatePlot(value)}
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

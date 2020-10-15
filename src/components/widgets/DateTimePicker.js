import 'react-day-picker/lib/style.css';
import {CalendarMultiselectIcon} from 'plotly-icons';
import {ms2DateTime, dateTime2ms, isDateTime} from 'plotly.js/src/lib/dates';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import {Component} from 'react';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import {MULTI_VALUED_PLACEHOLDER} from 'lib/constants';

const testDate = '2000-01-01';
const testTime = '00:00';
const datePlaceholder = 'yyyy-mm-dd';
const timePlaceholder = 'hh:mm:ss.xxx';

export default class DateTimePicker extends Component {
  constructor(props, context) {
    super(props, context);
    const {time, date} = this.parsePlotlyJSDateTime(props.value);
    const isValidTime =
      isDateTime(testDate + ' ' + time) ||
      ['', timePlaceholder, MULTI_VALUED_PLACEHOLDER].includes(time);
    const isValidDate =
      isDateTime(date + ' ' + testTime) ||
      ['', datePlaceholder, MULTI_VALUED_PLACEHOLDER].includes(date);

    this.state = {
      calendarOpen: false,
      dateInputClassName: isValidDate
        ? 'datetimepicker-container-date-input'
        : 'datetimepicker-container-date-input +error',
      timeInputClassName: isValidTime
        ? 'datetimepicker-container-time-input'
        : 'datetimepicker-container-time-input +error',
      timeValue: time,
      dateValue: date,
      AMPM: this.getAMPM(date, time, context.localize),
    };

    this.toPlotlyJSDate = this.toPlotlyJSDate.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onDateUpdate = this.onDateUpdate.bind(this);
  }

  toPlotlyJSDate(value) {
    const ms = dateTime2ms(value);
    return ms2DateTime(ms);
  }

  getYearOptions(current) {
    // eslint-disable-next-line
    const base = 5;
    const yearAsNumber = parseInt(current, 10);

    const lastFive = new Array(base).fill(0).map((year, index) => {
      const newOption = yearAsNumber - (base - index);
      return {label: newOption, value: newOption};
    });

    const nextFive = new Array(base).fill(0).map((year, index) => {
      const newOption = yearAsNumber + (index + 1);
      return {label: newOption, value: newOption};
    });

    return lastFive.concat([{label: current, value: current}]).concat(nextFive);
  }

  getMonthOptions() {
    const _ = this.context.localize;
    return [
      {label: _('January'), value: 0},
      {label: _('February'), value: 1},
      {label: _('March'), value: 2},
      {label: _('April'), value: 3},
      {label: _('May'), value: 4},
      {label: _('June'), value: 5},
      {label: _('July'), value: 6},
      {label: _('August'), value: 7},
      {label: _('September'), value: 8},
      {label: _('October'), value: 9},
      {label: _('November'), value: 10},
      {label: _('December'), value: 11},
    ];
  }

  onMonthChange(value) {
    const currentDateInJS = new Date(this.getAdjustedPlotlyJSDateTime(this.props.value));
    currentDateInJS.setMonth(value);
    const plotlyJSDate = this.toPlotlyJSDate(currentDateInJS);

    if (isDateTime(plotlyJSDate)) {
      this.props.onChange(plotlyJSDate);
    }

    const {time, date} = this.parsePlotlyJSDateTime(plotlyJSDate);
    this.setState({
      timeValue: time,
      dateValue: date,
    });
  }

  onYearChange(value) {
    const currentDateInJS = new Date(this.getAdjustedPlotlyJSDateTime(this.props.value));
    currentDateInJS.setFullYear(value);
    const plotlyJSDate = this.toPlotlyJSDate(currentDateInJS);

    if (isDateTime(plotlyJSDate)) {
      this.props.onChange(plotlyJSDate);
    }

    const {time, date} = this.parsePlotlyJSDateTime(plotlyJSDate);
    this.setState({
      timeValue: time,
      dateValue: date,
    });
  }

  parsePlotlyJSDateTime(value) {
    const parsed = value.split(' ');
    return {date: parsed[0], time: parsed[1] ? parsed[1] : ''};
  }

  getAMPM(date, time, _) {
    const plotlyJSDateTime = date + ' ' + time;
    const isValidDateTime = isDateTime(plotlyJSDateTime);
    const JSDate = new Date(this.getAdjustedPlotlyJSDateTime(plotlyJSDateTime));
    const localeTime = JSDate.toLocaleTimeString('en-US').split(' ');

    const parsedTime = time.split(':').reduce((timeArray, timePart) => {
      const parsed = timePart.split('.');
      return timeArray.concat(parsed);
    }, []);

    const isNoon =
      parsedTime[0] === '12' && parsedTime.slice(1).every((part) => parseInt(part, 10) === 0);

    return !isValidDateTime || time === '' || JSDate.toDateString() === 'Invalid Date'
      ? ''
      : localeTime[1] === 'PM'
      ? isNoon
        ? _('noon')
        : 'PM'
      : 'AM';
  }

  adjustedTime(time) {
    if (time.toString().length <= 2) {
      return time + ':00';
    }
    return time;
  }

  onTimeChange(value) {
    const {date: currentDate} = this.parsePlotlyJSDateTime(this.props.value);
    const isValidTime = isDateTime(testDate + ' ' + value);

    this.setState({
      timeInputClassName:
        isValidTime || value === ''
          ? 'datetimepicker-container-time-input'
          : 'datetimepicker-container-time-input +error',
      timeValue: value,
      AMPM: this.getAMPM(currentDate, value, this.context.localize),
    });
  }

  onDateChange(value) {
    const isValidDate = isDateTime(value + ' ' + testTime);
    this.setState({
      dateInputClassName:
        isValidDate || value === ''
          ? 'datetimepicker-container-date-input'
          : 'datetimepicker-container-date-input +error',
      dateValue: value,
    });
  }

  onTimeUpdate(value) {
    const {time: currentTime, date: currentDate} = this.parsePlotlyJSDateTime(this.props.value);
    const isValidTime = isDateTime(testDate + ' ' + value);

    if (value === '') {
      this.setState({
        timeInputClassName: 'datetimepicker-container-time-input',
        timeValue: currentTime,
        AMPM: this.getAMPM(currentDate, currentTime, this.context.localize),
      });
      return;
    }

    if (isValidTime) {
      this.props.onChange(currentDate + ' ' + value);
    }
  }

  onDateUpdate(value) {
    const {date: currentDate, time: currentTime} = this.parsePlotlyJSDateTime(this.props.value);
    const isValidDate = isDateTime(value + ' ' + testTime);

    if (isValidDate) {
      this.props.onChange(value + ' ' + currentTime);
      return;
    }

    if (value === '') {
      this.setState({
        dateValue: currentDate,
        dateInputClassName: 'datetimepicker-container-date-input',
      });
      return;
    }
  }

  getAdjustedPlotlyJSDateTime(dateTimeString) {
    const {date, time} = this.parsePlotlyJSDateTime(dateTimeString);
    return date + ' ' + this.adjustedTime(time);
  }

  render() {
    const JSDate = new Date(
      this.getAdjustedPlotlyJSDateTime(this.state.dateValue + ' ' + testTime)
    );
    const isValidJSDate = JSDate.toDateString() !== 'Invalid Date';
    const currentYear = isValidJSDate ? JSDate.getFullYear() : new Date().getFullYear();
    const currentMonth = isValidJSDate ? JSDate.getMonth() : new Date().getMonth();

    return (
      <div className="datetimepicker-container">
        <TextInput
          value={this.state.dateValue}
          editableClassName={this.state.dateInputClassName}
          onChange={this.onDateChange}
          onUpdate={this.onDateUpdate}
          placeholder={datePlaceholder}
        />
        <div className="datetimepicker-container-icons">
          <CalendarMultiselectIcon
            onClick={() => this.setState({calendarOpen: !this.state.calendarOpen})}
            className={
              this.state.calendarOpen
                ? 'datetimepicker-date-icon--selected'
                : 'datetimepicker-date-icon'
            }
          />
        </div>
        {this.state.calendarOpen ? (
          <div className="datetimepicker-container__content">
            {this.state.calendarOpen ? (
              <div className="datetimepicker-datepicker-container">
                <div className="datetimepicker-datepicker-navbar">
                  <Dropdown
                    options={this.getMonthOptions()}
                    value={currentMonth}
                    className="datimepicker-monthpicker"
                    clearable={false}
                    onChange={this.onMonthChange}
                  />
                  <Dropdown
                    options={this.getYearOptions(currentYear)}
                    value={currentYear}
                    className="datimepicker-yearpicker"
                    clearable={false}
                    onChange={this.onYearChange}
                  />
                </div>
                <DayPicker
                  className="datepicker-container-rce"
                  modifiers={{highlighted: isValidJSDate ? JSDate : ''}}
                  month={isValidJSDate ? JSDate : new Date()}
                  onDayClick={(value) => {
                    const plotlyDate = this.toPlotlyJSDate(value).split(' ')[0];
                    this.onDateChange(plotlyDate);
                    this.onDateUpdate(plotlyDate);
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="datetimepicker-container-time">
          <TextInput
            value={this.state.timeValue}
            onChange={this.onTimeChange}
            onUpdate={this.onTimeUpdate}
            placeholder={timePlaceholder}
            editableClassName={this.state.timeInputClassName}
          />
          <span className="datetimepicker-date-units">{this.state.AMPM}</span>
        </div>
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateTimePicker.contextTypes = {
  localize: PropTypes.func,
};

import 'react-day-picker/lib/style.css';
import {CalendarMultiselectIcon, RecentIcon} from 'plotly-icons';
import {ms2DateTime, dateTime2ms} from 'plotly.js/src/lib/dates';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TextInput from './TextInput';
import Dropdown from './Dropdown';

export default class DateTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      calendarOpen: false,
      timepickerOpen: false,
    };

    this.onToggle = this.onToggle.bind(this);
    this.toPlotlyJSDate = this.toPlotlyJSDate.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onToggle() {
    this.setState({expanded: !this.state.expanded});
  }

  toPlotlyJSDate(value) {
    const ms = dateTime2ms(value);
    return ms2DateTime(ms);
  }

  getYearOptions(current) {
    const yearAsNumber = parseInt(current, 10);
    const lastFive = new Array(5).fill(0).map((year, index) => {
      const newOption = yearAsNumber - (5 - index);
      return {label: newOption, value: newOption};
    });
    const nextFive = new Array(5).fill(0).map((year, index) => {
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
    const currentDateInJS = new Date(this.props.value);
    currentDateInJS.setMonth(value);
    this.props.onChange(this.toPlotlyJSDate(currentDateInJS));
  }

  onYearChange(value) {
    const currentDateInJS = new Date(this.props.value);
    currentDateInJS.setFullYear(value);
    this.props.onChange(this.toPlotlyJSDate(currentDateInJS));
  }

  render() {
    const JSDate = new Date(this.props.value);
    const currentMonth = JSDate.getMonth();
    const currentYear = JSDate.getFullYear();
    const monthOptions = this.getMonthOptions();
    const yearOptions = this.getYearOptions(currentYear);

    return (
      <div className="datetimepicker-container">
        <TextInput
          value={this.props.value}
          editableClassName={'datetimepicker-container-input'}
          onUpdate={this.props.onChange}
        />
        <div className="datetimepicker-container-icons">
          <CalendarMultiselectIcon
            onClick={() =>
              this.setState({calendarOpen: !this.state.calendarOpen, timepickerOpen: false})
            }
            className={
              this.state.calendarOpen
                ? 'datetimepicker-date-icon--selected'
                : 'datetimepicker-date-icon'
            }
          />
          <RecentIcon
            onClick={() =>
              this.setState({timepickerOpen: !this.state.timepickerOpen, calendarOpen: false})
            }
            className={
              this.state.timepickerOpen
                ? 'datetimepicker-time-icon--selected'
                : 'datetimepicker-time-icon'
            }
          />
        </div>
        {this.state.calendarOpen || this.state.timepickerOpen ? (
          <div className="datetimepicker-container__content">
            {this.state.calendarOpen ? (
              <div className="datetimepicker-datepicker-container">
                <div className="datetimepicker-datepicker-navbar">
                  <Dropdown
                    options={monthOptions}
                    value={currentMonth}
                    className="datimepicker-monthpicker"
                    clearable={false}
                    onChange={this.onMonthChange}
                  />
                  <Dropdown
                    options={yearOptions}
                    value={currentYear}
                    className="datimepicker-yearpicker"
                    clearable={false}
                    onChange={this.onYearChange}
                  />
                </div>
                <DayPicker
                  className="datepicker-container-rce"
                  modifiers={{highlighted: JSDate}}
                  month={JSDate}
                  onDayClick={value => {
                    this.props.onChange(this.toPlotlyJSDate(value));
                  }}
                />
              </div>
            ) : null}
            {this.state.timepickerOpen ? (
              <div>
                <TextInput
                  value={JSDate}
                  onUpdate={value => {
                    this.props.onChange(this.toPlotlyJSDate(value));
                  }}
                />
                <span className="datetimepicker-date-units">
                  {new Date(this.props.value).toLocaleTimeString('en-US').split(' ')[1] === 'PM'
                    ? 'PM'
                    : 'AM'}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

DateTimePicker.contextTypes = {
  localize: PropTypes.func,
};

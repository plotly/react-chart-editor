import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, TimePicker} from '@blueprintjs/datetime';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import TextInput from './TextInput';
import {CalendarMultiselectIcon, RecentIcon} from 'plotly-icons';
import {ms2DateTime, dateTime2ms} from 'plotly.js/src/lib/dates';

export default class DateTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      calendarOpen: false,
      timepickerOpen: false,
    };

    this.onToggle = this.onToggle.bind(this);
    this.toPlotlyJSDate = this.toPlotlyJSDate.bind(this);
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

  render() {
    const JSDate = new Date(this.props.value);

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
              <DatePicker
                value={JSDate}
                className="datepicker-container-rce"
                onChange={value => {
                  this.props.onChange(this.toPlotlyJSDate(value));
                }}
              />
            ) : null}
            {this.state.timepickerOpen ? (
              <TimePicker
                value={JSDate}
                precision={'millisecond'}
                className="datetimepicker-time-icon"
                onChange={value => {
                  this.props.onChange(this.toPlotlyJSDate(value));
                }}
              />
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

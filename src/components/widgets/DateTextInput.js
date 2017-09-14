import DelayedTextInput from "@workspace/components/widgets/DelayedTextInput";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { MIXED_VALUES, MIXED_MODE_VALUE } from "@workspace/constants/workspace";
import { getWindow } from "_utils/globalUtils";

export const TEST_SELECTOR_CLASS = "js-DateTextInput";

/*
 * Widget for entering datetimes.
 *
 * TODO: I'm assuming at some point we will make a dateTime picker and
 * put that in here.
 * https://github.com/plotly/streambed/issues/8441
 */
export default class DateTextInput extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(newValue) {
    const { onUpdate, calendar } = this.props;

    if (getWindow().Plotly.Lib.isDateTime(newValue.trim(), calendar)) {
      onUpdate(newValue.trim());
    } else {
      // put back the previous value
      this.forceUpdate();
    }
  }

  render() {
    const { editableClassName, value, calendar } = this.props;
    const displayValue = value === MIXED_VALUES ? MIXED_MODE_VALUE : value;

    const wrapperClassName = classnames("date-input__wrapper");

    const editableClass = classnames(
      "date-input__date",
      editableClassName,
      TEST_SELECTOR_CLASS
    );

    return (
      <div className={wrapperClassName}>
        <DelayedTextInput
          className={editableClass}
          onUpdate={this.onUpdate}
          value={displayValue}
          disabled={calendar === MIXED_VALUES}
        />
      </div>
    );
  }
}

DateTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  calendar: PropTypes.string.isRequired,
  editableClassName: PropTypes.string,
};

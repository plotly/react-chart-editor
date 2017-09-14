/*
 * This component provides a dropdown for selecting traces. Traces will
 * automatically be paired with a fancy icon label. This component is used
 * for selecting among all possible traces types where the value is also the
 * chart type but also used for selecting among data traces where the label
 * will be an UID or index. Therefore traceOptions are a superset of what
 * is passed to the Dropdown as they contain trace "type" key so the fancy
 * label can be constructed.
 */
import Dropdown from "./Dropdown";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CHART_TYPE_ICON } from "@workspace/constants/workspace";
import { _ } from "@common/utils/i18n";
import { traceSelectOptionsShape } from "@workspace/utils/customPropTypes";
import { propsNotEqualNoFuncCheck } from "@workspace/utils/shouldComponentUpdate";

export default class SelectTrace extends Component {
  shouldComponentUpdate(nextProps) {
    return propsNotEqualNoFuncCheck(this.props, nextProps);
  }

  getIconClassName(chartType) {
    const iconClass = CHART_TYPE_ICON[chartType];
    return classnames({
      [iconClass]: Boolean(iconClass),
      "+soft-half-right": Boolean(iconClass),
    });
  }

  render() {
    const fancyTraceOptions = this.props.traceOptions.map(traceOption => {
      const { label, value, type, disabled = false } = traceOption;
      const iconClass = this.getIconClassName(type);

      return {
        value,
        disabled,
        label: (
          <span>
            <i className={iconClass} />
            {label}
          </span>
        ),
      };
    });

    return (
      <Dropdown
        placeholder={_("chart type")}
        value={this.props.selectedTraceValue}
        options={fancyTraceOptions}
        searchable={true}
        onChange={this.props.traceSelectHandler}
        clearable={false}
      />
    );
  }
}

SelectTrace.propTypes = {
  traceSelectHandler: PropTypes.func.isRequired,
  selectedTraceValue: PropTypes.string.isRequired,
  traceOptions: traceSelectOptionsShape.isRequired,
};

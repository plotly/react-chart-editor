import React from "react";
import Dropdown from "./Dropdown";
import * as customPropTypes from "@workspace/utils/customPropTypes";

const DashSelector = React.createClass({
  propTypes: {
    activeOption: customPropTypes.customOneOfType([
      PropTypes.oneOf([
        "solid",
        "dot",
        "dash",
        "longdash",
        "dashdot",
        "longdashdot",
      ]),
      customPropTypes.isNull,
    ]).isDefined,
    onChange: PropTypes.func.isRequired,
    lineColor: PropTypes.string,
  },

  // Set the initial state
  getInitialState() {
    return {
      activeOption: this.props.activeOption,
      lineColor: this.props.lineColor,
    };
  },

  componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (
      nextProps.activeOption !== this.state.activeOption ||
      nextProps.lineColor !== this.state.lineColor
    ) {
      this.setState({
        activeOption: nextProps.activeOption,
        lineColor: nextProps.lineColor,
      });
    }
  },

  onSelect(chosenDash) {
    this.props.onChange(chosenDash);
  },

  renderOption(option) {
    return (
      <li className="+ls-none">
        <div>
          <span className="+push-quarter-left">
            <svg width="100" height="4">
              <g>{option.label}</g>
            </svg>
          </span>
        </div>
      </li>
    );
  },

  renderValue(option) {
    return (
      <span>
        <svg width="100" height="4">
          <g>{option.label}</g>
        </svg>
      </span>
    );
  },

  renderDashList(lineColor) {
    return [
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeWidth: "4px",
            }}
          />
        ),
        value: "solid",
      },
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeDasharray: "3px, 3px",
              strokeWidth: "4px",
            }}
          />
        ),
        value: "dot",
      },
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeDasharray: "9px, 9px",
              strokeWidth: "4px",
            }}
          />
        ),
        value: "dash",
      },
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeDasharray: "15px, 15px",
              strokeWidth: "4px",
            }}
          />
        ),
        value: "longdash",
      },
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeDasharray: "9px, 3px, 3px, 3px",
              strokeWidth: "4px",
            }}
          />
        ),
        value: "dashdot",
      },
      {
        label: (
          <path
            d="M5,0h100"
            style={{
              fill: "none",
              stroke: lineColor,
              strokeOpacity: 1,
              strokeDasharray: "15px, 6px, 3px, 6px",
              strokeWidth: "4px",
            }}
          />
        ),
        value: "longdashdot",
      },
      {
        label: "",
        value: null,
      },
    ];
  },

  render() {
    return (
      <span className="widget-dropdown">
        <Dropdown
          value={this.state.activeOption}
          options={this.renderDashList(this.state.lineColor)}
          onChange={this.onSelect}
          clearable={false}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          valueKey={"value"}
          minWidth={"100%"}
        />
      </span>
    );
  },
});

export default DashSelector;

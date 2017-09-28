import React from "react";
import CheckboxGroup from "./CheckboxGroup";

// Component handles activeOption with shape "x+y+z"
// and ties it to the CheckboxGroup Component
const FlaglistCheckboxGroup = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
      })
    ).isRequired,
    activeOption: React.PropTypes.string,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    orientation: React.PropTypes.string,
  },

  // convert plotly.js's "all" or "none" option in its `flaglist` type
  // to a series of options separated by `+` that our component can handle
  _parseFlags(option) {
    let activeOption;
    if (option === "all") {
      activeOption = this.props.options.map(o => o.value).join("+");
    } else if (option === "none") {
      activeOption = "";
    } else {
      activeOption = option;
    }
    return activeOption;
  },

  getInitialState() {
    let currentActiveOption;
    if (this.props.activeOption !== null) {
      currentActiveOption = this.props.activeOption;
    } else {
      currentActiveOption = "";
    }

    return {
      activeOption: this._parseFlags(currentActiveOption),
    };
  },

  // Sync local state to parent props.
  componentWillReceiveProps(nextProps) {
    this.setState({ activeOption: this._parseFlags(nextProps.activeOption) });
  },

  // Called whenever a checkbox is changed, this updates the local
  // state to reflect the new activeOptions and then called props.onChange with
  // the new options.
  handleChange(newOptions) {
    let newActiveOptions = "";

    newOptions.map(option => {
      if (option.checked === true) {
        newActiveOptions += option.value + "+";
      }
    });

    newActiveOptions = newActiveOptions.slice(0, -1);

    if (newActiveOptions.length === 0) {
      newActiveOptions = "none";
    }

    this.setState({ activeOption: newActiveOptions });
    this.props.onChange(newActiveOptions);
  },

  // Turns the activeOptions "e.g "x+y+z" into an array that
  // the CheckboxGroup component can handle
  renderCheckedOption() {
    const activeOptions = this.state.activeOption.split("+");
    const allOptions = this.props.options;
    let newOptions = [];

    allOptions.map(option => {
      let currentChecked;

      if (activeOptions.indexOf(option.value) > -1) {
        currentChecked = true;
      } else {
        currentChecked = false;
      }

      newOptions.push({
        label: option.label,
        value: option.value,
        checked: currentChecked,
      });
    });

    return newOptions;
  },

  render() {
    return (
      <CheckboxGroup
        options={this.renderCheckedOption()}
        onChange={this.handleChange}
        className={this.props.className}
        orientation={this.props.orientation}
      />
    );
  },
});

module.exports = FlaglistCheckboxGroup;

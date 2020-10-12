import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';

// Component handles activeOption with shape "x+y+z"
// and ties it to the CheckboxGroup Component
class FlaglistCheckboxGroup extends Component {
  constructor(props) {
    super(props);

    let currentActiveOption;
    if (props.activeOption !== null) {
      currentActiveOption = props.activeOption;
    } else {
      currentActiveOption = '';
    }

    this.state = {
      activeOption: this.parseFlags(currentActiveOption),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // convert plotly.js's "all" or "none" option in its `flaglist` type
  // to a series of options separated by `+` that our component can handle
  parseFlags(option) {
    let activeOption;
    if (option === 'all') {
      activeOption = this.props.options.map((o) => o.value).join('+');
    } else if (option === 'none') {
      activeOption = '';
    } else {
      activeOption = option;
    }
    return activeOption;
  }

  // Sync local state to parent props.
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({activeOption: this.parseFlags(nextProps.activeOption)});
  }

  // Called whenever a checkbox is changed, this updates the local
  // state to reflect the new activeOptions and then called props.onChange with
  // the new options.
  handleChange(newOptions) {
    let newActiveOptions = '';

    newOptions.map((option) => {
      if (option.checked === true) {
        newActiveOptions += option.value + '+';
      }
    });

    newActiveOptions = newActiveOptions.slice(0, -1);

    if (newActiveOptions.length === 0) {
      newActiveOptions = 'none';
    }

    this.setState({activeOption: newActiveOptions});
    this.props.onChange(newActiveOptions);
  }

  // Turns the activeOptions "e.g "x+y+z" into an array that
  // the CheckboxGroup component can handle
  renderCheckedOption() {
    const activeOptions =
      typeof this.state.activeOption === 'string'
        ? this.state.activeOption.split('+')
        : [this.state.activeOption];
    const allOptions = this.props.options;
    const newOptions = [];

    allOptions.map((option) => {
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
  }

  render() {
    return (
      <CheckboxGroup
        options={this.renderCheckedOption()}
        onChange={this.handleChange}
        className={this.props.className}
        orientation={this.props.orientation}
      />
    );
  }
}

FlaglistCheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeOption: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
  orientation: PropTypes.string,
};

export default FlaglistCheckboxGroup;

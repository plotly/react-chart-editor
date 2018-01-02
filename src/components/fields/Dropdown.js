import DropdownWidget from '../widgets/Dropdown';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedDropdown extends Component {
  render() {
    let placeholder;
    if (this.props.multiValued) {
      placeholder = this.props.fullValue;
    }

    return (
      <Field {...this.props}>
        <DropdownWidget
          backgroundDark={this.props.backgroundDark}
          options={this.props.options}
          value={this.props.fullValue}
          onChange={this.props.updatePlot}
          clearable={this.props.clearable}
          optionRenderer={this.props.optionRenderer}
          valueRenderer={this.props.valueRenderer}
          placeholder={placeholder}
        />
      </Field>
    );
  }
}

UnconnectedDropdown.propTypes = {
  backgroundDark: PropTypes.bool,
  clearable: PropTypes.bool,
  fullValue: PropTypes.any,
  optionRenderer: PropTypes.func,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  valueRenderer: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedDropdown);

import DropdownWidget from '../widgets/Dropdown';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

export class UnconnectedDropdown extends Component {
  render() {
    let placeholder;
    if (this.props.multiValued) {
      placeholder = this.props.fullValue;
    }

    return (
      <Field {...this.props}>
        <DropdownWidget
          options={this.props.options}
          value={this.props.fullValue}
          onChange={this.props.updatePlot}
          clearable={this.props.clearable}
          placeholder={placeholder}
        />
      </Field>
    );
  }
}

UnconnectedDropdown.propTypes = {
  fullValue: PropTypes.any,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  clearable: PropTypes.bool,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedDropdown);

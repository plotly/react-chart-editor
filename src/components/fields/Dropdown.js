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

    let options = this.props.options;

    if (
      this.props.attr === 'geo.projection.type' &&
      this.context.fullLayout &&
      this.context.fullLayout.geo
    ) {
      if (this.context.fullLayout.geo.scope === 'usa') {
        options = options.usa;
      } else {
        options = options.other;
      }
    }

    return (
      <Field {...this.props}>
        <DropdownWidget
          backgroundDark={this.props.backgroundDark}
          options={options}
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
  options: PropTypes.any.isRequired,
  updatePlot: PropTypes.func,
  valueRenderer: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedDropdown.contextTypes = {
  fullLayout: PropTypes.object,
};

export default connectToContainer(UnconnectedDropdown);

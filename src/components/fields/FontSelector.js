import DropdownWidget from '../widgets/Dropdown';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';
import {DEFAULT_FONTS} from '../../lib/constants';

export class UnconnectedFontSelector extends Component {
  render() {
    let placeholder;
    if (this.props.multiValued) {
      placeholder = this.props.fullValue;
    }

    return (
      <Field {...this.props}>
        <DropdownWidget
          options={[...DEFAULT_FONTS]}
          value={this.props.fullValue}
          onChange={this.props.updatePlot}
          clearable={this.props.clearable}
          placeholder={placeholder}
        />
      </Field>
    );
  }
}

UnconnectedFontSelector.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  clearable: PropTypes.bool,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedFontSelector);

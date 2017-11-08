import React, {Component} from 'react';
import DropdownWidget from './widgets/Dropdown';
import Field from './Field';
import {bem, connectToContainer} from '../lib';

export class UnconnectedDropdown extends Component {
  render() {
    return (
      <Field label={this.props.label} postfix={this.props.postfix}>
        <DropdownWidget
          options={this.props.options}
          value={this.props.fullValue()}
          onChange={this.props.updatePlot}
          clearable={this.props.clearable}
        />
      </Field>
    );
  }
}

export default connectToContainer(UnconnectedDropdown);

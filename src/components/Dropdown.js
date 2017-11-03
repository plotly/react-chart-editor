import React, {Component} from 'react';
import DropdownWidget from './widgets/Dropdown';
import {bem, connectToPlot} from '../lib';

export class UnconnectedDropdown extends Component {
  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget')}>
          <DropdownWidget
            options={this.props.options}
            value={this.props.fullValue()}
            onChange={this.props.updatePlot}
            clearable={this.props.clearable}
          />
        </div>
      </div>
    );
  }
}

export default connectToPlot(UnconnectedDropdown);

import React, {Component} from 'react';
import FlaglistCheckboxGroup from './widgets/FlaglistCheckboxGroup';
import {bem, connectToPlot} from '../lib';

class Flaglist extends Component {
  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'no-title')}>
          <FlaglistCheckboxGroup
            options={this.props.options}
            activeOption={this.props.fullValue()}
            onChange={this.props.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default connectToPlot(Flaglist);

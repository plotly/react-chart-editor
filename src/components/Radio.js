import React, {Component} from 'react';
import RadioBlocks from './widgets/RadioBlocks';
import {bem, connectToContainer} from '../lib';

class Radio extends Component {
  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget')}>
          <RadioBlocks
            options={this.props.options}
            activeOption={this.props.fullValue()}
            onOptionChange={this.props.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default connectToContainer(Radio);

import React, {Component} from 'react';
import ColorPicker from './widgets/ColorPicker';
import {bem, connectToPlot} from '../lib';

class Color extends Component {
  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget')}>
          <ColorPicker
            selectedColor={this.props.fullValue()}
            onColorChange={this.props.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default connectToPlot(Color);

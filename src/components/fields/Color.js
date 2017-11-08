import React, {Component} from 'react';
import ColorPicker from '../widgets/ColorPicker';
import Field from './Field';
import {bem, connectToContainer} from '../../lib';

class Color extends Component {
  render() {
    return (
      <Field label={this.props.label} postfix={this.props.postfix}>
        <ColorPicker
          selectedColor={this.props.fullValue()}
          onColorChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

export default connectToContainer(Color);

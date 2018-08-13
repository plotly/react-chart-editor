import ColorPickerWidget from '../widgets/ColorPicker';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

class UnconnectedColorPicker extends Component {
  render() {
    return (
      <Field {...this.props}>
        <ColorPickerWidget
          selectedColor={this.props.fullValue}
          onColorChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

UnconnectedColorPicker.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedColorPicker);

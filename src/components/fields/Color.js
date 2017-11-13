import ColorPicker from '../widgets/ColorPicker';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem, connectToContainer} from '../../lib';

class Color extends Component {
  render() {
    return (
      <Field {...this.props}>
        <ColorPicker
          selectedColor={this.props.fullValue()}
          onColorChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

Color.propTypes = {
  fullValue: PropTypes.func,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(Color);

import ColorscalePicker from '../widgets/ColorscalePicker';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

class Colorway extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Field {...this.props}>
        <ColorscalePicker
          selected={this.props.fullValue}
          onColorscaleChange={this.props.updatePlot}
          initialCategory="categorical"
        />
      </Field>
    );
  }
}

Colorway.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(Colorway);

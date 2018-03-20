import Field from './Field';
import TextInput from '../widgets/TextInput';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedText extends Component {
  render() {
    let fullValue = this.props.fullValue;
    let placeholder;
    if (this.props.multiValued) {
      placeholder = fullValue;
      fullValue = '';
    }

    return (
      <Field {...this.props}>
        <TextInput
          value={fullValue}
          defaultValue={this.props.defaultValue}
          placeholder={placeholder}
          onUpdate={this.props.updatePlot}
        />
      </Field>
    );
  }
}

UnconnectedText.propTypes = {
  defaultValue: PropTypes.any,
  fullValue: PropTypes.any,
  multiValued: PropTypes.bool,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedText);

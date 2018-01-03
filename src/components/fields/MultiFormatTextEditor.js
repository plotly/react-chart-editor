import Field from './Field';
import MultiFormatTextEditor from '../widgets/text_editors/MultiFormatTextEditor';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';

export class UnconnectedMultiFormatTextEditor extends Component {
  render() {
    let fullValue = this.props.fullValue;
    let placeholder;
    if (this.props.multiValued) {
      placeholder = fullValue;
      fullValue = '';
    }
    return (
      <Field {...this.props}>
        <MultiFormatTextEditor
          value={fullValue}
          placeholder={placeholder}
          onChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

UnconnectedMultiFormatTextEditor.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(UnconnectedMultiFormatTextEditor);

import Field from './Field';
import MultiFormatTextEditor from '../widgets/text_editors/MultiFormatTextEditor';
import React, {Component, PropTypes} from 'react';
import {connectToContainer} from '../../lib';

export class UnconnectedMultiFormatTextEditor extends Component {
  render() {
    return (
      <Field {...this.props}>
        <MultiFormatTextEditor
          value={this.props.fullValue}
          onKeyDown={this.props.updatePlot}
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

import Field from './Field';
import React, {Component} from 'react';

export default class RichTextEditor extends Component {
  render() {
    return (
      <Field {...this.props}>
        <input value="Rich Text Editor" />
      </Field>
    );
  }
}

RichTextEditor.propTypes = {
  ...Field.propTypes,
};

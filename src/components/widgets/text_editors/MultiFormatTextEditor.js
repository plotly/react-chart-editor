import React, {PropTypes, Component} from 'react';
import RichTextEditor from './RichText';

export default class MultiFormatTextEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RichTextEditor value={this.props.value} onChange={this.props.onChange} />
    );
  }
}

MultiFormatTextEditor.propTypes = {
  defaultValuePattern: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

MultiFormatTextEditor.defaultProps = {
  defaultValuePattern: /^$/,
  placeholder: '',
  value: '',
};

import React, {PropTypes, Component} from 'react';

export default class MultiFormatTextEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input value={this.props.value} />;
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

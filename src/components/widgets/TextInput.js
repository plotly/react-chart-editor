import EditableText from './EditableText';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {value: props.value};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  render() {
    return (
      <EditableText
        className={`text-input ${this.props.editableClassName ? this.props.editableClassName : ''}`}
        placeholder={this.props.placeholder}
        text={this.state.value}
        type="text"
        onChange={(value) => {
          if (this.props.onChange) {
            this.props.onChange(value);
          }
          this.setState({value});
        }}
        onUpdate={this.props.onUpdate}
      />
    );
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.any,
  editableClassName: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

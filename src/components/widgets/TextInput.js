import EditableText from './EditableText';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {value: props.value};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  render() {
    return (
      <EditableText
        className={`text-input ${this.props.editableClassName}`}
        placeholder={this.props.placeholder}
        text={this.state.value}
        type="text"
        onChange={value => this.setState({value})}
        onUpdate={this.props.onUpdate}
      />
    );
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.number,
  editableClassName: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

import React, {Component} from 'react';

export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onChange(e) {
    const newValue = e.target.value;
    this.setState({value: newValue});
    this.props.onChange(newValue);
  }

  render() {
    return (
      <span>
        <textarea
          ref="textinput"
          value={this.state.value}
          rows={this.props.visibleRows}
          cols={this.props.areaWidth}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          className={this.props.textareaClass}
        />
      </span>
    );
  }
}

TextArea.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  visibleRows: React.PropTypes.number,
  areaWidth: React.PropTypes.number,
  textareaClass: React.PropTypes.string,
};

TextArea.defaultProps = {
  visibleRows: 10,
  areaWidth: 30,
};

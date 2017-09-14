import React from "react";

const TextAreaInput = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    visibleRows: React.PropTypes.number,
    areaWidth: React.PropTypes.number,
    textareaClass: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      visibleRows: 10,
      areaWidth: 30,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  },

  onChange(e) {
    let newValue = e.target.value;
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },

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
  },
});

module.exports = TextAreaInput;

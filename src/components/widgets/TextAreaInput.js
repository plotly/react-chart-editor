import React from "react";

const TextAreaInput = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    visibleRows: PropTypes.number,
    areaWidth: PropTypes.number,
    textareaClass: PropTypes.string,
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

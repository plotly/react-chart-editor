import React, { Component } from "react";
import PropTypes from "prop-types";
import { omit } from "ramda";

class UncontrolledTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <textarea
        type="text"
        value={this.state.value}
        onChange={e => this.onChange(e.target.value)}
        {...omit(["onChange", "value"], this.props)}
      />
    );
  }
}

export default UncontrolledTextarea;

import React, { Component } from "react";
import Field from "./field";

class Select extends Field {
  renderOption(attrs, i) {
    return (
      <option key={`option-${i}`} value={attrs.value}>
        {attrs.label}
      </option>
    );
  }

  render() {
    return (
      <label className="field">
        <span className="field-title">
          {this.props.label}
        </span>

        <select
          value={this.props.fullValue}
          className="field-control"
          onChange={this.updatePlot}
        >
          {this.props.options.map(this.renderOption)}
        </select>
      </label>
    );
  }
}

export default Select;

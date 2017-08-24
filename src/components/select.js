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
    var options = this.props.options;

    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      if (typeof opt !== "object") {
        options[i] = {
          label: opt,
          value: opt,
        };
      }
    }

    return (
      <label className="field">
        <span className="field-title">
          {this.props.label}
        </span>

        <select
          value={this.state.value}
          className="field-control"
          onChange={this.updatePlot}
        >
          {options.map(this.renderOption)}
        </select>
      </label>
    );
  }
}

export default Select;

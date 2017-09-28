import React, { Component } from "react";
import Field from "../Field";
import NumericInput from "../widgets/NumericInputStatefulWrapper";
import { bem } from "../../common";

class Numeric extends Field {
  render() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <NumericInput
          value={this.state.value}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          onChange={this.updatePlot}
          onUpdate={this.updatePlot}
          showArrows
        />
      </div>
    );
  }
}

export default Numeric;

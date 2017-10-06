import React, { Component } from "react";
import FieldBase from "./FieldBase";
import NumericInput from "./widgets/NumericInputStatefulWrapper";
import { bem } from "../lib";

class Numeric extends FieldBase {
  renderField() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <div className={bem("field", "widget")}>
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
      </div>
    );
  }
}

export default Numeric;

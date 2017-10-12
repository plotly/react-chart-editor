import React, { Component } from "react";
import FieldBase from "./FieldBase";
import RadioBlocks from "./widgets/RadioBlocks";
import { bem } from "../lib";

class Radio extends FieldBase {
  renderField() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <div className={bem("field", "widget")}>
          <RadioBlocks
            options={this.props.options}
            activeOption={this.fullValue}
            onOptionChange={this.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default Radio;

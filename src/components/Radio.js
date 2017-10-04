import React, { Component } from "react";
import FieldBase from "./FieldBase";
import RadioBlocks from "./widgets/RadioBlocks";
import { bem } from "../common";

class Radio extends FieldBase {
  render() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <div className={bem("field", "widget")}>
          <RadioBlocks
            options={[
              { value: true, label: "Connect" },
              { value: false, label: "Blank" },
            ]}
            activeOption={this.state.value}
            onOptionChange={this.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default Radio;

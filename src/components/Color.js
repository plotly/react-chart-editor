import React, { Component } from "react";
import FieldBase from "./FieldBase";
import ColorPicker from "./widgets/ColorPicker";
import { bem } from "../common";

class Color extends FieldBase {
  render() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <div className={bem("field", "widget")}>
          <ColorPicker
            selectedColor={this.state.value}
            onColorChange={this.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default Color;

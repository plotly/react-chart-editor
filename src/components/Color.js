import React, { Component } from "react";
import Field from "./Field";
import ColorPicker from "./widgets/ColorPicker";
import { bem } from "../common";

class Numeric extends Field {
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

export default Numeric;

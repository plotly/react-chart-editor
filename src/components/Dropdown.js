import React, { Component } from "react";
import FieldBase from "./FieldBase";
import DropdownWidget from "./widgets/Dropdown";
import { bem } from "../lib";

class Dropdown extends FieldBase {
  renderField() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "title")}>
          <div className={bem("field", "title-text")}>{this.props.label}</div>
        </div>
        <div className={bem("field", "widget")}>
          <DropdownWidget
            options={this.props.options}
            value={this.fullValue}
            onChange={this.updatePlot}
            clearable={this.props.clearable}
          />
        </div>
      </div>
    );
  }
}

export default Dropdown;

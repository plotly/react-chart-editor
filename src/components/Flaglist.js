import React, { Component } from "react";
import FieldBase from "./FieldBase";
import FlaglistCheckboxGroup from "./widgets/FlaglistCheckboxGroup";
import { bem } from "../lib";

class Flaglist extends FieldBase {
  renderField() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "no-title")}>
          <FlaglistCheckboxGroup
            options={this.props.options}
            activeOption={this.fullValue}
            onChange={this.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default Flaglist;

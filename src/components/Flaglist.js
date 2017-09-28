import React, { Component } from "react";
import Field from "./Field";
import FlaglistCheckboxGroup from "./widgets/FlaglistCheckboxGroup";
import { bem } from "../common";

class Flaglist extends Field {
  render() {
    return (
      <div className={bem("field")}>
        <div className={bem("field", "no-title")}>
          <FlaglistCheckboxGroup
            options={this.props.options}
            activeOption={this.state.value}
            onChange={this.updatePlot}
          />
        </div>
      </div>
    );
  }
}

export default Flaglist;

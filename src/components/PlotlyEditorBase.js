import React, { Component } from "react";
import Base from "./Base";
import PropTypes from "prop-types";

class PlotlyEditorBase extends Component {
  constructor(props, context) {
    super(props, context);
    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;
  }
}

// It's not enough for Base to specify which context it accepts. This component
// must manually pull Base's defined context types into its own.
PlotlyEditorBase.contextTypes = Object.assign(
  {
    dataSources: PropTypes.object,
    dataSourceNames: PropTypes.array,
  },
  Base.contextTypes
);

export default PlotlyEditorBase;

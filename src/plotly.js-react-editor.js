import React, { Component } from "react";
import PropTypes from "prop-types";
import constants from "./constants";
import { bem, setLocale } from "./common";

import Panel from "./components/Panel";
import ModeMenu from "./components/ModeMenu";
import Select from "./components/Select";
import DefaultPanels from "./components/DefaultPanels";

export default class PlotlyReactEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "Style-Traces",
    };
    setLocale(props.locale || "en");

    this.setSection = this.setSection.bind(this);
  }

  setSection(section) {
    this.setState({ section });
  }

  getChildContext() {
    var gd = this.props.graphDiv || {};
    var dataSourceNames = Object.keys(this.props.dataSources || {});
    return {
      data: gd.data,
      fullData: gd._fullData,
      layout: gd.layout,
      fullLayout: gd._fullLayout,
      handleUpdate: this.updateProp.bind(this),
      section: this.state.section.toLowerCase(),
      dataSources: this.props.dataSources,
      dataSourceNames: dataSourceNames,
    };
  }

  updateProp(attr, value) {
    this.props.onUpdate &&
      this.props.onUpdate(this.props.graphDiv, attr, value);
  }

  render() {
    return (
      <div className={bem()}>
        <ModeMenu
          currentSection={this.state.section}
          onChangeSection={this.setSection}
        />
        {this.props.graphDiv &&
          (this.props.children ? this.props.children : <DefaultPanels />)}
      </div>
    );
  }
}

PlotlyReactEditor.childContextTypes = {
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
  data: PropTypes.array,
  fullData: PropTypes.array,
  layout: PropTypes.object,
  fullLayout: PropTypes.object,
  handleUpdate: PropTypes.func,
  section: PropTypes.string,
};

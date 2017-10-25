import React, {Component} from 'react';
import PropTypes from 'prop-types';

import constants from './lib/constants';
import {bem} from './lib';
import dictionaries from './locales';

import DefaultEditor from './DefaultEditor';

class PlotlyEditor extends Component {
  getChildContext() {
    var gd = this.props.graphDiv || {};
    var dataSourceNames = Object.keys(this.props.dataSources || {});
    return {
      data: gd.data,
      dataSourceNames: dataSourceNames,
      dataSources: this.props.dataSources,
      dictionaries: dictionaries,
      fullData: gd._fullData,
      fullLayout: gd._fullLayout,
      graphDiv: gd,
      layout: gd.layout,
      locale: this.props.locale,
      onUpdate: this.updateProp.bind(this),
      plotSchema: this.props.plotly.PlotSchema.get(),
      plotly: this.props.plotly,
    };
  }

  updateProp(updates, traces, type) {
    this.props.onUpdate &&
      this.props.onUpdate(this.props.graphDiv, updates, traces, type);
  }

  render() {
    return (
      <div className={bem()}>
        {this.props.graphDiv &&
          (this.props.children ? this.props.children : <DefaultEditor />)}
      </div>
    );
  }
}

PlotlyEditor.defaultProps = {
  locale: 'en',
};

PlotlyEditor.childContextTypes = {
  data: PropTypes.array,
  dataSourceNames: PropTypes.array,
  dataSources: PropTypes.object,
  dictionaries: PropTypes.object,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotSchema: PropTypes.object,
  plotly: PropTypes.object,
};

export default PlotlyEditor;

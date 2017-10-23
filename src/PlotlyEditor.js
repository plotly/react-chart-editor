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
      graphDiv: gd,
      locale: this.props.locale,
      dictionaries: dictionaries,
      data: gd.data,
      fullData: gd._fullData,
      layout: gd.layout,
      fullLayout: gd._fullLayout,
      onUpdate: this.updateProp.bind(this),
      dataSources: this.props.dataSources,
      dataSourceNames: dataSourceNames
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
  locale: 'en'
};

PlotlyEditor.childContextTypes = {
  locale: PropTypes.string,
  dictionaries: PropTypes.object,
  graphDiv: PropTypes.any,
  dataSources: PropTypes.object,
  dataSourceNames: PropTypes.array,
  data: PropTypes.array,
  fullData: PropTypes.array,
  layout: PropTypes.object,
  fullLayout: PropTypes.object,
  onUpdate: PropTypes.func
};

export default PlotlyEditor;

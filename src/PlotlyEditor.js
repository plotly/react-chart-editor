import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import dictionaries from './locales';
import {bem} from './lib';

class PlotlyEditor extends Component {
  constructor(props, context) {
    super(props, context);

    // we only need to compute this once.
    this.plotSchema = this.props.plotly.PlotSchema.get();
  }

  getChildContext() {
    const gd = this.props.graphDiv || {};
    const dataSourceNames = Object.keys(this.props.dataSources || {});
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
      plotSchema: this.plotSchema,
      plotly: this.props.plotly,
    };
  }

  updateProp(event) {
    const {graphDiv} = this.props;
    this.props.onUpdate && this.props.onUpdate({graphDiv, ...event});
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

PlotlyEditor.propTypes = {
  onUpdate: PropTypes.func,
  plotly: PropTypes.object.isRequired,
  graphDiv: PropTypes.object,
  locale: PropTypes.string,
  dataSources: PropTypes.object,
};

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
  plotSchema: PropTypes.object.isRequired,
  plotly: PropTypes.object.isRequired,
};

export default PlotlyEditor;

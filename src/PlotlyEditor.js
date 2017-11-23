import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import dictionaries from './locales';
import isNumeric from 'fast-isnumeric';
import {bem} from './lib';
import {noShame} from './shame';

class PlotlyEditor extends Component {
  constructor(props, context) {
    super(props, context);

    noShame({plotly: this.props.plotly});

    // we only need to compute this once.
    if (this.props.plotly) {
      this.plotSchema = this.props.plotly.PlotSchema.get();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (isNumeric(nextProps.revision) && isNumeric(this.props.revision)) {
      // If revision is numeric, then increment only if revision has increased:
      return nextProps.revision > this.props.revision;
    }
    return true;
  }

  getChildContext() {
    const gd = this.props.graphDiv || {};
    return {
      data: gd.data,
      dataSources: this.props.dataSources,
      dataSourceOptions: this.props.dataSourceOptions,
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
    if (this.props.onUpdate) {
      this.props.onUpdate({graphDiv, ...event});
    }
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
  children: PropTypes.node,
  dataSources: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  graphDiv: PropTypes.object,
  locale: PropTypes.string,
  revision: PropTypes.number,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
};

PlotlyEditor.defaultProps = {
  locale: 'en',
};

PlotlyEditor.childContextTypes = {
  data: PropTypes.array,
  dataSources: PropTypes.object,
  dataSourceOptions: PropTypes.array,
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

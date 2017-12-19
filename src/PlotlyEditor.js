import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import dictionaries from './locales';
import {bem} from './lib';
import {noShame} from './shame';
import {EDITOR_ACTIONS} from './lib/constants';
import isNumeric from 'fast-isnumeric';
import nestedProperty from 'plotly.js/src/lib/nested_property';

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
    if (
      nextProps.revision === void 0 ||
      nextProps.revision !== this.props.revision ||
      nextProps.dataSources !== this.props.dataSources ||
      nextProps.dataSourceOptions !== this.props.dataSourceOptions
    ) {
      return true;
    }
    return false;
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
      onUpdate: this.handleUpdate.bind(this),
      plotSchema: this.plotSchema,
      plotly: this.props.plotly,
    };
  }

  handleUpdate({type, payload}) {
    const {graphDiv} = this.props;

    switch (type) {
      case EDITOR_ACTIONS.UPDATE_TRACES:
        if (this.props.onUpdateTraces) {
          this.props.onUpdateTraces({type, payload});
        }
        for (let i = 0; i < payload.traceIndexes.length; i++) {
          for (const attr in payload.update) {
            const traceIndex = payload.traceIndexes[i];
            const prop = nestedProperty(graphDiv.data[traceIndex], attr);
            const value = payload.update[attr];
            if (value !== void 0) {
              prop.set(value);
            }
          }
        }
        this.props.onUpdate();
        break;

      case EDITOR_ACTIONS.UPDATE_LAYOUT:
        for (const attr in payload.update) {
          const prop = nestedProperty(graphDiv.layout, attr);
          const value = payload.update[attr];
          if (value !== void 0) {
            prop.set(value);
          }
        }
        this.props.onUpdate();
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        graphDiv.data.push({x: [], y: []});
        this.props.onUpdate();
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          graphDiv.data.splice(payload[0], 1);
          this.props.onUpdate();
        }
        break;

      case EDITOR_ACTIONS.DELETE_ANNOTATION:
        if (isNumeric(payload.annotationIndex)) {
          graphDiv.layout.annotations.splice(payload.annotationIndex, 1);
          this.props.onUpdate();
        }
        break;

      default:
        throw new Error('must specify an action type to handleEditorUpdate');
    }
  }

  render() {
    return (
      <div className={bem()}>
        {this.props.graphDiv._fullLayout &&
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
  revision: PropTypes.any,
  onUpdate: PropTypes.func,
  onUpdateTraces: PropTypes.func,
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

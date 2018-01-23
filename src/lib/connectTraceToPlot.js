import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {
  findFullTraceIndex,
  getDisplayName,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectTraceToPlot(WrappedComponent) {
  class TraceConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteTrace = this.deleteTrace.bind(this);
      this.updateTrace = this.updateTrace.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {traceIndex} = props;
      const {data, fullData, plotly} = context;

      const trace = data[traceIndex] || {};
      const fullTraceIndex = findFullTraceIndex(fullData, traceIndex);
      const fullTrace = fullData[fullTraceIndex] || {};

      let getValObject;
      if (plotly) {
        /*
         * Since fullTrace._fullInput contains the _module.attributes key:
         * https://github.com/plotly/plotly.js/blob/70f3f70ec5b306cf74630355676f5e318f685824/src/plot_api/plot_schema.js#L241
         * this will work for all chart types. This needed to be adjusted as financial charts
         * do not contain their 'true' attributes, but rather attributes of the trace types that are used to compose them
        */
        getValObject = attr =>
          plotly.PlotSchema.getTraceValObject(
            fullTrace._fullInput,
            nestedProperty({}, attr).parts
          );
      }

      this.childContext = {
        getValObject,
        updateContainer: this.updateTrace,
        deleteContainer: this.deleteTrace,
        container: trace,
        fullContainer: fullTrace,
      };
      this.icon = renderTraceIcon(plotlyTraceToCustomTrace(trace));
      this.name = fullTrace.name;

      const DEFAULT_FIN_CHART_TRACE_NAME = '- increasing';
      if (fullTrace.name.indexOf(DEFAULT_FIN_CHART_TRACE_NAME) && !trace.name) {
        this.name = fullTrace.name.replace(DEFAULT_FIN_CHART_TRACE_NAME, '');
      }
    }

    getChildContext() {
      return this.childContext;
    }

    updateTrace(update) {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.UPDATE_TRACES,
          payload: {
            update,
            traceIndexes: [this.props.traceIndex],
          },
        });
      }
    }

    deleteTrace() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_TRACE,
          payload: {traceIndexes: [this.props.traceIndex]},
        });
      }
    }

    render() {
      return (
        <WrappedComponent name={this.name} icon={this.icon} {...this.props} />
      );
    }
  }

  TraceConnectedComponent.displayName = `TraceConnected${getDisplayName(
    WrappedComponent
  )}`;

  TraceConnectedComponent.propTypes = {
    traceIndex: PropTypes.number.isRequired,
  };

  TraceConnectedComponent.contextTypes = {
    fullData: PropTypes.array,
    data: PropTypes.array,
    plotly: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  TraceConnectedComponent.childContextTypes = {
    getValObject: PropTypes.func,
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  const {plotly_editor_traits} = WrappedComponent;
  TraceConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TraceConnectedComponent;
}

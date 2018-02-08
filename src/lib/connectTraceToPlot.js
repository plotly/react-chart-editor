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
      const {traceIndexes} = props;
      const {data, fullData, plotly} = context;

      const trace = traceIndexes.length > 0 ? data[traceIndexes[0]] : {};
      const fullTraceIndex =
        traceIndexes.length > 0
          ? findFullTraceIndex(fullData, traceIndexes[0])
          : findFullTraceIndex(fullData, 0);
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

      if (trace && fullTrace) {
        this.icon = renderTraceIcon(plotlyTraceToCustomTrace(trace));
        this.name = fullTrace.name;
        const DEFAULT_FIN_CHART_TRACE_NAME = ' - increasing';
        if (
          fullTrace.name.indexOf(DEFAULT_FIN_CHART_TRACE_NAME) &&
          !trace.name
        ) {
          this.name = fullTrace.name.replace(DEFAULT_FIN_CHART_TRACE_NAME, '');
        }
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
            traceIndexes: this.props.traceIndexes,
          },
        });
      }
    }

    deleteTrace() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_TRACE,
          payload: {traceIndexes: this.props.traceIndexes},
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
    traceIndexes: PropTypes.arrayOf(PropTypes.number).isRequired,
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

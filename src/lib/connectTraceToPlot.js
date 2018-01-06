import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {
  findFullTraceIndex,
  getDisplayName,
  plotlyTraceToCustomTrace,
  getPlotIcons,
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
        getValObject = attr =>
          plotly.PlotSchema.getTraceValObject(
            fullTrace,
            nestedProperty({}, attr).parts
          );

        this.plotIcons = getPlotIcons(plotly);
      }

      this.childContext = {
        getValObject,
        updateContainer: this.updateTrace,
        deleteContainer: this.deleteTrace,
        container: trace,
        fullContainer: fullTrace,
      };
      this.type = plotlyTraceToCustomTrace(trace);
      this.name = fullTrace.name;
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
        <WrappedComponent
          name={this.name}
          type={this.type}
          plotIcons={this.plotIcons}
          {...this.props}
        />
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

  return TraceConnectedComponent;
}

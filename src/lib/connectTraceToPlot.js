import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {findFullTraceIndex, getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from '../constants';

export default function connectTraceToPlot(WrappedComponent) {
  class TraceConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.deleteTrace = this.deleteTrace.bind(this);
      this.updateTrace = this.updateTrace.bind(this);
    }

    getChildContext() {
      const {traceIndex} = this.props;
      const {data, fullData, plotly} = this.context;

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
      }

      return {
        getValObject,
        updateContainer: this.updateTrace,
        deleteContainer: this.deleteTrace,
        container: trace,
        fullContainer: fullTrace,
      };
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
      return <WrappedComponent {...this.props} />;
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

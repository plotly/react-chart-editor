import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {
  getDisplayName,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
} from '../lib';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
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

      let fullTrace = {};
      for (let i = 0; i < fullData.length; i++) {
        if (trace.uid === fullData[i]._fullInput._input.uid) {
          fullTrace = fullData[i]._fullInput;
          break;
        }
      }

      this.childContext = {
        getValObject: attr =>
          plotly
            ? plotly.PlotSchema.getTraceValObject(
                fullTrace,
                nestedProperty({}, attr).parts
              )
            : null,
        updateContainer: this.updateTrace,
        deleteContainer: this.deleteTrace,
        container: trace,
        fullContainer: fullTrace,
      };

      if (traceIndexes.length > 1) {
        const multiValuedContainer = deepCopyPublic(fullTrace);
        fullData.forEach(t =>
          Object.keys(t).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, t, key, {
              searchArrays: true,
            })
          )
        );
        this.childContext.fullContainer = multiValuedContainer;
        this.childContext.defaultContainer = fullTrace;
        this.childContext.container = {};
      }

      if (trace && fullTrace) {
        this.icon = renderTraceIcon(plotlyTraceToCustomTrace(trace));
        this.name = fullTrace.name;
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
    defaultContainer: PropTypes.object,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  const {plotly_editor_traits} = WrappedComponent;
  TraceConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TraceConnectedComponent;
}

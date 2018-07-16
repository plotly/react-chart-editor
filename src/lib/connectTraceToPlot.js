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
        if (traceIndexes[0] === fullData[i]._fullInput.index) {
          /*
           * Fit transforms are custom transforms in our custom plotly.js bundle,
           * they are different from others as they create an extra trace in the
           * data array. When plotly.js runs supplyTraceDefaults (before the
           * transforms code executes) it stores the result in _fullInput,
           * so that we have a reference to what the original, corrected input was.
           * Then the transform code runs, our figure changes accordingly, but
           * we're still able to use the original input as it's in _fullInput.
           * This is the desired behaviour for our transforms usually,
           * but it is not useful for fits, as the transform code adds some styles
           * that are useful for the trace, so really for fits we'd like to read
           * from _fullData, not _fullInput. Here we're setting _fullInput to
           * _fullData as that is where the rest of our code expects to find its
           * values.
          */
          if (
            trace.transforms &&
            trace.transforms.every(t => t.type === 'fit')
          ) {
            fullData[i]._fullInput = fullData[i];
          }

          fullTrace = fullData[i]._fullInput;

          break;
        }
      }

      this.childContext = {
        getValObject: attr =>
          !plotly
            ? null
            : plotly.PlotSchema.getTraceValObject(
                fullTrace,
                nestedProperty({}, attr).parts
              ),
        updateContainer: this.updateTrace,
        deleteContainer: this.deleteTrace,
        container: trace,
        fullContainer: fullTrace,
      };

      if (traceIndexes.length > 1) {
        const multiValuedFullContainer = deepCopyPublic(fullTrace);
        fullData.forEach(t =>
          Object.keys(t).forEach(key =>
            setMultiValuedContainer(multiValuedFullContainer, t, key, {
              searchArrays: true,
            })
          )
        );
        const multiValuedContainer = deepCopyPublic(trace);
        data.forEach(t =>
          Object.keys(t).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, t, key, {
              searchArrays: true,
            })
          )
        );
        this.childContext.fullContainer = multiValuedFullContainer;
        this.childContext.defaultContainer = fullTrace;
        this.childContext.container = multiValuedContainer;
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

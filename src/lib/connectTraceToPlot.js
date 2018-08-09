import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {
  getDisplayName,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
  traceTypeToAxisType,
} from '../lib';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
import {EDITOR_ACTIONS, SUBPLOT_TO_ATTR} from 'lib/constants';

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

    getFullTraceFromDataIndex(trace, context) {
      let fullTrace = {};

      for (let i = 0; i < context.fullData.length; i++) {
        if (
          this.props.traceIndexes[0] === context.fullData[i]._fullInput.index
        ) {
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
            context.fullData[i]._fullInput = context.fullData[i];
          }

          fullTrace = context.fullData[i]._fullInput;
          break;
        }
      }

      return fullTrace;
    }

    setLocals(props, context) {
      const {traceIndexes, fullDataArrayPosition} = props;
      const {data, fullData, plotly} = context;

      const trace = data[traceIndexes[0]];
      const fullTrace = fullDataArrayPosition
        ? fullData[fullDataArrayPosition[0]]
        : this.getFullTraceFromDataIndex(trace, context);

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
        traceIndexes: this.props.traceIndexes,
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
        const splitTraceGroup = this.props.fullDataArrayPosition
          ? this.props.fullDataArrayPosition.map(
              p => this.context.fullData[p]._group
            )
          : null;

        if (Array.isArray(update)) {
          update.forEach((u, i) => {
            this.context.onUpdate({
              type: EDITOR_ACTIONS.UPDATE_TRACES,
              payload: {
                update: u,
                traceIndexes: [this.props.traceIndexes[i]],
                splitTraceGroup: splitTraceGroup ? splitTraceGroup[i] : null,
              },
            });
          });
        } else if (splitTraceGroup) {
          this.props.traceIndexes.forEach((t, i) => {
            this.context.onUpdate({
              type: EDITOR_ACTIONS.UPDATE_TRACES,
              payload: {
                update,
                traceIndexes: [this.props.traceIndexes[i]],
                splitTraceGroup: splitTraceGroup ? splitTraceGroup[i] : null,
              },
            });
          });
        } else {
          this.context.onUpdate({
            type: EDITOR_ACTIONS.UPDATE_TRACES,
            payload: {
              update,
              traceIndexes: this.props.traceIndexes,
            },
          });
        }
      }
    }

    deleteTrace() {
      const currentTrace = this.context.fullData[this.props.traceIndexes[0]];
      if (!currentTrace && this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_TRACE,
          payload: {
            traceIndexes: this.props.traceIndexes,
          },
        });
        return;
      }
      const axesToBeGarbageCollected = [];
      let subplotToBeGarbageCollected = null;
      const subplotType = traceTypeToAxisType(currentTrace.type);

      if (subplotType) {
        const subplotNames =
          subplotType === 'cartesian'
            ? [currentTrace.xaxis || 'xaxis', currentTrace.yaxis || 'yaxis']
            : currentTrace[SUBPLOT_TO_ATTR[subplotType].data] ||
              SUBPLOT_TO_ATTR[subplotType].data;

        const isSubplotUsedAnywhereElse = (subplotType, subplotName) =>
          this.context.fullData.some(
            trace =>
              (trace[SUBPLOT_TO_ATTR[subplotType].data] === subplotName ||
                (((subplotType === 'xaxis' || subplotType === 'yaxis') &&
                  subplotName.charAt(1)) === '' ||
                  (subplotName.split(subplotType)[1] === '' &&
                    trace[SUBPLOT_TO_ATTR[subplotType].data] === null))) &&
              trace.index !== this.props.traceIndexes[0]
          );

        // When we delete a subplot, make sure no unused axes/subplots are left
        if (subplotType === 'cartesian') {
          if (!isSubplotUsedAnywhereElse('xaxis', subplotNames[0])) {
            axesToBeGarbageCollected.push(subplotNames[0]);
          }
          if (!isSubplotUsedAnywhereElse('yaxis', subplotNames[1])) {
            axesToBeGarbageCollected.push(subplotNames[1]);
          }
        } else {
          if (!isSubplotUsedAnywhereElse(subplotType, subplotNames)) {
            subplotToBeGarbageCollected = subplotNames;
          }
        }
      }

      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_TRACE,
          payload: {
            axesToBeGarbageCollected,
            subplotToBeGarbageCollected,
            traceIndexes: this.props.traceIndexes,
          },
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
    fullDataArrayPosition: PropTypes.arrayOf(PropTypes.number),
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
    traceIndexes: PropTypes.array,
  };

  const {plotly_editor_traits} = WrappedComponent;
  TraceConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TraceConnectedComponent;
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {
  getDisplayName,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
  traceTypeToAxisType,
  getFullTrace,
} from '../lib';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
import {EDITOR_ACTIONS, SUBPLOT_TO_ATTR} from 'lib/constants';
import {EditorControlsContext} from '../context';
import {recursiveMap} from './recursiveMap';

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
      const {data, layout, fullLayout, plotly, onUpdate, localize, fullData, graphDiv} = context;

      const trace = data[traceIndexes[0]];
      const fullTrace = getFullTrace(props, context);

      this.childContext = {
        data,
        layout,
        fullLayout,
        plotly,
        onUpdate,
        localize,
        fullData,
        graphDiv,
        getValObject: attr =>
          !plotly
            ? null
            : plotly.PlotSchema.getTraceValObject(fullTrace, nestedProperty({}, attr).parts),
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
            setMultiValuedContainer(multiValuedFullContainer, deepCopyPublic(t), key, {
              searchArrays: true,
            })
          )
        );
        const multiValuedContainer = deepCopyPublic(trace);
        data.forEach(t =>
          Object.keys(t).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, deepCopyPublic(t), key, {
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

    provideValue() {
      return this.childContext;
    }

    updateTrace(update) {
      if (this.context.onUpdate) {
        const splitTraceGroup = this.props.fullDataArrayPosition
          ? this.props.fullDataArrayPosition.map(p => this.context.fullData[p]._group)
          : null;

        const containsAnSrc = Object.keys(update).filter(a => a.endsWith('src')).length > 0;

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
        } else if (splitTraceGroup && !containsAnSrc) {
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
            : currentTrace[SUBPLOT_TO_ATTR[subplotType].data] || SUBPLOT_TO_ATTR[subplotType].data;

        const isSubplotUsedAnywhereElse = (subplotType, subplotName) =>
          this.context.fullData.some(
            trace =>
              (trace[SUBPLOT_TO_ATTR[subplotType].data] === subplotName ||
                (((subplotType === 'xaxis' || subplotType === 'yaxis') && subplotName.charAt(1)) ===
                  '' ||
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
      const newProps = {...this.props, ...{context: this.provideValue()}};
      if (this.props.children) {
        return (
          <WrappedComponent name={this.name} icon={this.icon} {...newProps}>
            {recursiveMap(this.props.children, this.provideValue())}
          </WrappedComponent>
        );
      }
      return <WrappedComponent name={this.name} icon={this.icon} {...newProps} />;
    }
  }

  TraceConnectedComponent.displayName = `TraceConnected${getDisplayName(WrappedComponent)}`;

  TraceConnectedComponent.propTypes = {
    traceIndexes: PropTypes.arrayOf(PropTypes.number).isRequired,
    fullDataArrayPosition: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.node,
  };

  TraceConnectedComponent.contextType = EditorControlsContext;

  const {plotly_editor_traits} = WrappedComponent;
  TraceConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TraceConnectedComponent;
}

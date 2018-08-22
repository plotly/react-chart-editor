import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName, plotlyTraceToCustomTrace, renderTraceIcon} from '../lib';

export default function connectNonCartesianSubplotToLayout(WrappedComponent) {
  class SubplotConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.updateSubplot = this.updateSubplot.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {subplot, traceIndexes} = props;
      const {container, fullContainer, data, fullData} = context;

      this.container = container[subplot] || {};
      this.fullContainer = fullContainer[subplot] || {};

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
          if (trace.transforms && trace.transforms.every(t => t.type === 'fit')) {
            fullData[i]._fullInput = fullData[i];
          }

          fullTrace = fullData[i]._fullInput;

          break;
        }
      }

      if (trace && fullTrace) {
        this.icon = renderTraceIcon(plotlyTraceToCustomTrace(trace));
        this.name = fullTrace.name;
      }
    }

    getChildContext() {
      return {
        getValObject: attr =>
          !this.context.getValObject
            ? null
            : this.context.getValObject(`${this.props.subplot}.${attr}`),
        updateContainer: this.updateSubplot,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateSubplot(update) {
      const newUpdate = {};
      for (const key in update) {
        newUpdate[`${this.props.subplot}.${key}`] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent name={this.name} icon={this.icon} {...this.props} />;
    }
  }

  SubplotConnectedComponent.displayName = `SubplotConnected${getDisplayName(WrappedComponent)}`;

  SubplotConnectedComponent.propTypes = {
    subplot: PropTypes.string.isRequired,
  };

  SubplotConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    fullData: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  SubplotConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}

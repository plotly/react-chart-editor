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
      let fullTrace = fullData.filter(t => t && traceIndexes[0] === t.index)[0] || {};

      // For transformed traces, we actually want to read in _fullInput because
      // there's original parent information that's more useful to the user there
      // This is true except for fit transforms, where reading in fullData is
      // what we want
      if (
        trace.transforms &&
        !trace.transforms.some(t => ['moving-average', 'fits'].includes(t.type))
      ) {
        fullTrace = fullTrace._fullInput;
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

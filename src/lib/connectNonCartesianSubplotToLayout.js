import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName, plotlyTraceToCustomTrace, renderTraceIcon, getFullTrace} from '../lib';
import {recursiveMap} from './recursiveMap';
import {EditorControlsContext} from '../context';

export default function connectNonCartesianSubplotToLayout(WrappedComponent) {
  class SubplotConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.updateSubplot = this.updateSubplot.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps, this.context);
    }

    setLocals(props, context) {
      const {subplot, traceIndexes, context: propContext} = props;
      const {data, fullData} = context;
      const {container, fullContainer} = propContext;

      this.container = container[subplot] || {};
      this.fullContainer = fullContainer[subplot] || {};

      const trace = traceIndexes.length > 0 ? data[traceIndexes[0]] : {};
      const fullTrace = getFullTrace(props, {...propContext, data, fullData});

      if (trace && fullTrace) {
        this.icon = renderTraceIcon(plotlyTraceToCustomTrace(trace));
        this.name = fullTrace.name;
      }
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`${this.props.subplot}.${attr}`),
        updateContainer: this.updateSubplot,
        container: this.container,
        fullContainer: this.fullContainer,
        fullLayout: this.context.fullLayout,
      };
    }

    updateSubplot(update) {
      const newUpdate = {};
      for (const key in update) {
        newUpdate[`${this.props.subplot}.${key}`] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
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

  SubplotConnectedComponent.displayName = `SubplotConnected${getDisplayName(WrappedComponent)}`;

  SubplotConnectedComponent.propTypes = {
    subplot: PropTypes.string.isRequired,
  };

  SubplotConnectedComponent.contextType = EditorControlsContext;

  SubplotConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}

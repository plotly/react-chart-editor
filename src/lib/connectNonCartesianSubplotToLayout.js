import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName, plotlyTraceToCustomTrace, renderTraceIcon, getFullTrace} from '../lib';
import {recursiveMap} from './recursiveMap';

export default function connectNonCartesianSubplotToLayout(WrappedComponent) {
  class SubplotConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.updateSubplot = this.updateSubplot.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {subplot, traceIndexes, context} = props;
      const {container, fullContainer, data} = context;

      this.container = container[subplot] || {};
      this.fullContainer = fullContainer[subplot] || {};

      const trace = traceIndexes.length > 0 ? data[traceIndexes[0]] : {};
      const fullTrace = getFullTrace(props, context);

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
        fullLayout: this.props.context.fullLayout,
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

  SubplotConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    fullLayout: PropTypes.object,
    data: PropTypes.array,
    fullData: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}

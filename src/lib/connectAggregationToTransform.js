import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';

export default function connectAggregationToTransform(WrappedComponent) {
  class AggregationConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.updateAggregation = this.updateAggregation.bind(this);
      this.setLocals(props, context);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {aggregationIndex} = props;
      const {container, fullContainer} = context;

      const aggregations = (container && container.aggregations) || [];
      const fullAggregations = fullContainer.aggregations || [];
      this.container = aggregations[aggregationIndex];
      this.fullContainer = fullAggregations[aggregationIndex];
    }

    getChildContext() {
      return {
        getValObject: (attr) =>
          !this.context.getValObject ? null : this.context.getValObject(`aggregations[].${attr}`),
        updateContainer: this.updateAggregation,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateAggregation(update) {
      const newUpdate = {};
      const path = `aggregations[${this.props.aggregationIndex}]`;
      for (const key in update) {
        newUpdate[`${path}.${key}`] = update[key];
      }
      newUpdate[`${path}.target`] = this.fullContainer.target;
      newUpdate[`${path}.enabled`] = true;
      this.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  AggregationConnectedComponent.displayName = `AggregationConnected${getDisplayName(
    WrappedComponent
  )}`;

  AggregationConnectedComponent.propTypes = {
    aggregationIndex: PropTypes.number.isRequired,
  };

  AggregationConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  AggregationConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AggregationConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AggregationConnectedComponent;
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {recursiveMap} from './recursiveMap';

export default function connectAggregationToTransform(WrappedComponent) {
  class AggregationConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.updateAggregation = this.updateAggregation.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {container, fullContainer} = props.context;
      const {aggregationIndex} = props;

      const aggregations = (container && container.aggregations) || [];
      const fullAggregations = fullContainer.aggregations || [];
      this.container = aggregations[aggregationIndex];
      this.fullContainer = fullAggregations[aggregationIndex];
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`aggregations[].${attr}`),
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
      this.props.context.updateContainer(newUpdate);
    }

    render() {
      const newProps = {...this.props, context: this.provideValue()};
      if (this.props.children) {
        return (
          <WrappedComponent {...newProps}>
            {recursiveMap(this.props.children, this.provideValue())}
          </WrappedComponent>
        );
      }
      return <WrappedComponent {...newProps} />;
    }
  }

  AggregationConnectedComponent.displayName = `AggregationConnected${getDisplayName(
    WrappedComponent
  )}`;

  AggregationConnectedComponent.propTypes = {
    aggregationIndex: PropTypes.number.isRequired,
  };

  AggregationConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  AggregationConnectedComponent.propTypes = {
    children: PropTypes.node,
    context: PropTypes.any,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AggregationConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AggregationConnectedComponent;
}

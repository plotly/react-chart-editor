import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {recursiveMap} from './recursiveMap';
import {EditorControlsContext} from '../context';

export default function connectRangeSelectorToAxis(WrappedComponent) {
  class RangeSelectorConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.deleteRangeselector = this.deleteRangeselector.bind(this);
      this.updateRangeselector = this.updateRangeselector.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {context, rangeselectorIndex} = props;
      const {container, fullContainer} = context;

      const rangeselectors = container.rangeselector ? container.rangeselector.buttons || [] : [];
      const fullRangeselectors = fullContainer.rangeselector
        ? fullContainer.rangeselector.buttons || []
        : [];
      this.container = rangeselectors[rangeselectorIndex];
      this.fullContainer = fullRangeselectors[rangeselectorIndex];
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`rangeselector.buttons[].${attr}`),
        updateContainer: this.updateRangeselector,
        deleteContainer: this.deleteRangeselector,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateRangeselector(update) {
      const newUpdate = {};
      const {rangeselectorIndex} = this.props;
      for (const key in update) {
        const newkey = `rangeselector.buttons[${rangeselectorIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
    }

    deleteRangeselector() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_RANGESELECTOR,
          payload: {
            axisId: this.props.context.fullContainer._name,
            rangeselectorIndex: this.props.rangeselectorIndex,
          },
        });
      }
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

  RangeSelectorConnectedComponent.displayName = `RangeSelectorConnected${getDisplayName(
    WrappedComponent
  )}`;

  RangeSelectorConnectedComponent.contextType = EditorControlsContext;

  RangeSelectorConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  RangeSelectorConnectedComponent.propTypes = {
    rangeselectorIndex: PropTypes.number.isRequired,
    children: PropTypes.node,
    context: PropTypes.any,
  };

  const {plotly_editor_traits} = WrappedComponent;
  RangeSelectorConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return RangeSelectorConnectedComponent;
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {recursiveMap} from './recursiveMap';

export default function connectTransformToTrace(WrappedComponent) {
  class TransformConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.deleteTransform = this.deleteTransform.bind(this);
      this.updateTransform = this.updateTransform.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {context, transformIndex} = props;
      const {container, fullContainer} = context;

      const transforms = container.transforms || [];
      const fullTransforms = fullContainer.transforms || [];
      this.container = transforms[transformIndex];
      this.fullContainer = fullTransforms[transformIndex];
    }

    // getChildContext() {
    //   return {
    //     getValObject: attr =>
    //       !this.context.getValObject ? null : this.context.getValObject(`transforms[].${attr}`),
    //     updateContainer: this.updateTransform,
    //     deleteContainer: this.deleteTransform,
    //     container: this.container,
    //     fullContainer: this.fullContainer,
    //   };
    // }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`transforms[].${attr}`),
        updateContainer: this.updateTransform,
        deleteContainer: this.deleteTransform,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateTransform(update) {
      const newUpdate = {};
      const {transformIndex} = this.props;
      for (const key in update) {
        const newkey = `transforms[${transformIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
    }

    deleteTransform() {
      if (this.props.context.onUpdate) {
        this.props.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_TRANSFORM,
          payload: {
            traceIndex: this.props.context.fullContainer.index,
            transformIndex: this.props.transformIndex,
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

  TransformConnectedComponent.displayName = `TransformConnected${getDisplayName(WrappedComponent)}`;

  TransformConnectedComponent.propTypes = {
    transformIndex: PropTypes.number.isRequired,
  };

  TransformConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  // TransformConnectedComponent.contextTypes = {
  //   container: PropTypes.object,
  //   fullContainer: PropTypes.object,
  //   data: PropTypes.array,
  //   onUpdate: PropTypes.func,
  //   updateContainer: PropTypes.func,
  //   getValObject: PropTypes.func,
  // };
  //
  // TransformConnectedComponent.childContextTypes = {
  //   updateContainer: PropTypes.func,
  //   deleteContainer: PropTypes.func,
  //   container: PropTypes.object,
  //   fullContainer: PropTypes.object,
  //   getValObject: PropTypes.func,
  // };

  const {plotly_editor_traits} = WrappedComponent;
  TransformConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TransformConnectedComponent;
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {ConnectShapeToLayoutContext} from '../context';

export default function connectShapeToLayout(WrappedComponent) {
  class ShapeConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteShape = this.deleteShape.bind(this);
      this.updateShape = this.updateShape.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {shapeIndex} = props;
      const {container, fullContainer} = context;

      const shapes = container.shapes || [];
      const fullShapes = fullContainer.shapes || [];
      this.container = shapes[shapeIndex];
      this.fullContainer = fullShapes[shapeIndex];
    }

    getChildContext() {
      return {
        getValObject: attr =>
          !this.context.getValObject ? null : this.context.getValObject(`shapes[].${attr}`),
        updateContainer: this.updateShape,
        deleteContainer: this.deleteShape,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.context.getValObject ? null : this.context.getValObject(`shapes[].${attr}`),
        updateContainer: this.updateShape,
        deleteContainer: this.deleteShape,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateShape(update) {
      const newUpdate = {};
      const {shapeIndex} = this.props;
      for (const key in update) {
        const newkey = `shapes[${shapeIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteShape() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_SHAPE,
          payload: {shapeIndex: this.props.shapeIndex},
        });
      }
    }

    render() {
      return (
        <ConnectShapeToLayoutContext.Provider value={this.provideValue()}>
          <WrappedComponent {...this.props} />
        </ConnectShapeToLayoutContext.Provider>
      );
    }
  }

  ShapeConnectedComponent.displayName = `ShapeConnected${getDisplayName(WrappedComponent)}`;

  ShapeConnectedComponent.propTypes = {
    shapeIndex: PropTypes.number.isRequired,
  };

  ShapeConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  ShapeConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  ShapeConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ShapeConnectedComponent;
}

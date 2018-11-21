import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {recursiveMap} from './recursiveMap';

export default function connectShapeToLayout(WrappedComponent) {
  class ShapeConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.deleteShape = this.deleteShape.bind(this);
      this.updateShape = this.updateShape.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {shapeIndex, context} = props;
      const {container, fullContainer} = context;

      const shapes = container.shapes || [];
      const fullShapes = fullContainer.shapes || [];
      this.container = shapes[shapeIndex];
      this.fullContainer = fullShapes[shapeIndex];
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`shapes[].${attr}`),
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
      this.props.context.updateContainer(newUpdate);
    }

    deleteShape() {
      if (this.props.context.onUpdate) {
        this.props.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_SHAPE,
          payload: {shapeIndex: this.props.shapeIndex},
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

  ShapeConnectedComponent.displayName = `ShapeConnected${getDisplayName(WrappedComponent)}`;

  ShapeConnectedComponent.propTypes = {
    shapeIndex: PropTypes.number.isRequired,
  };
  ShapeConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  ShapeConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ShapeConnectedComponent;
}

import {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectAnnotationToLayout(WrappedComponent) {
  class AnnotationConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteAnnotation = this.deleteAnnotation.bind(this);
      this.updateAnnotation = this.updateAnnotation.bind(this);
      this.moveAnnotation = this.moveAnnotation.bind(this);
      this.setLocals(props, context);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {annotationIndex} = props;
      const {container, fullContainer} = context;

      const annotations = container.annotations || [];
      const fullAnnotations = fullContainer.annotations || [];
      this.container = annotations[annotationIndex];
      this.fullContainer = fullAnnotations[annotationIndex];
    }

    getChildContext() {
      return {
        getValObject: (attr) =>
          !this.context.getValObject ? null : this.context.getValObject(`annotations[].${attr}`),
        updateContainer: this.updateAnnotation,
        deleteContainer: this.deleteAnnotation,
        container: this.container,
        fullContainer: this.fullContainer,
        moveContainer: this.moveAnnotation,
      };
    }

    updateAnnotation(update) {
      const newUpdate = {};
      const {annotationIndex} = this.props;
      for (const key in update) {
        const newkey = `annotations[${annotationIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteAnnotation() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_ANNOTATION,
          payload: {annotationIndex: this.props.annotationIndex},
        });
      }
    }

    moveAnnotation(direction) {
      if (this.context.onUpdate) {
        const annotationIndex = this.props.annotationIndex;
        const desiredIndex = direction === 'up' ? annotationIndex - 1 : annotationIndex + 1;
        this.context.onUpdate({
          type: EDITOR_ACTIONS.MOVE_TO,
          payload: {
            fromIndex: annotationIndex,
            toIndex: desiredIndex,
            path: 'layout.annotations',
          },
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  AnnotationConnectedComponent.displayName = `AnnotationConnected${getDisplayName(
    WrappedComponent
  )}`;

  AnnotationConnectedComponent.propTypes = {
    annotationIndex: PropTypes.number.isRequired,
  };

  AnnotationConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  AnnotationConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
    moveContainer: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AnnotationConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AnnotationConnectedComponent;
}

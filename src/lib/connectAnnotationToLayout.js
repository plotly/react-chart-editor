import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {recursiveMap} from './recursiveMap';
import {EditorControlsContext} from '../context';

export default function connectAnnotationToLayout(WrappedComponent) {
  class AnnotationConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.deleteAnnotation = this.deleteAnnotation.bind(this);
      this.updateAnnotation = this.updateAnnotation.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {context, ...newProps} = props;
      const {annotationIndex} = newProps;
      const {container, fullContainer} = context;

      const annotations = container.annotations || [];
      const fullAnnotations = fullContainer.annotations || [];
      this.container = annotations[annotationIndex];
      this.fullContainer = fullAnnotations[annotationIndex];
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`annotations[].${attr}`),
        updateContainer: this.updateAnnotation,
        deleteContainer: this.deleteAnnotation,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateAnnotation(update) {
      const newUpdate = {};
      const {annotationIndex} = this.props;
      for (const key in update) {
        const newkey = `annotations[${annotationIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
    }

    deleteAnnotation() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_ANNOTATION,
          payload: {annotationIndex: this.props.annotationIndex},
        });
      }
    }

    render() {
      const newProps = {
        ...this.props,
        context: {...this.provideValue(), fullLayout: this.context.fullLayout},
      };
      if (this.props.children) {
        return (
          <WrappedComponent {...newProps}>
            {recursiveMap(this.props.children, {
              ...this.provideValue(),
              fullLayout: this.context.fullLayout,
            })}
          </WrappedComponent>
        );
      }
      return <WrappedComponent {...newProps} />;
    }
  }

  AnnotationConnectedComponent.displayName = `AnnotationConnected${getDisplayName(
    WrappedComponent
  )}`;

  AnnotationConnectedComponent.propTypes = {
    annotationIndex: PropTypes.number.isRequired,
  };

  AnnotationConnectedComponent.contextType = EditorControlsContext;

  AnnotationConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  AnnotationConnectedComponent.propTypes = {
    children: PropTypes.node,
    context: PropTypes.any,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AnnotationConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AnnotationConnectedComponent;
}

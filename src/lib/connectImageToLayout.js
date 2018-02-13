import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectImageToLayout(WrappedComponent) {
  class ImageConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteImage = this.deleteImage.bind(this);
      this.updateImage = this.updateImage.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {imageIndex} = props;
      const {container, fullContainer} = context;

      const images = container.images || [];
      const fullImages = fullContainer.images || [];
      this.container = images[imageIndex];
      this.fullContainer = fullImages[imageIndex];
    }

    getChildContext() {
      return {
        updateContainer: this.updateImage,
        deleteContainer: this.deleteImage,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateImage(update) {
      const newUpdate = {};
      const {imageIndex} = this.props;
      for (const key in update) {
        const newkey = `images[${imageIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteImage() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_IMAGE,
          payload: {imageIndex: this.props.imageIndex},
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ImageConnectedComponent.displayName = `ImageConnected${getDisplayName(
    WrappedComponent
  )}`;

  ImageConnectedComponent.propTypes = {
    imageIndex: PropTypes.number.isRequired,
  };

  ImageConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
  };

  ImageConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  const {plotly_editor_traits} = WrappedComponent;
  ImageConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ImageConnectedComponent;
}

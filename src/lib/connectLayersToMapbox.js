import {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectLayersToMapbox(WrappedComponent) {
  class MapboxLayerConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteMapboxLayer = this.deleteMapboxLayer.bind(this);
      this.updateMapboxLayer = this.updateMapboxLayer.bind(this);
      this.moveMapboxLayer = this.moveMapboxLayer.bind(this);
      this.setLocals(props, context);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {mapboxLayerIndex} = props;
      const {container, fullContainer} = context;

      const mapboxLayers = container.layers || [];
      const fullmapboxLayers = fullContainer.layers || [];
      this.container = mapboxLayers[mapboxLayerIndex];
      this.fullContainer = fullmapboxLayers[mapboxLayerIndex];
    }

    getChildContext() {
      return {
        getValObject: (attr) =>
          !this.context.getValObject ? null : this.context.getValObject(`layers[].${attr}`),
        updateContainer: this.updateMapboxLayer,
        deleteContainer: this.deleteMapboxLayer,
        moveContainer: this.moveMapboxLayer,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateMapboxLayer(update) {
      const newUpdate = {};
      const {mapboxLayerIndex} = this.props;
      for (const key in update) {
        const newkey = `layers[${mapboxLayerIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteMapboxLayer() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_MAPBOXLAYER,
          payload: {
            mapboxId: this.context.fullContainer._subplot.id,
            mapboxLayerIndex: this.props.mapboxLayerIndex,
          },
        });
      }
    }

    moveMapboxLayer(direction) {
      if (this.context.onUpdate) {
        const mapboxLayerIndex = this.props.mapboxLayerIndex;
        const desiredIndex = direction === 'up' ? mapboxLayerIndex - 1 : mapboxLayerIndex + 1;
        this.context.onUpdate({
          type: EDITOR_ACTIONS.MOVE_TO,
          payload: {
            fromIndex: mapboxLayerIndex,
            toIndex: desiredIndex,
            mapboxId: this.context.fullContainer._subplot.id,
            path: 'layout.mapbox.layers',
          },
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  MapboxLayerConnectedComponent.displayName = `MapboxLayerConnected${getDisplayName(
    WrappedComponent
  )}`;

  MapboxLayerConnectedComponent.propTypes = {
    mapboxLayerIndex: PropTypes.number.isRequired,
  };

  MapboxLayerConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  MapboxLayerConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    moveContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  MapboxLayerConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return MapboxLayerConnectedComponent;
}

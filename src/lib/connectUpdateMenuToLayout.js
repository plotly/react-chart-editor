import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EditorControlsContext} from '../context';

export default function connectUpdateMenuToLayout(WrappedComponent) {
  class UpdateMenuConnectedComponent extends Component {
    constructor(props) {
      super(props);
      this.updateUpdateMenu = this.updateUpdateMenu.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props) {
      const {updateMenuIndex, context} = props;
      const {container, fullContainer} = context;

      const updatemenus = container.updatemenus || [];
      const fullUpdateMenus = fullContainer.updatemenus || [];
      this.container = updatemenus[updateMenuIndex];
      this.fullContainer = fullUpdateMenus[updateMenuIndex];
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`updatemenus[].${attr}`),
        updateContainer: this.updateUpdateMenu,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateUpdateMenu(update) {
      const newUpdate = {};
      const {updateMenuIndex} = this.props;
      for (const key in update) {
        const newkey = `updatemenus[${updateMenuIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  UpdateMenuConnectedComponent.displayName = `UpdateMenuConnected${getDisplayName(
    WrappedComponent
  )}`;

  UpdateMenuConnectedComponent.propTypes = {
    updateMenuIndex: PropTypes.number.isRequired,
  };

  UpdateMenuConnectedComponent.contextType = EditorControlsContext;

  UpdateMenuConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  UpdateMenuConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return UpdateMenuConnectedComponent;
}

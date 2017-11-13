import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from '../constants';

export default function connectLayoutToPlot(WrappedComponent) {
  class LayoutConnectedComponent extends Component {
    constructor(props) {
      super(props);

      this.updateContainer = this.updateContainer.bind(this);
    }

    getChildContext() {
      const {layout, fullLayout, plotly} = this.context;
      return {
        getValObject: attr =>
          plotly.PlotSchema.getLayoutValObject(
            fullLayout,
            nestedProperty({}, attr).parts
          ),
        updateContainer: this.updateContainer,
        container: layout,
        fullContainer: fullLayout,
      };
    }

    updateContainer(update) {
      this.context.onUpdate &&
        this.context.onUpdate({
          type: EDITOR_ACTIONS.UPDATE_LAYOUT,
          payload: {
            update,
          },
        });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  LayoutConnectedComponent.displayName = `LayoutConnected${getDisplayName(
    WrappedComponent
  )}`;

  LayoutConnectedComponent.contextTypes = {
    layout: PropTypes.object,
    fullLayout: PropTypes.object,
    plotly: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
  };

  LayoutConnectedComponent.childContextTypes = {
    getValObject: PropTypes.func,
    updateContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  return LayoutConnectedComponent;
}

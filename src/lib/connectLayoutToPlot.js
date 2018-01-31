import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {getDisplayName, unpackPlotProps} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export const getLayoutContext = context => {
  const {layout, fullLayout, plotly, onUpdate} = context;

  const updateContainer = update => {
    if (!onUpdate) {
      return;
    }
    onUpdate({
      type: EDITOR_ACTIONS.UPDATE_LAYOUT,
      payload: {
        update,
      },
    });
  };

  let getValObject;
  if (plotly) {
    getValObject = attr =>
      plotly.PlotSchema.getLayoutValObject(
        fullLayout,
        nestedProperty({}, attr).parts
      );
  }

  return {
    getValObject,
    updateContainer,
    container: layout,
    fullContainer: fullLayout,
  };
};

export default function connectLayoutToPlot(WrappedComponent, config = {}) {
  class LayoutConnectedComponent extends Component {
    static supplyPlotProps(props, context) {
      if (config.supplyPlotProps) {
        return config.supplyPlotProps(props, context);
      }
      if (WrappedComponent.supplyPlotProps) {
        return WrappedComponent.supplyPlotProps(props, context);
      }
      return unpackPlotProps(props, context);
    }

    // Run the inner modifications first and allow more recent modifyPlotProp
    // config function to modify last.
    static modifyPlotProps(props, context, plotProps) {
      if (WrappedComponent.modifyPlotProps) {
        WrappedComponent.modifyPlotProps(props, context, plotProps);
      }
      if (config.modifyPlotProps) {
        config.modifyPlotProps(props, context, plotProps);
      }
    }

    getChildContext() {
      return getLayoutContext(this.context);
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
    plotly: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  LayoutConnectedComponent.childContextTypes = {
    getValObject: PropTypes.func,
    updateContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  const {plotly_editor_traits} = WrappedComponent;
  LayoutConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return LayoutConnectedComponent;
}

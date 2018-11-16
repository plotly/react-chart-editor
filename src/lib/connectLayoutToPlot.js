import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';
import {EditorControlsContext} from '../context';
import {recursiveMap} from './recursiveMap';
// import PropTypes from "prop-types";

// localize: PropTypes.func,
//     data: PropTypes.array,
//     fullData: PropTypes.array,
//     fullLayout: PropTypes.object,
//     getValObject: PropTypes.func,
//     graphDiv: PropTypes.object,
//     layout: PropTypes.object,
//     plotly: PropTypes.object,
//     onUpdate: PropTypes.func,

export default function connectLayoutToPlot(WrappedComponent) {
  class LayoutConnectedComponent extends Component {
    // getChildContext() {
    //   const {layout, fullLayout, plotly, onUpdate} = this.context;
    //
    //   const updateContainer = update => {
    //     if (!onUpdate) {
    //       return;
    //     }
    //     onUpdate({
    //       type: EDITOR_ACTIONS.UPDATE_LAYOUT,
    //       payload: {
    //         update,
    //       },
    //     });
    //   };
    //
    //   return {
    //     getValObject: attr =>
    //       !plotly
    //         ? null
    //         : plotly.PlotSchema.getLayoutValObject(fullLayout, nestedProperty({}, attr).parts),
    //     updateContainer,
    //     container: layout,
    //     fullContainer: fullLayout,
    //   };
    // }

    provideValue() {
      const {
        layout,
        fullLayout,
        plotly,
        onUpdate,
        localize,
        fullData,
        graphDiv,
        data,
      } = this.context;

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

      return {
        layout,
        fullLayout,
        plotly,
        onUpdate,
        localize,
        fullData,
        data,
        graphDiv,
        getValObject: attr =>
          !plotly
            ? null
            : plotly.PlotSchema.getLayoutValObject(fullLayout, nestedProperty({}, attr).parts),
        updateContainer,
        container: layout,
        fullContainer: fullLayout,
      };
    }

    render() {
      if (this.props.children) {
        return (
          <WrappedComponent {...this.props}>
            {recursiveMap(this.props.children, this.provideValue())}
          </WrappedComponent>
        );
      }
      return <WrappedComponent {...this.props} context={this.provideValue()} />;
    }
  }

  LayoutConnectedComponent.displayName = `LayoutConnected${getDisplayName(WrappedComponent)}`;

  LayoutConnectedComponent.contextType = EditorControlsContext;

  // LayoutConnectedComponent.childContextTypes = {
  //   getValObject: PropTypes.func,
  //   updateContainer: PropTypes.func,
  //   container: PropTypes.object,
  //   fullContainer: PropTypes.object,
  // };

  const {plotly_editor_traits} = WrappedComponent;
  LayoutConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return LayoutConnectedComponent;
}

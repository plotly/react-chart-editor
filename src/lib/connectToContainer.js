import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';
import {getDisplayName} from '../lib';

export const containerConnectedContextTypes = {
  container: PropTypes.object,
  data: PropTypes.array,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  getValObject: PropTypes.func,
  graphDiv: PropTypes.object,
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  updateContainer: PropTypes.func,
};

export default function connectToContainer(WrappedComponent, config = {}) {
  class ContainerConnectedComponent extends Component {
    // The most recent supplyPlotProps is used to supply the initial plotProps.
    // This means any config routines are run before the inner components.
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

    constructor(props, context) {
      super(props, context);

      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      if (props.plotProps) {
        // If we have already been connected with plotProps and computed their
        // values then we do not need to recompute them.
        this.plotProps = props.plotProps;
      } else {
        // Otherwise, this is just a bare component (not in a section) and it needs
        // processing:
        this.plotProps = ContainerConnectedComponent.supplyPlotProps(
          props,
          context
        );
        ContainerConnectedComponent.modifyPlotProps(
          props,
          context,
          this.plotProps
        );
      }
    }

    render() {
      // Merge plotprops onto props so leaf components only need worry about
      // props. However pass plotProps as a specific prop in case inner component
      // is also wrapped by a component that `unpackPlotProps`. That way inner
      // component can skip computation as it can see plotProps is already defined.
      const {plotProps = this.plotProps, ...props} = Object.assign(
        {},
        this.plotProps,
        this.props
      );
      if (props.isVisible && props.container) {
        return <WrappedComponent {...props} plotProps={plotProps} />;
      }

      return null;
    }
  }

  ContainerConnectedComponent.displayName = `ContainerConnected${getDisplayName(
    WrappedComponent
  )}`;

  ContainerConnectedComponent.contextTypes = containerConnectedContextTypes;

  const {plotly_editor_traits} = WrappedComponent;
  ContainerConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ContainerConnectedComponent;
}

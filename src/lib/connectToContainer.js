import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';
import {getDisplayName} from '../lib';

export const containerConnectedContextTypes = {
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  getValObject: PropTypes.func,
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  updateContainer: PropTypes.func,
};

export default function connectToContainer(WrappedComponent, config = {}) {
  class ContainerConnectedComponent extends Component {
    static supplyPlotProps(props, context) {
      if (config.supplyPlotProps) {
        return config.supplyPlotProps(props, context);
      }
      if (WrappedComponent.supplyPlotProps) {
        return WrappedComponent.supplyPlotProps(props, context);
      }
      return unpackPlotProps(props, context);
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
      if (props.isVisible) {
        return <WrappedComponent {...props} plotProps={plotProps} />;
      }

      return null;
    }
  }

  ContainerConnectedComponent.displayName = `ContainerConnected${getDisplayName(
    WrappedComponent
  )}`;

  ContainerConnectedComponent.contextTypes = containerConnectedContextTypes;

  return ContainerConnectedComponent;
}

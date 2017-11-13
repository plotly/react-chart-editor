import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';
import {getDisplayName} from '../lib';

export default function connectToContainer(WrappedComponent) {
  class ContainerConnectedComponent extends Component {
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
        this.plotProps = unpackPlotProps(props, context, WrappedComponent);
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
      } else {
        return null;
      }
    }
  }

  ContainerConnectedComponent.displayName = `ContainerConnected${getDisplayName(
    WrappedComponent
  )}`;

  ContainerConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
    updateContainer: PropTypes.func,
  };

  return ContainerConnectedComponent;
}

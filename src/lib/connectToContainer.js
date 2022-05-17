import {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps, {isVisibleGivenCustomConfig} from './unpackPlotProps';
import {getDisplayName} from '../lib';

export const containerConnectedContextTypes = {
  localize: PropTypes.func,
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
  traceIndexes: PropTypes.array,
  customConfig: PropTypes.object,
  hasValidCustomConfigVisibilityRules: PropTypes.bool,
};

export default function connectToContainer(WrappedComponent, config = {}) {
  class ContainerConnectedComponent extends Component {
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

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      this.plotProps = unpackPlotProps(props, context, WrappedComponent);
      this.attr = props.attr;
      ContainerConnectedComponent.modifyPlotProps(props, context, this.plotProps);
    }

    getChildContext() {
      return {
        description: this.plotProps.description,
        attr: this.attr,
      };
    }

    render() {
      // Merge plotprops onto props so leaf components only need worry about
      // props. However pass plotProps as a specific prop in case inner component
      // is also wrapped by a component that `unpackPlotProps`. That way inner
      // component can skip computation as it can see plotProps is already defined.
      const {plotProps = this.plotProps, ...props} = Object.assign({}, this.plotProps, this.props);
      const wrappedComponentDisplayName =
        WrappedComponent && WrappedComponent.displayName ? WrappedComponent.displayName : null;

      if (
        isVisibleGivenCustomConfig(
          props.isVisible,
          props,
          this.context,
          wrappedComponentDisplayName
        )
      ) {
        return <WrappedComponent {...props} plotProps={plotProps} />;
      }

      return null;
    }
  }

  ContainerConnectedComponent.displayName = `ContainerConnected${getDisplayName(WrappedComponent)}`;

  ContainerConnectedComponent.contextTypes = containerConnectedContextTypes;
  ContainerConnectedComponent.childContextTypes = {
    description: PropTypes.string,
    attr: PropTypes.string,
  };

  const {plotly_editor_traits} = WrappedComponent;
  ContainerConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ContainerConnectedComponent;
}

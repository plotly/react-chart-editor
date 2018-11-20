import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';
import {getDisplayName} from '../lib';
import {recursiveMap} from './recursiveMap';

export const containerConnectedContextTypes = {
  // EditorControlsContext
  localize: PropTypes.func,
  data: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  getValObject: PropTypes.func,
  graphDiv: PropTypes.object,
  layout: PropTypes.object,
  plotly: PropTypes.object,
  onUpdate: PropTypes.func,
  // anything context
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
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

    constructor(props) {
      super(props);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {context, ...rest} = props;

      this.plotProps = unpackPlotProps(rest, context);
      this.attr = rest.attr;
      ContainerConnectedComponent.modifyPlotProps(rest, context, this.plotProps);
    }

    provideValue() {
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
      const {context, ...rest} = this.props;
      const {plotProps = this.plotProps, ...props} = Object.assign({}, this.plotProps, rest);
      const newContext = {...context, ...this.provideValue()};

      if (props.isVisible) {
        const newProps = {...props, ...{context: newContext}};
        if (this.props.children) {
          return (
            <WrappedComponent
              {...newProps}
              attr={this.attr}
              descriptopn={this.plotProps.description}
              plotProps={plotProps}
            >
              {recursiveMap(this.props.children, newContext)}
            </WrappedComponent>
          );
        }
        return (
          <WrappedComponent
            {...newProps}
            attr={this.attr}
            descriptopn={this.plotProps.description}
            plotProps={plotProps}
          />
        );
      }

      return null;
    }
  }

  ContainerConnectedComponent.displayName = `ContainerConnected${getDisplayName(WrappedComponent)}`;
  // ContainerConnectedComponent.contextTypes = containerConnectedContextTypes;
  ContainerConnectedComponent.requireContext = containerConnectedContextTypes;
  // ContainerConnectedComponent.childContextTypes = {
  //   description: PropTypes.string,
  //   attr: PropTypes.string,
  // };

  const {plotly_editor_traits} = WrappedComponent;
  ContainerConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ContainerConnectedComponent;
}

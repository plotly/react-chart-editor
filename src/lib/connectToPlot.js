import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';

export default function connectToPlot(BaseComponent) {
  class PlotConnectedComponent extends Component {
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
        this.plotProps = unpackPlotProps(props, context, BaseComponent);
      }
    }

    render() {
      const {plotProps = this.plotProps, ...props} = Object.assign(
        {},
        this.props,
        this.plotProps
      );
      if (props.isVisible) {
        return <BaseComponent {...props} plotProps={plotProps} />;
      } else {
        return null;
      }
    }
  }

  PlotConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    getValObject: PropTypes.func,
    updateContainer: PropTypes.func,
  };

  return PlotConnectedComponent;
}

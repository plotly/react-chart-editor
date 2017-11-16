import Numeric from './Numeric';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

class CanvasSize extends Component {
  static modifyPlotProps(props, context, plotProps) {
    if (!plotProps.isVisible) {
      return;
    }
    const {fullContainer} = plotProps;
    if (fullContainer && fullContainer.autosize) {
      plotProps.isVisible = false;
    }
  }

  render() {
    return <Numeric {...this.props} />;
  }
}

CanvasSize.propTypes = {
  ...Numeric.propTypes,
};

export default connectToContainer(CanvasSize);

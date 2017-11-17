import Numeric from './Numeric';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

class AxesRange extends Component {
  static modifyPlotProps(props, context, plotProps) {
    if (!plotProps.isVisible) {
      return;
    }
    const {fullContainer} = plotProps;
    if (fullContainer && fullContainer.autorange) {
      plotProps.isVisible = false;
    }
  }

  render() {
    return <Numeric {...this.props} />;
  }
}

AxesRange.propTypes = {
  ...Numeric.propTypes,
};

AxesRange.defaultProps = {
  showArrows: false,
};

export default connectToContainer(AxesRange);

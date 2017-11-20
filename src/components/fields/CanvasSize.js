import Numeric from './Numeric';
import {connectToContainer} from '../../lib';

function modifyPlotProps(props, context, plotProps) {
  const {fullContainer} = plotProps;
  if (plotProps.isVisible && fullContainer && fullContainer.autosize) {
    plotProps.isVisible = false;
  }
}

export default connectToContainer(Numeric, {modifyPlotProps});

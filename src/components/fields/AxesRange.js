import Numeric from './Numeric';
import {connectToContainer} from '../../lib';

function modifyPlotProps(props, context, plotProps) {
  const {fullContainer} = plotProps;
  if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
    plotProps.isVisible = false;
  }
  return plotProps;
}

export default connectToContainer(Numeric, {modifyPlotProps});

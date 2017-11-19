import Numeric from './Numeric';
import {connectToContainer, unpackPlotProps} from '../../lib';

function supplyPlotProps(props, context) {
  const plotProps = unpackPlotProps(props, context);
  const {fullContainer} = plotProps;
  if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
    plotProps.isVisible = false;
  }
  return plotProps;
}

export default connectToContainer(Numeric, {supplyPlotProps});

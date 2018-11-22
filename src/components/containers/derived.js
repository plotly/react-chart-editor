import React from 'react';
import PlotlyPanel from './PlotlyPanel';
import PlotlySection from './PlotlySection';
import PropTypes from 'prop-types';

import {connectLayoutToPlot, containerConnectedContextTypes} from 'lib';

const LayoutPanel = connectLayoutToPlot(PlotlyPanel);
const LayoutSection = connectLayoutToPlot(PlotlySection);

const TraceTypeSection = props => {
  // const {fullContainer, fullData} = context;
  const {
    mode,
    traceTypes,
    context: {fullContainer, fullData},
  } = props;

  const ifConnectedToTrace =
    mode === 'trace' && fullContainer && traceTypes.includes(fullContainer.type);

  const ifConnectedToLayout =
    mode === 'layout' && fullData && fullData.some(t => traceTypes.includes(t.type));

  if (ifConnectedToTrace || ifConnectedToLayout) {
    return <PlotlySection {...props} />;
  }

  return null;
};
TraceTypeSection.requireContext = containerConnectedContextTypes;
TraceTypeSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  traceTypes: PropTypes.array,
  mode: PropTypes.string,
  context: PropTypes.any,
};

TraceTypeSection.defaultProps = {
  traceTypes: [],
  mode: 'layout',
};

export {LayoutPanel, LayoutSection, TraceTypeSection};

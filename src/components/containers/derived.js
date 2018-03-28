import React from 'react';
import PlotlyPanel from './PlotlyPanel';
import PlotlySection from './PlotlySection';
import PropTypes from 'prop-types';

import {connectLayoutToPlot, containerConnectedContextTypes} from 'lib';

const LayoutPanel = connectLayoutToPlot(PlotlyPanel);
const LayoutSection = connectLayoutToPlot(PlotlySection);

const TraceTypeSection = (props, context) => {
  const {fullContainer, fullData} = context;

  const ifConnectedToTrace =
    fullContainer && props.traceTypes.includes(fullContainer.type);

  const ifConnectedToLayout =
    fullData && fullData.some(t => props.traceTypes.includes(t.type));

  if (ifConnectedToTrace || ifConnectedToLayout) {
    return <PlotlySection {...props} />;
  }

  return null;
};

TraceTypeSection.contextTypes = containerConnectedContextTypes;
TraceTypeSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  traceTypes: PropTypes.array,
};

TraceTypeSection.defaultProps = {
  traceTypes: [],
};

export {LayoutPanel, LayoutSection, TraceTypeSection};

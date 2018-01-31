import React from 'react';
import Panel from './Panel';
import Fold from './Fold';
import Section from './Section';
import PropTypes from 'prop-types';

import {
  connectLayoutToPlot,
  connectAxesToLayout,
  containerConnectedContextTypes,
  supplyLayoutPlotProps,
} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);

const AxesFold = connectAxesToLayout(Fold);

// Special purpose Section for usage when nested inside a Trace connected container.
// supplyLayoutPlotProps overrides the trace context with a layout context.
const LayoutSectionOverride = connectLayoutToPlot(Section, {
  supplyLayoutPlotProps,
});

const TraceTypeSection = (props, context) => {
  const {fullContainer} = context;
  if (
    fullContainer &&
    fullContainer._fullInput &&
    props.traceTypes.includes(fullContainer._fullInput.type)
  ) {
    return <Section {...props} />;
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

export {AxesFold, LayoutPanel, LayoutSectionOverride, TraceTypeSection};

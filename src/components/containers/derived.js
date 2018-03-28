import React from 'react';
import Panel from './Panel';
import Section from './Section';
import PropTypes from 'prop-types';

import {connectLayoutToPlot, containerConnectedContextTypes} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);
const LayoutSection = connectLayoutToPlot(Section);

const TraceTypeSection = (props, context) => {
  const {fullContainer, fullData} = context;

  const ifConnectedToTrace =
    fullContainer && props.traceTypes.includes(fullContainer.type);

  const ifConnectedToLayout =
    fullData && fullData.some(t => props.traceTypes.includes(t.type));

  if (ifConnectedToTrace || ifConnectedToLayout) {
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

export {LayoutPanel, LayoutSection, TraceTypeSection};

import React from 'react';
import Panel from './Panel';
import Fold from './Fold';
import Section from './Section';
import PropTypes from 'prop-types';

import {
  connectLayoutToPlot,
  connectAxesToLayout,
  containerConnectedContextTypes,
} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);

const AxesFold = connectAxesToLayout(Fold);

const TraceTypeSection = (props, context) => {
  const {fullContainer} = context;
  if (fullContainer && props.traceTypes.includes(fullContainer.type)) {
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

export {AxesFold, LayoutPanel, TraceTypeSection};

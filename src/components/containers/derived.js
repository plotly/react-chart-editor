import React from 'react';
import Panel from './Panel';
import Section from './Section';
import PropTypes from 'prop-types';

import {connectLayoutToPlot, containerConnectedContextTypes} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);

const TraceTypeSection = (props, context) => {
  const {fullContainer, fullData} = context;

  const ifConnectedToTrace =
    fullContainer &&
    ((fullContainer._fullInput &&
      props.traceTypes.includes(fullContainer._fullInput.type)) ||
      props.traceTypes.includes(fullContainer.type));

  const ifConnectedToLayout =
    fullData &&
    fullData.some(
      t =>
        props.traceTypes.includes(t._fullInput.type) ||
        fullData.some(t => props.traceTypes.includes(t.type))
    );

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

export {LayoutPanel, TraceTypeSection};

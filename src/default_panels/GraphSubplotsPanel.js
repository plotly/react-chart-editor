import React from 'react';
import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  RectanglePositioner,
  AxisOverlayDropdown,
  PlotlySection,
  TraceTypeSection,
  AxisAnchorDropdown,
  AxisSide,
} from '../components';
import {TRACE_TO_AXIS} from '../lib/constants';

const GraphSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion canGroup>
    <PlotlySection name={_('Boundaries')} attr="xaxis.domain[0]">
      <AxisOverlayDropdown label={_('X Overlay')} attr="xaxis.overlaying" />
      <AxisOverlayDropdown label={_('Y Overlay')} attr="yaxis.overlaying" />
    </PlotlySection>

    <RectanglePositioner attr="domain.x[0]" />
    <RectanglePositioner attr="xaxis.domain[0]" cartesian />

    <TraceTypeSection name={_('X Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
      <AxisAnchorDropdown
        label={_('Anchor to')}
        attr="xaxis.anchor"
        clearable={false}
      />
      <AxisSide label={_('Side')} attr="xaxis.side" />
    </TraceTypeSection>
    <TraceTypeSection name={_('Y Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
      <AxisAnchorDropdown
        label={_('Anchor to')}
        attr="yaxis.anchor"
        clearable={false}
      />
      <AxisSide label={_('Side')} attr="yaxis.side" />
    </TraceTypeSection>
  </SubplotAccordion>
);

GraphSubplotsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default GraphSubplotsPanel;

import React from 'react';
import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  RectanglePositioner,
  NumericFraction,
  AxisOverlayDropdown,
  PlotlySection,
  NumericFractionDomain,
  TraceTypeSection,
  AxisAnchorDropdown,
  AxisSide,
} from '../components';
import {TRACE_TO_AXIS} from '../lib/constants';

const GraphSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion canGroup>
    {/* <RectanglePositioner attr="domain.x[0]" />
    <RectanglePositioner attr="xaxis.domain[0]" cartesian /> */}
    <NumericFraction label={_('X Start')} attr={'domain.x[0]'} />
    <NumericFraction label={_('X End')} attr={'domain.x[1]'} />
    <NumericFraction label={_('Y Start')} attr={'domain.y[0]'} />
    <NumericFraction label={_('Y End')} attr={'domain.y[1]'} />

    <PlotlySection name={_('X Boundaries')} attr="xaxis.domain[0]">
      <AxisOverlayDropdown label={_('Overlay')} attr="xaxis.overlaying" />
      <NumericFractionDomain
        label={_('Start Position')}
        attr="xaxis.domain[0]"
      />
      <NumericFractionDomain label={_('End Position')} attr="xaxis.domain[1]" />
    </PlotlySection>
    <TraceTypeSection name={_('X Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
      <AxisAnchorDropdown
        label={_('Anchor to')}
        attr="xaxis.anchor"
        clearable={false}
      />
      <AxisSide label={_('Side')} attr="xaxis.side" />
    </TraceTypeSection>
    <PlotlySection name={_('Y Boundaries')} attr="yaxis.domain[0]">
      <AxisOverlayDropdown label={_('Overlay')} attr="yaxis.overlaying" />
      <NumericFractionDomain
        label={_('Start Position')}
        attr="yaxis.domain[0]"
      />
      <NumericFractionDomain label={_('End Position')} attr="yaxis.domain[1]" />
    </PlotlySection>
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

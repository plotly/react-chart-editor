import React from 'react';
import PropTypes from 'prop-types';
import {
  ShapeAccordion,
  Radio,
  PlotlySection,
  PositioningRef,
  PositioningNumeric,
  Numeric,
  NumericFraction,
  ColorPicker,
  LineDashSelector,
} from '../components';

import {localize} from '../lib';

const StyleShapesPanel = ({localize: _}) => (
  <ShapeAccordion canAdd>
    <Radio
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <Radio
      attr="type"
      options={[
        {label: _('Line'), value: 'line'},
        {label: _('Rectangle'), value: 'rect'},
        {label: _('Ellipse'), value: 'circle'},
      ]}
    />

    <PlotlySection name={_('Horizontal Boundaries')}>
      <PositioningRef label={_('Relative to')} attr="xref" />
      <PositioningNumeric label={_('Start Point')} attr="x0" />
      <PositioningNumeric label={_('End Point')} attr="x1" />
    </PlotlySection>

    <PlotlySection name={_('Vertical Boundaries')}>
      <PositioningRef label={_('Relative to')} attr="yref" />
      <PositioningNumeric label={_('Start Point')} attr="y0" />
      <PositioningNumeric label={_('End Point')} attr="y1" />
    </PlotlySection>
    <PlotlySection name={_('Lines')}>
      <Numeric label={_('Width')} attr="line.width" />
      <ColorPicker label={_('Line Color')} attr="line.color" />
      <LineDashSelector label={_('Type')} attr="line.dash" />
    </PlotlySection>
    <PlotlySection name={_('Fill')}>
      <ColorPicker label={_('Color')} attr="fillcolor" />
      <NumericFraction label={_('Opacity')} attr="opacity" />
    </PlotlySection>
  </ShapeAccordion>
);

StyleShapesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleShapesPanel);

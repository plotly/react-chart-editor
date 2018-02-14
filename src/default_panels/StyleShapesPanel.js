import React from 'react';
import PropTypes from 'prop-types';
import {
  ShapeAccordion,
  Radio,
  Section,
  PositioningRef,
  Numeric,
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

    <Section name={_('Horizontal Boundaries')}>
      <PositioningRef label={_('Relative to')} attr="xref" />
      <Numeric label={_('Start Point')} attr="x0" />
      <Numeric label={_('End Point')} attr="x1" />
    </Section>

    <Section name={_('Vertical Boundaries')}>
      <PositioningRef label={_('Relative to')} attr="yref" />
      <Numeric label={_('Start Point')} attr="y0" />
      <Numeric label={_('End Point')} attr="y1" />
    </Section>
    <Section name={_('Lines')}>
      <Numeric label={_('Width')} attr="line.width" />
      <ColorPicker label={_('Line Color')} attr="line.color" />
      <LineDashSelector label={_('Type')} attr="line.dash" />
    </Section>
    <Section name={_('Fill')}>
      <ColorPicker label={_('Color')} attr="fillcolor" />
      <Numeric label={_('Opacity')} step={0.1} attr="opacity" />
    </Section>
  </ShapeAccordion>
);

StyleShapesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleShapesPanel);

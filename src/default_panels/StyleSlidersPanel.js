import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  Dropdown,
  FontSelector,
  Numeric,
  Radio,
  Section,
  SliderAccordion,
} from '../components';

import {localize} from '../lib';

const StyleSlidersPanel = ({localize: _}) => (
  <SliderAccordion>
    <Radio
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <Section name={_('Transition')}>
      <Numeric
        label={_('Duration ')}
        attr="transition.duration"
        showSlider
        max={300}
        min={0}
      />
      <Dropdown
        label={_('Type')}
        clearable={false}
        attr="transition.easing"
        options={[
          {label: _('Linear'), value: 'linear'},
          {label: _('Linear In'), value: 'linear-in'},
          {label: _('Linear In Out'), value: 'linear-in-out'},
          {label: _('Quad'), value: 'quad'},
          {label: _('Quad In'), value: 'quad-in'},
          {label: _('Quad In Out'), value: 'quad-in-out'},
          {label: _('Cubic'), value: 'cubic'},
          {label: _('Cubic In'), value: 'cubic-in'},
          {label: _('Cubic In Out'), value: 'cubic-in-out'},
          {label: _('Sin'), value: 'sin'},
          {label: _('Sin In'), value: 'sin-in'},
          {label: _('Sin In Out'), value: 'sin-in-out'},
          {label: _('Exponential'), value: 'exp'},
          {label: _('Exponential In'), value: 'exp-in'},
          {label: _('Exponential In Out'), value: 'exp-in-out'},
          {label: _('Circle'), value: 'circle'},
          {label: _('Circle In'), value: 'circle-in'},
          {label: _('Circle In Out'), value: 'circle-in-out'},
          {label: _('Elastic'), value: 'elastic'},
          {label: _('Elastic Out'), value: 'elastic-out'},
          {label: _('Elastic In Out'), value: 'elastic-in-out'},
          {label: _('Back'), value: 'back'},
          {label: _('Back Out'), value: 'back-out'},
          {label: _('Back In Out'), value: 'back-in-out'},
          {label: _('Bounce'), value: 'bounce'},
          {label: _('Bounce Out'), value: 'bounce-out'},
          {label: _('Bounce In Out'), value: 'bounce-in-out'},
          {label: _('Cubic In Out'), value: 'cubic-in-out'},
        ]}
      />
    </Section>
    <Section name={_('Background')}>
      <ColorPicker label={_('Color')} attr="bgcolor" />
      <ColorPicker label={_('Active Color')} attr="activebgcolor" />
    </Section>
    <Section name={_('Border')}>
      <Numeric label={_('Width')} attr="borderwidth" />
      <ColorPicker label={_('Color')} attr="bordercolor" />
    </Section>
    <Section name={_('Font')}>
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Size')} attr="font.size" />
      <ColorPicker label={_('Color')} attr="font.color" />
    </Section>
    <Section name={_('Padding')}>
      <Numeric label={_('Top')} attr="pad.t" showSlider />
      <Numeric label={_('Bottom')} attr="pad.b" showSlider />
      <Numeric label={_('Left')} attr="pad.l" showSlider />
      <Numeric label={_('Right')} attr="pad.r" showSlider />
    </Section>
    <Section name={_('Ticks')}>
      <ColorPicker label={_('Color')} attr="tickcolor" />
      <Numeric label={_('Legth')} attr="ticklen" />
      <Numeric label={_('Width')} attr="tickwidth" />
    </Section>
  </SliderAccordion>
);

StyleSlidersPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleSlidersPanel);

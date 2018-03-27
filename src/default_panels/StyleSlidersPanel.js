import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Numeric,
  Radio,
  PlotlySection,
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
    <PlotlySection name={_('Background')}>
      <ColorPicker label={_('Color')} attr="bgcolor" />
      <ColorPicker label={_('Active Color')} attr="activebgcolor" />
    </PlotlySection>
    <PlotlySection name={_('Border')}>
      <Numeric label={_('Width')} attr="borderwidth" />
      <ColorPicker label={_('Color')} attr="bordercolor" />
    </PlotlySection>
    <PlotlySection name={_('Font')}>
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Size')} attr="font.size" />
      <ColorPicker label={_('Color')} attr="font.color" />
    </PlotlySection>
    <PlotlySection name={_('Padding')}>
      <Numeric label={_('Top')} attr="pad.t" showSlider />
      <Numeric label={_('Bottom')} attr="pad.b" showSlider />
      <Numeric label={_('Left')} attr="pad.l" showSlider />
      <Numeric label={_('Right')} attr="pad.r" showSlider />
    </PlotlySection>
    <PlotlySection name={_('Ticks')}>
      <ColorPicker label={_('Color')} attr="tickcolor" />
      <Numeric label={_('Legth')} attr="ticklen" />
      <Numeric label={_('Width')} attr="tickwidth" />
    </PlotlySection>
  </SliderAccordion>
);

StyleSlidersPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleSlidersPanel);

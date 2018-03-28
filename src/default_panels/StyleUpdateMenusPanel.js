import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Numeric,
  Radio,
  PlotlySection,
  UpdateMenuAccordion,
  UpdateMenuButtons,
} from '../components';

import {localize} from '../lib';

const StyleUpdateMenusPanel = ({localize: _}) => (
  <UpdateMenuAccordion>
    <Radio
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <PlotlySection name={_('Button Labels')}>
      <UpdateMenuButtons attr="buttons" />
    </PlotlySection>
    <PlotlySection name={_('Background')}>
      <ColorPicker label={_('Color')} attr="bgcolor" />
    </PlotlySection>
    <PlotlySection name={_('Font')}>
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Size')} attr="font.size" />
      <ColorPicker label={_('Color')} attr="font.color" />
    </PlotlySection>
    <PlotlySection name={_('Border')}>
      <Numeric label={_('Width')} attr="borderwidth" />
      <ColorPicker label={_('Color')} attr="bordercolor" />
    </PlotlySection>
    <PlotlySection name={_('Padding')}>
      <Numeric label={_('Top')} attr="pad.t" showSlider />
      <Numeric label={_('Bottom')} attr="pad.b" showSlider />
      <Numeric label={_('Left')} attr="pad.l" showSlider />
      <Numeric label={_('Right')} attr="pad.r" showSlider />
    </PlotlySection>
  </UpdateMenuAccordion>
);

StyleUpdateMenusPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleUpdateMenusPanel);

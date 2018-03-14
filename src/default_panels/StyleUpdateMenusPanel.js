import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Numeric,
  Radio,
  Section,
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
    <Section name={_('Button Labels')}>
      <UpdateMenuButtons attr="buttons" />
    </Section>
    <Section name={_('Background')}>
      <ColorPicker label={_('Color')} attr="bgcolor" />
    </Section>
    <Section name={_('Font')}>
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Size')} attr="font.size" />
      <ColorPicker label={_('Color')} attr="font.color" />
    </Section>
    <Section name={_('Border')}>
      <Numeric label={_('Width')} attr="borderwidth" />
      <ColorPicker label={_('Color')} attr="bordercolor" />
    </Section>
    <Section name={_('Padding')}>
      <Numeric label={_('Top')} attr="pad.t" showSlider />
      <Numeric label={_('Bottom')} attr="pad.b" showSlider />
      <Numeric label={_('Left')} attr="pad.l" showSlider />
      <Numeric label={_('Right')} attr="pad.r" showSlider />
    </Section>
  </UpdateMenuAccordion>
);

StyleUpdateMenusPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleUpdateMenusPanel);

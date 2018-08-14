import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Numeric,
  PlotlySection,
  UpdateMenuAccordion,
  UpdateMenuButtons,
  VisibilitySelect,
} from '../components';

const StyleUpdateMenusPanel = (props, {localize: _}) => (
  <UpdateMenuAccordion>
    <VisibilitySelect
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
      showOn={true}
    >
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
        <Numeric label={_('Top')} attr="pad.t" units="px" />
        <Numeric label={_('Bottom')} attr="pad.b" units="px" />
        <Numeric label={_('Left')} attr="pad.l" units="px" />
        <Numeric label={_('Right')} attr="pad.r" units="px" />
      </PlotlySection>
    </VisibilitySelect>
  </UpdateMenuAccordion>
);

StyleUpdateMenusPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleUpdateMenusPanel;

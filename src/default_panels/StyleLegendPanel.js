import React from 'react';
import PropTypes from 'prop-types';
import {
  PlotlyFold,
  Radio,
  PlotlySection,
  TraceRequiredPanel,
  TextEditor,
} from '../components';

const StyleLegendPanel = (props, {localize: _}) => (
  <TraceRequiredPanel>
    <PlotlyFold name={_('Legend')}>
      <Radio
        attr="showlegend"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <PlotlySection name={_('Legend Title')}>
        <TextEditor label={_('Text')} attr="legend.title.text" richTextOnly />
      </PlotlySection>
    </PlotlyFold>
  </TraceRequiredPanel>
);

StyleLegendPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleLegendPanel;

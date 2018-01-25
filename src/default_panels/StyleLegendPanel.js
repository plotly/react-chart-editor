import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Fold,
  Info,
  Numeric,
  Radio,
  Section,
  MenuPanel,
  TraceRequiredPanel,
} from '../components';

import {localize} from '../lib';

const StyleLegendPanel = ({localize: _}) => (
  <TraceRequiredPanel>
    <Fold hideHeader>
      <Section name={_('Legend')}>
        <Radio
          attr="showlegend"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
      </Section>
      <Section name={_('Text')}>
        <FontSelector label={_('Typeface')} attr="legend.font.family" />
        <Numeric label={_('Size')} attr="legend.font.size" units="px" />
        <ColorPicker label={_('Color')} attr="legend.font.color" />
      </Section>
      <Section name={_('Legend Box')}>
        <Numeric
          label={_('Border Width')}
          attr="legend.borderwidth"
          units="px"
        />
        <ColorPicker label={_('Border Color')} attr="legend.bordercolor" />
        <ColorPicker label={_('Background Color')} attr="legend.bgcolor" />
      </Section>
      <Section name={_('Positioning')}>
        <MenuPanel>
          <Section name={_('Anchor Point')}>
            <Info>
              {_(
                'The positioning inputs are relative to the ' +
                  'anchor points on the text box.'
              )}
            </Info>
            <Radio
              attr="legend.xanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Left'), value: 'left'},
                {label: _('Center'), value: 'center'},
                {label: _('Right'), value: 'right'},
              ]}
            />
            <Radio
              attr="legend.yanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Top'), value: 'top'},
                {label: _('Middle'), value: 'middle'},
                {label: _('Bottom'), value: 'bottom'},
              ]}
            />
          </Section>
        </MenuPanel>
        <Numeric
          label={_('X Position')}
          step={0.01}
          attr="legend.x"
          units="px"
        />
        <Numeric
          label={_('Y Position')}
          step={0.01}
          attr="legend.y"
          units="px"
        />
      </Section>
      <Section name={_('Orientation')}>
        <Radio
          attr="legend.orientation"
          options={[
            {label: _('Vertical'), value: 'v'},
            {label: _('Horizontal'), value: 'h'},
          ]}
        />
      </Section>
      <Section name={_('Trace Order')}>
        <Radio
          attr="legend.traceorder"
          options={[
            {label: _('Normal'), value: 'normal'},
            {label: _('Reversed'), value: 'reversed'},
          ]}
        />
      </Section>
    </Fold>
  </TraceRequiredPanel>
);

StyleLegendPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleLegendPanel);

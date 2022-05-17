import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  Numeric,
  Radio,
  PlotlySection,
  Dropdown,
  SliderAccordion,
} from '../components';

const StyleSlidersPanel = (props, {localize: _}) => (
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
    <PlotlySection name={_('Length')} attr={'len'}>
      <Numeric label={_('Length')} attr={'len'} step={0.02} />
      <Dropdown
        label={_('Length Mode')}
        attr={'lenmode'}
        options={[
          {label: _('Fraction of canvas'), value: 'fraction'},
          {label: _('Pixels'), value: 'pixels'},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Horizontal Positioning')} attr={'x'}>
      <Numeric label={_('Position')} attr={'x'} showSlider step={0.02} />
      <Radio
        label={_('Anchor')}
        attr={'xanchor'}
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Vertical Positioning')} attr={'y'}>
      <Numeric label={_('Position')} attr={'y'} showSlider step={0.02} />
      <Radio
        label={_('Anchor')}
        attr={'yanchor'}
        options={[
          {label: _('Top'), value: 'top'},
          {label: _('Middle'), value: 'middle'},
          {label: _('Bottom'), value: 'bottom'},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Padding')}>
      <Numeric label={_('Top')} attr="pad.t" units="px" />
      <Numeric label={_('Bottom')} attr="pad.b" units="px" />
      <Numeric label={_('Left')} attr="pad.l" units="px" />
      <Numeric label={_('Right')} attr="pad.r" units="px" />
    </PlotlySection>
    <PlotlySection name={_('Ticks')}>
      <ColorPicker label={_('Color')} attr="tickcolor" />
      <Numeric label={_('Length')} attr="ticklen" />
      <Numeric label={_('Width')} attr="tickwidth" />
    </PlotlySection>
  </SliderAccordion>
);

StyleSlidersPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleSlidersPanel;

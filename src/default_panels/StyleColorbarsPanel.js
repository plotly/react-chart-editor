import PropTypes from 'prop-types';

import {
  Radio,
  TextEditor,
  TraceAccordion,
  Numeric,
  PlotlyFold,
  PlotlyPanel,
  PlotlySection,
  Dropdown,
  DropdownCustom,
  FontSelector,
  ColorPicker,
  VisibilitySelect,
  NumericOrDate,
  AxisInterval,
} from '../components';

export const traceHasColorbar = (trace, fullTrace) =>
  (fullTrace.marker && fullTrace.marker.showscale !== undefined) || // eslint-disable-line no-undefined
  fullTrace.showscale !== undefined; // eslint-disable-line no-undefined

const StyleColorBarsPanel = (props, {localize: _}) => {
  return (
    <TraceAccordion traceFilterCondition={traceHasColorbar}>
      {['', 'marker.'].map((prefix) => {
        return (
          <VisibilitySelect
            attr={prefix + 'showscale'}
            key={'x' + prefix}
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
            showOn={true}
          >
            <PlotlyPanel key={prefix + ' panel'}>
              <PlotlyFold name={_('Title')}>
                <TextEditor attr={prefix + 'colorbar.title.text'} />

                <Dropdown
                  label={_('Location')}
                  attr={prefix + 'colorbar.title.side'}
                  options={[
                    {label: _('Top'), value: 'top'},
                    {label: _('Right'), value: 'right'},
                    {label: _('Bottom'), value: 'bottom'},
                  ]}
                />
                <FontSelector label={_('Typeface')} attr={prefix + 'colorbar.title.font.family'} />
                <Numeric
                  label={_('Font Size')}
                  attr={prefix + 'colorbar.title.font.size'}
                  units="px"
                />
                <ColorPicker label={_('Font Color')} attr={prefix + 'colorbar.title.font.color'} />
              </PlotlyFold>
              <PlotlyFold name={_('Size and Positioning')}>
                <PlotlySection name={_('Size')} attr={prefix + 'colorbar.len'}>
                  <Numeric label={_('Height')} attr={prefix + 'colorbar.len'} />

                  <Radio
                    attr={prefix + 'colorbar.lenmode'}
                    options={[
                      {label: _('Fraction of Plot'), value: 'fraction'},
                      {label: _('Pixels'), value: 'pixels'},
                    ]}
                  />

                  <Numeric label={_('Width')} attr={prefix + 'colorbar.thickness'} />

                  <Radio
                    attr={prefix + 'colorbar.thicknessmode'}
                    options={[
                      {label: _('Fraction of Plot'), value: 'fraction'},
                      {label: _('Pixels'), value: 'pixels'},
                    ]}
                  />
                </PlotlySection>
                <PlotlySection name={_('Horizontal Positioning')} attr={prefix + 'colorbar.x'}>
                  <Numeric
                    label={_('Position')}
                    attr={prefix + 'colorbar.x'}
                    showSlider
                    step={0.02}
                  />
                  <Dropdown
                    label={_('Anchor')}
                    attr={prefix + 'colorbar.xanchor'}
                    options={[
                      {label: _('Left'), value: 'left'},
                      {label: _('Center'), value: 'center'},
                      {label: _('Right'), value: 'right'},
                    ]}
                  />
                </PlotlySection>
                <PlotlySection name={_('Vertical Positioning')} attr={prefix + 'colorbar.y'}>
                  <Numeric
                    label={_('Position')}
                    attr={prefix + 'colorbar.y'}
                    showSlider
                    step={0.02}
                  />
                  <Dropdown
                    label={_('Anchor')}
                    attr={prefix + 'colorbar.yanchor'}
                    options={[
                      {label: _('Top'), value: 'top'},
                      {label: _('Middle'), value: 'middle'},
                      {label: _('Bottom'), value: 'bottom'},
                    ]}
                  />
                </PlotlySection>
                <PlotlySection name={_('Padding')} attr={prefix + 'colorbar.xpad'}>
                  <Numeric label={_('Vertical')} attr={prefix + 'colorbar.ypad'} units="px" />
                  <Numeric label={_('Horizontal')} attr={prefix + 'colorbar.xpad'} units="px" />
                </PlotlySection>
              </PlotlyFold>
              <PlotlyFold name={_('Labels')}>
                <VisibilitySelect
                  attr={prefix + 'colorbar.showticklabels'}
                  options={[
                    {label: _('Show'), value: true},
                    {label: _('Hide'), value: false},
                  ]}
                  showOn={true}
                  defaultOpt={true}
                >
                  <FontSelector label={_('Typeface')} attr={prefix + 'colorbar.tickfont.family'} />
                  <Numeric
                    label={_('Font Size')}
                    attr={prefix + 'colorbar.tickfont.size'}
                    units="px"
                  />
                  <ColorPicker label={_('Font Color')} attr={prefix + 'colorbar.tickfont.color'} />
                  <Dropdown
                    label={_('Angle')}
                    attr={prefix + 'colorbar.tickangle'}
                    clearable={false}
                    options={[
                      {label: _('Auto'), value: 'auto'},
                      {label: _('45'), value: 45},
                      {label: _('90'), value: 90},
                      {label: _('135'), value: 135},
                      {label: _('180'), value: 180},
                    ]}
                  />
                  <Dropdown
                    label={_('Exponents')}
                    attr={prefix + 'colorbar.exponentformat'}
                    clearable={false}
                    options={[
                      {label: _('None'), value: '000'},
                      {label: _('e+6'), value: 'e'},
                      {label: _('E+6'), value: 'E'},
                      {label: _('x10^6'), value: 'power'},
                      {label: _('k/M/G'), value: 'SI'},
                      {label: _('k/M/B'), value: 'B'},
                    ]}
                  />
                  <DropdownCustom
                    label={_('Label Prefix')}
                    attr={prefix + 'colorbar.tickprefix'}
                    options={[
                      {label: _('None'), value: ''},
                      {label: _('x'), value: 'x'},
                      {label: _('$'), value: '$'},
                      {label: _('#'), value: '#'},
                      {label: _('@'), value: '@'},
                      {label: _('Custom'), value: 'custom'},
                    ]}
                    customOpt="custom"
                    dafaultOpt=""
                    clearable={false}
                  />
                  <Dropdown
                    label={_('Show Prefix')}
                    attr={prefix + 'colorbar.showtickprefix'}
                    options={[
                      {label: _('Every label'), value: 'all'},
                      {label: _('First label'), value: 'first'},
                      {label: _('Last label'), value: 'last'},
                      {label: _('None label'), value: 'none'},
                    ]}
                  />

                  <DropdownCustom
                    label={_('Label Suffix')}
                    attr={prefix + 'colorbar.ticksuffix'}
                    options={[
                      {label: _('None'), value: ''},
                      {label: _('C'), value: 'C'},
                      {label: _('%'), value: '%'},
                      {label: _('^'), value: '^'},
                      {label: _('Custom'), value: 'custom'},
                    ]}
                    customOpt="custom"
                    dafaultOpt=""
                    clearable={false}
                  />
                  <Dropdown
                    label={_('Show Suffix')}
                    attr={prefix + 'colorbar.showticksuffix'}
                    options={[
                      {label: _('Every label'), value: 'all'},
                      {label: _('First label'), value: 'first'},
                      {label: _('Last label'), value: 'last'},
                      {label: _('None label'), value: 'none'},
                    ]}
                  />
                  <Radio
                    attr={prefix + 'colorbar.tickmode'}
                    options={[
                      {label: _('Auto'), value: 'auto'},
                      {label: _('Custom'), value: 'linear'},
                    ]}
                    label={_('Tick spacing')}
                  />

                  <NumericOrDate label={_('Step Offset')} attr={prefix + 'colorbar.tick0'} />
                  <AxisInterval label={_('Step Size')} attr={prefix + 'colorbar.dtick'} />
                  <Numeric label={_('Max Number of Labels')} attr={prefix + 'colorbar.nticks'} />
                </VisibilitySelect>
              </PlotlyFold>
              <PlotlyFold name={_('Ticks')}>
                <VisibilitySelect
                  attr={prefix + 'colorbar.ticks'}
                  options={[
                    {label: _('Inside'), value: 'inside'},
                    {label: _('Outside'), value: 'outside'},
                    {label: _('Hide'), value: ''},
                  ]}
                  showOn={['inside', 'outside']}
                  defaultOpt={''}
                >
                  <Numeric label={_('Length')} attr={prefix + 'colorbar.ticklen'} units="px" />
                  <Numeric label={_('Width')} attr={prefix + 'colorbar.tickwidth'} units="px" />
                  <ColorPicker label={_('Color')} attr={prefix + 'colorbar.tickcolor'} />
                  <Radio
                    attr={prefix + 'colorbar.tickmode'}
                    options={[
                      {label: _('Auto'), value: 'auto'},
                      {label: _('Custom'), value: 'linear'},
                    ]}
                    label={_('Tick spacing')}
                  />

                  <NumericOrDate label={_('Step Offset')} attr={prefix + 'colorbar.tick0'} />
                  <AxisInterval label={_('Step Size')} attr={prefix + 'colorbar.dtick'} />
                  <Numeric label={_('Max Number of Labels')} attr={prefix + 'colorbar.nticks'} />
                </VisibilitySelect>
              </PlotlyFold>
              <PlotlyFold name={_('Borders and Background')}>
                <PlotlySection name={_('Color Bar')} attr={prefix + 'colorbar.outlinewidth'}>
                  <Numeric label={_('Border Width')} attr={prefix + 'colorbar.outlinewidth'} />
                  <ColorPicker label={_('Border Color')} attr={prefix + 'colorbar.outlinecolor'} />
                </PlotlySection>
                <PlotlySection name={_('Color Bar Container')} attr={prefix + 'colorbar.bgcolor'}>
                  <ColorPicker label={_('Background Color')} attr={prefix + 'colorbar.bgcolor'} />
                  <Numeric label={_('Border Width')} attr={prefix + 'colorbar.borderwidth'} />
                  <ColorPicker label={_('Border Color')} attr={prefix + 'colorbar.bordercolor'} />
                </PlotlySection>
              </PlotlyFold>
            </PlotlyPanel>
          </VisibilitySelect>
        );
      })}
    </TraceAccordion>
  );
};

StyleColorBarsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleColorBarsPanel;

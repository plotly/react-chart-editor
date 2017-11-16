import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AxesSelector,
  AxesRange,
  ColorPicker,
  DataSelector,
  Dropdown,
  Flaglist,
  Fold,
  Info,
  Numeric,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  MenuPanel,
  SymbolSelector,
  TraceAccordion,
  TraceMarkerSection,
  TraceSelector,
} from './components';
import {DEFAULT_FONTS} from './constants';
import {localize, connectAxesToLayout, connectLayoutToPlot} from './lib';

const LayoutPanel = connectLayoutToPlot(Panel);
const AxesFold = connectAxesToLayout(Fold);

class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);

    const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);

    // Filter out Polar "area" type as it is fairly broken and we want to present
    // scatter with fill as an "area" chart type for convenience.
    const traceTypes = Object.keys(context.plotSchema.traces).filter(
      t => t !== 'area'
    );

    const labels = traceTypes.map(capitalize);
    this.traceOptions = traceTypes.map((t, i) => ({
      label: labels[i],
      value: t,
    }));

    const i = this.traceOptions.findIndex(opt => opt.value === 'scatter');
    this.traceOptions.splice(
      i + 1,
      0,
      {label: 'Line', value: 'line'},
      {label: 'Area', value: 'area'}
    );
  }

  render() {
    const _ = this.props.localize;

    return (
      <PanelMenuWrapper>
        <Panel group="Graph" name="Create">
          <TraceAccordion canAdd>
            <TraceSelector
              label="Plot Type"
              attr="type"
              clearable={false}
              options={this.traceOptions}
              show
            />

            <DataSelector
              label="Labels"
              attr="labels"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Values"
              attr="values"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="X"
              attr="x"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Y"
              attr="y"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Z"
              attr="z"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />
          </TraceAccordion>
        </Panel>

        <Panel group="Style" name="Traces">
          <TraceAccordion>
            <Section name={_('Trace')}>
              <Numeric label={_('Opacity')} step={0.1} attr="opacity" />
            </Section>

            <Section name={_('Display')}>
              <Flaglist
                attr="mode"
                options={[
                  {label: 'Lines', value: 'lines'},
                  {label: 'Points', value: 'markers'},
                ]}
              />
            </Section>

            <Section name={_('Filled Area')}>
              <Dropdown
                label="Fill to"
                attr="fill"
                clearable={false}
                options={[
                  {label: 'None', value: 'none'},
                  {label: 'Y = 0', value: 'tozeroy'},
                  {label: 'X = 0', value: 'tozerox'},
                  {label: 'Previous Y', value: 'tonexty'},
                  {label: 'Previous X', value: 'tonextx'},
                ]}
              />

              <ColorPicker label={_('Color')} attr="fillcolor" />
            </Section>

            <TraceMarkerSection>
              <Radio
                attr="orientation"
                options={[
                  {label: _('Vertical'), value: 'v'},
                  {label: _('Horizontal'), value: 'h'},
                ]}
              />
              <ColorPicker label={_('Color')} attr="marker.color" />
              <Numeric label={_('Opacity')} step={0.1} attr="marker.opacity" />
              <Numeric label={_('Size')} attr="marker.size" />
              <SymbolSelector label={_('Symbol')} attr="marker.symbol" />
              <Numeric label={_('Border Width')} attr="marker.line.width" />
              <ColorPicker label={_('Border Color')} attr="marker.line.color" />
            </TraceMarkerSection>

            <Section name={_('Lines')}>
              <Numeric label={_('Width')} step={1.0} attr="line.width" />
              <ColorPicker label={_('Line Color')} attr="line.color" />
              <Radio
                label={_('Connect Gaps')}
                attr="connectgaps"
                options={[
                  {label: _('Connect'), value: true},
                  {label: _('Blank'), value: false},
                ]}
              />
            </Section>
          </TraceAccordion>
        </Panel>

        <LayoutPanel group="Style" name={_('Layout')}>
          <Fold name={_('Canvas')}>
            <Numeric
              label={_('Fixed Width')}
              step={1}
              attr="width"
              postfix="px"
            />
          </Fold>
        </LayoutPanel>

        <LayoutPanel group="Style" name={_('Axes')}>
          <AxesFold name={_('Titles')}>
            <AxesSelector />
            <Dropdown
              label={_('Typeface')}
              attr="font.family"
              clearable={false}
              options={[...DEFAULT_FONTS]}
            />
            <Numeric label={_('Size')} step={1} attr="font.size" postfix="px" />
            <ColorPicker label={_('Color')} attr="font.color" />
          </AxesFold>

          <AxesFold name={_('Range')}>
            <AxesSelector />
            <Section name={_('Selection')}>
              <Radio
                attr="autorange"
                options={[
                  {label: _('Auto'), value: true},
                  {label: _('Custom'), value: false},
                ]}
              />
              <AxesRange label={_('Min')} attr="range[0]" />
              <AxesRange label={_('Max')} attr="range[1]" />
              <Radio
                attr="type"
                options={[
                  {label: _('Linear'), value: 'linear'},
                  {label: _('log'), value: 'log'},
                ]}
              />
            </Section>
          </AxesFold>

          <AxesFold name={_('Lines')}>
            <AxesSelector />
          </AxesFold>
          <AxesFold name={_('Tick Labels')}>
            <AxesSelector />
          </AxesFold>
          <AxesFold name={_('Tick Markers')}>
            <AxesSelector />
          </AxesFold>
          <AxesFold name={_('Zoom Interactivity')}>
            <AxesSelector />
          </AxesFold>
          <AxesFold name={_('Layout')}>
            <AxesSelector />
          </AxesFold>
        </LayoutPanel>

        <LayoutPanel group="Style" name={_('Legend')}>
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
              <Dropdown
                label={_('Typeface')}
                attr="legend.font.family"
                clearable={false}
                options={[...DEFAULT_FONTS]}
              />
              <Numeric
                label={_('Size')}
                step={1}
                attr="legend.font.size"
                postfix="px"
              />
              <ColorPicker label={_('Color')} attr="legend.font.color" />
            </Section>
            <Section name={_('Legend Box')}>
              <Numeric
                label={_('Border Width')}
                step={1}
                attr="legend.borderwidth"
                postfix="px"
              />
              <ColorPicker
                label={_('Border Color')}
                attr="legend.bordercolor"
              />
              <ColorPicker
                label={_('Background Color')}
                attr="legend.bgcolor"
              />
            </Section>
            <Section name={_('Positioning')}>
              <MenuPanel>
                <Section name={_('Anchor Point')}>
                  <Info>
                    {_(
                      'The positioning inputs are relative to the ' +
                        'anchor points on the text box'
                    )}
                  </Info>
                  <Radio
                    attr="legend.xanchor"
                    options={[
                      {label: _('Left'), value: 'left'},
                      {label: _('Center'), value: 'center'},
                      {label: _('Right'), value: 'right'},
                    ]}
                  />
                  <Radio
                    attr="legend.yanchor"
                    options={[
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
                postfix="px"
              />
              <Numeric
                label={_('Y Position')}
                step={0.01}
                attr="legend.y"
                postfix="px"
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
        </LayoutPanel>
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.contextTypes = {
  dataSourceNames: PropTypes.array.isRequired,
  plotSchema: PropTypes.object.isRequired,
};

export default localize(DefaultEditor);

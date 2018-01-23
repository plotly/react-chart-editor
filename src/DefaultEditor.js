import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AnnotationArrowRef,
  AnnotationRef,
  AnnotationAccordion,
  ArrowSelector,
  AxesSelector,
  AxesRange,
  CanvasSize,
  ColorPicker,
  DataSelector,
  Dropdown,
  Flaglist,
  FontSelector,
  Fold,
  Info,
  LayoutNumericFraction,
  LayoutNumericFractionInverse,
  LineDashSelector,
  LineShapeSelector,
  Numeric,
  Panel,
  PanelMenuWrapper,
  Radio,
  MultiFormatTextEditor,
  Section,
  MenuPanel,
  SymbolSelector,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceSelector,
  AxesFold,
} from './components';
import {localize} from './lib';

class DefaultEditor extends Component {
  render() {
    const {localize: _} = this.props;
    return (
      <PanelMenuWrapper>
        <Panel group="Graph" name="Create">
          <TraceAccordion canAdd>
            <TraceSelector
              label="Plot Type"
              attr="type"
              clearable={false}
              show
            />

            <DataSelector
              label="Labels"
              attr="labels"
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Values"
              attr="values"
              clearable={false}
              hasBlank
            />

            <DataSelector label="X" attr="x" clearable={false} hasBlank />

            <DataSelector label="Y" attr="y" clearable={false} hasBlank />

            <DataSelector label="Z" attr="z" clearable={false} hasBlank />

            <DataSelector label="Open" attr="open" clearable={false} hasBlank />

            <DataSelector label="High" attr="high" clearable={false} hasBlank />

            <DataSelector label="Low" attr="low" clearable={false} hasBlank />

            <DataSelector
              label="Close"
              attr="close"
              clearable={false}
              hasBlank
            />
          </TraceAccordion>
        </Panel>

        <TraceRequiredPanel group="Style" name="Traces">
          <TraceAccordion>
            <Section name={_('Trace')}>
              <Numeric label={_('Opacity')} step={0.1} attr="opacity" />
            </Section>

            <Section name={_('Text Attributes')}>
              <Flaglist
                attr="textinfo"
                options={[
                  {label: 'Label', value: 'label'},
                  {label: 'Text', value: 'text'},
                  {label: 'Value', value: 'value'},
                  {label: '%', value: 'percent'},
                ]}
              />
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

            <Section name={_('Size and Spacing')}>
              <LayoutNumericFractionInverse
                label={_('Bar Width')}
                attr="bargap"
              />
              <LayoutNumericFractionInverse
                label={_('Box Width')}
                attr="boxgap"
              />
              <LayoutNumericFraction
                label={_('Bar Padding')}
                attr="bargroupgap"
              />
              <LayoutNumericFraction
                label={_('Box Padding')}
                attr="boxgroupgap"
              />
            </Section>

            <Section name={_('Ticks')}>
              <Numeric label={_('Width')} attr="tickwidth" />
            </Section>

            <Section name={_('Lines')}>
              <Numeric label={_('Width')} attr="line.width" />
              <ColorPicker label={_('Line Color')} attr="line.color" />
              <LineDashSelector label={_('Type')} attr="line.dash" />
              <LineShapeSelector label={_('Shape')} attr="line.shape" />
              <Radio
                label={_('Connect Gaps')}
                attr="connectgaps"
                options={[
                  {label: _('Connect'), value: true},
                  {label: _('Blank'), value: false},
                ]}
              />
            </Section>

            <Section name={_('Increasing Trace Styles')}>
              <Numeric label={_('Width')} attr="increasing.line.width" />
              <ColorPicker
                label={_('Line Color')}
                attr="increasing.line.color"
              />
              <LineDashSelector label={_('Type')} attr="increasing.line.dash" />
              <Radio
                label="Show in Legend"
                attr="increasing.showlegend"
                options={[
                  {label: _('Show'), value: true},
                  {label: _('Hide'), value: false},
                ]}
              />
            </Section>

            <Section name={_('Increasing Trace Styles')}>
              <Numeric label={_('Width')} attr="decreasing.line.width" />
              <ColorPicker
                label={_('Line Color')}
                attr="decreasing.line.color"
              />
              <LineDashSelector label={_('Type')} attr="decreasing.line.dash" />
              <Radio
                label="Show in Legend"
                attr="decreasing.showlegend"
                options={[
                  {label: _('Show'), value: true},
                  {label: _('Hide'), value: false},
                ]}
              />
            </Section>

            <Section name={_('Text Shown on Hover')}>
              <MultiFormatTextEditor attr="text" />
            </Section>
          </TraceAccordion>
        </TraceRequiredPanel>

        <TraceRequiredPanel group="Style" name={_('Layout')}>
          <Fold name={_('Canvas')}>
            <Radio
              attr="autosize"
              options={[
                {label: _('Auto'), value: true},
                {label: _('Custom'), value: false},
              ]}
            />
            <CanvasSize label={_('Fixed Width')} attr="width" units="px" />
            <CanvasSize label={_('Fixed Height')} attr="height" units="px" />
            <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
            <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
          </Fold>
          <Fold name={_('Title and Fonts')}>
            <Section name={_('Title')}>
              <MultiFormatTextEditor attr="title" />
              <FontSelector
                label={_('Typeface')}
                attr="titlefont.family"
                clearable={false}
              />
              <Numeric
                label={_('Font Size')}
                attr="titlefont.size"
                units="px"
              />
              <ColorPicker label={_('Font Color')} attr="titlefont.color" />
            </Section>
            <Section name={_('Global Font')}>
              <FontSelector
                label={_('Typeface')}
                attr="font.family"
                clearable={false}
              />
              <Numeric label={_('Font Size')} attr="font.size" units="px" />
              <ColorPicker label={_('Font Color')} attr="font.color" />
            </Section>
          </Fold>
          <Fold name={_('Margins and Padding')}>
            <Numeric label={_('Top')} attr="margin.t" units="px" />
            <Numeric label={_('Bottom')} attr="margin.b" units="px" />
            <Numeric label={_('Left')} attr="margin.l" units="px" />
            <Numeric label={_('Right')} attr="margin.r" units="px" />
            <Numeric label={_('Padding')} attr="margin.pad" units="px" />
          </Fold>
        </TraceRequiredPanel>

        <TraceRequiredPanel group="Style" name={_('Notes')}>
          <AnnotationAccordion canAdd>
            <Section name={_('Note Text')}>
              <MultiFormatTextEditor attr="text" />
              <FontSelector label={_('Typeface')} attr="font.family" />
              <Numeric label={_('Font Size')} attr="font.size" units="px" />
              <ColorPicker label={_('Font Color')} attr="font.color" />
              <Numeric label={_('Angle')} attr="textangle" units="°" />
            </Section>
            <Section name={_('Arrow')}>
              <Radio
                attr="showarrow"
                options={[
                  {label: _('Show'), value: true},
                  {label: _('Hide'), value: false},
                ]}
              />
              <Numeric label={_('Line Width')} attr="arrowwidth" units="px" />
              <ColorPicker label={_('Color')} attr="arrowcolor" />
              <ArrowSelector label={_('Arrowhead')} attr="arrowhead" />
              <Numeric
                label={_('Scale')}
                step={0.1}
                attr="arrowsize"
                units="px"
              />
              <AnnotationArrowRef label="X Offset" attr="axref" />
              <AnnotationArrowRef label="Y Offset" attr="ayref" />
              <Numeric label={_('X Vector')} attr="ax" hideArrows />
              <Numeric label={_('Y Vector')} attr="ay" hideArrows />
            </Section>
            <Section name={_('Horizontal Positioning')}>
              <MenuPanel>
                <Section name={_('Anchor Point')}>
                  <Info>
                    {_(
                      'The anchor point determines which side of the ' +
                        "annotation's positioning coordinates refer to."
                    )}
                  </Info>
                  <Radio
                    attr="xanchor"
                    options={[
                      {label: _('Auto'), value: 'auto'},
                      {label: _('Left'), value: 'left'},
                      {label: _('Center'), value: 'center'},
                      {label: _('Right'), value: 'right'},
                    ]}
                  />
                </Section>
              </MenuPanel>
              <AnnotationRef label={_('Relative To')} attr="xref" />
              <Numeric label={_('Position')} attr="x" hideArrows />
            </Section>
            <Section name={_('Vertical Positioning')}>
              <MenuPanel>
                <Section name={_('Anchor Point')}>
                  <Info>
                    {_(
                      'The anchor point determines which side of the ' +
                        "annotation's positioning coordinates refer to."
                    )}
                  </Info>
                  <Radio
                    attr="yanchor"
                    options={[
                      {label: _('Auto'), value: 'auto'},
                      {label: _('Top'), value: 'top'},
                      {label: _('Middle'), value: 'middle'},
                      {label: _('Bottom'), value: 'bottom'},
                    ]}
                  />
                </Section>
              </MenuPanel>
              <AnnotationRef label={_('Relative To')} attr="yref" />
              <Numeric label={_('Position')} attr="y" hideArrows />
            </Section>
          </AnnotationAccordion>
        </TraceRequiredPanel>

        <TraceRequiredPanel group="Style" name={_('Axes')}>
          <AxesFold name={_('Titles')}>
            <AxesSelector />
            <MultiFormatTextEditor attr="title" />
            <FontSelector label={_('Typeface')} attr="titlefont.family" />
            <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
            <ColorPicker label={_('Font Color')} attr="titlefont.color" />
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
            <Section name={_('Tick Labels')}>
              <FontSelector label={_('Typeface')} attr="tickfont.family" />
              <Numeric label={_('Font Size')} attr="tickfont.size" units="px" />
              <ColorPicker label={_('Font Color')} attr="tickfont.color" />
            </Section>
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
        </TraceRequiredPanel>

        <TraceRequiredPanel group="Style" name={_('Legend')}>
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
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.propTypes = {
  localize: PropTypes.func,
};

export default localize(DefaultEditor);

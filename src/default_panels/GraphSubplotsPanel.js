import React from 'react';
// import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  RectanglePositioner,
  AxisOverlayDropdown,
  PlotlySection,
  TraceTypeSection,
  AxisAnchorDropdown,
  AxisSide,
  Dropdown,
  Radio,
  Numeric,
  ColorPicker,
  VisibilitySelect,
  NumericFraction,
} from '../components';
import {TRACE_TO_AXIS} from '../lib/constants';
import {EditorControlsContext} from '../context';

const GraphSubplotsPanel = () => (
  <EditorControlsContext.Consumer>
    {({localize: _}) => (
      <SubplotAccordion>
        <PlotlySection name={_('Boundaries')} attr="xaxis.domain[0]">
          <AxisOverlayDropdown label={_('X Overlay')} attr="xaxis.overlaying" />
          <AxisOverlayDropdown label={_('Y Overlay')} attr="yaxis.overlaying" />
        </PlotlySection>

        <RectanglePositioner attr="domain.x[0]" />
        <RectanglePositioner attr="xaxis.domain[0]" cartesian />

        <TraceTypeSection name={_('X Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
          <AxisAnchorDropdown label={_('Anchor to')} attr="xaxis.anchor" clearable={false} />
          <AxisSide label={_('Side')} attr="xaxis.side" />
        </TraceTypeSection>
        <TraceTypeSection name={_('Y Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
          <AxisAnchorDropdown label={_('Anchor to')} attr="yaxis.anchor" clearable={false} />
          <AxisSide label={_('Side')} attr="yaxis.side" />
        </TraceTypeSection>

        <PlotlySection name={_('Aspect Ratio')}>
          <VisibilitySelect
            attr="aspectmode"
            options={[
              {label: _('Auto'), value: 'mode'},
              {label: _('Cube'), value: 'cube'},
              {label: _('Data'), value: 'data'},
              {label: _('Manual'), value: 'manual'},
            ]}
            dropdown={true}
            clearable={false}
            showOn="manual"
            defaultOpt="mode"
          >
            <Numeric label={_('X')} attr="aspectratio.x" step={0.1} />
            <Numeric label={_('Y')} attr="aspectratio.y" step={0.1} />
            <Numeric label={_('Z')} attr="aspectratio.z" step={0.1} />
          </VisibilitySelect>
        </PlotlySection>

        <PlotlySection name={_('Canvas')}>
          <ColorPicker label={_('Plot Background')} attr="bgcolor" />
        </PlotlySection>

        <PlotlySection name={_('Bar Options')}>
          <Radio
            label={_('Bar Mode')}
            attr="barmode"
            options={[{label: _('Stack'), value: 'stack'}, {label: _('Overlay'), value: 'overlay'}]}
          />
          <NumericFraction label={_('Bar Padding')} attr="bargap" showSlider />
        </PlotlySection>

        <PlotlySection name={_('Map Style')}>
          <Dropdown
            label={_('Mapbox Style')}
            attr="style"
            options={[
              {label: _('Basic'), value: 'basic'},
              {label: _('Outdoors'), value: 'outdoors'},
              {label: _('Light'), value: 'light'},
              {label: _('Dark'), value: 'dark'},
              {label: _('Satellite'), value: 'satellite'},
              {label: _('Satellite with Streets'), value: 'satellite-streets'},
            ]}
            clearable={false}
          />
        </PlotlySection>
        <PlotlySection name={_('Map Positioning')}>
          <Numeric label={_('Center Latitude')} attr="center.lat" />
          <Numeric label={_('Center Longitude')} attr="center.lon" />
          <Numeric label={_('Zoom Level')} attr="zoom" min={0} />
          <Numeric label={_('Bearing')} attr="bearing" />
          <Numeric label={_('Pitch')} attr="pitch" min={0} />
        </PlotlySection>

        <PlotlySection name={_('Map Projection')}>
          <Dropdown
            label={_('Region')}
            attr="scope"
            options={[
              {label: _('World'), value: 'world'},
              {label: _('USA'), value: 'usa'},
              {label: _('Europe'), value: 'europe'},
              {label: _('Asia'), value: 'asia'},
              {label: _('Africa'), value: 'africa'},
              {label: _('North America'), value: 'north america'},
              {label: _('South America'), value: 'south america'},
            ]}
            clearable={false}
          />
          <Dropdown
            label={_('Projection')}
            attr="projection.type"
            clearable={false}
            options={[
              {label: _('Equirectangular'), value: 'equirectangular'},
              {label: _('Mercator'), value: 'mercator'},
              {label: _('Orthographic'), value: 'orthographic'},
              {label: _('Natural Earth'), value: 'natural earth'},
              {label: _('Albers USA'), value: 'albers usa'},
              {label: _('Winkel Tripel'), value: 'winkel tripel'},
              {label: _('Robinson'), value: 'robinson'},
              {label: _('Miller'), value: 'miller'},
              {label: _('Kavrayskiy 7'), value: 'kavrayskiy7'},
              {label: _('Eckert 4'), value: 'eckert4'},
              {label: _('Azimuthal Equal Area'), value: 'azimuthal equal area'},
              {
                label: _('Azimuthal Equidistant'),
                value: 'azimuthal equidistant',
              },
              {label: _('Conic Equal Area'), value: 'conic equal area'},
              {label: _('Conic Conformal'), value: 'conic conformal'},
              {label: _('Conic Equidistant'), value: 'conic equidistant'},
              {label: _('Gnomonic'), value: 'gnomonic'},
              {label: _('Stereographic'), value: 'stereographic'},
              {label: _('Mollweide'), value: 'mollweide'},
              {label: _('Hammer'), value: 'hammer'},
              {label: _('Transverse Mercator'), value: 'transverse mercator'},
              {label: _('Aitoff'), value: 'aitoff'},
              {label: _('Sinusoidal'), value: 'sinusoidal'},
            ]}
          />
        </PlotlySection>

        <PlotlySection name={_('Country Borders')} attr="showcountries">
          <Radio
            attr="showcountries"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Numeric label={_('Border Width')} attr="countrywidth" units="px" />
          <ColorPicker label={_('Border Color')} attr="countrycolor" />
        </PlotlySection>
        <PlotlySection name={_('Sub-Country Unit Borders')} attr="showsubunits">
          <Radio
            attr="showsubunits"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Numeric label={_('Border Width')} attr="subunitwidth" units="px" />
          <ColorPicker label={_('Border Color')} attr="subunitcolor" />
        </PlotlySection>
        <PlotlySection name={_('Coastlines')} attr="showcoastlines">
          <Radio
            attr="showcoastlines"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Numeric label={_('Width')} attr="coastlinewidth" units="px" />
          <ColorPicker label={_('Color')} attr="coastlinecolor" />
        </PlotlySection>
        <PlotlySection name={_('Oceans')} attr="showocean">
          <Radio
            attr="showocean"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <ColorPicker label={_('Color')} attr="oceancolor" />
        </PlotlySection>
        <PlotlySection name={_('Land')} attr="showland">
          <Radio
            attr="showland"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <ColorPicker label={_('Color')} attr="landcolor" />
        </PlotlySection>
        <PlotlySection name={_('Lakes')} attr="showlakes">
          <Radio
            attr="showlakes"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <ColorPicker label={_('Color')} attr="lakecolor" />
        </PlotlySection>
        <PlotlySection name={_('Rivers')} attr="showrivers">
          <Radio
            attr="showrivers"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Numeric label={_('Width')} attr="riverwidth" units="px" />
          <ColorPicker label={_('Color')} attr="rivercolor" />
        </PlotlySection>

        <PlotlySection name={_('Map Frame')} attr="showframe">
          <Radio
            attr="showframe"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Numeric label={_('Width')} attr="framewidth" units="px" />
          <ColorPicker label={_('Color')} attr="framecolor" />
        </PlotlySection>

        <PlotlySection name={_('Map Options')}>
          <Radio
            label={_('Resolution')}
            attr="resolution"
            options={[
              {label: _('1:110,000,000'), value: 110},
              {label: _('1:50,000,000'), value: 50},
            ]}
          />
          <Numeric label={_('Scale')} attr="projection.scale" min={0} />
          <Numeric label={_('Latitude')} attr="projection.rotation.lon" min={0} />
          <Numeric label={_('Longitude')} attr="projection.rotation.lat" min={0} />
          <Numeric label={_('Roll')} attr="projection.rotation.roll" min={0} />
        </PlotlySection>

        <PlotlySection name={_('Ternary')}>
          <Numeric label={_('Sum')} attr="sum" />
        </PlotlySection>

        <PlotlySection name={_('Polar Sector')}>
          <Numeric label={_('Min')} attr="sector[0]" min={-360} max={360} showSlider />
          <Numeric label={_('Max')} attr="sector[1]" min={-360} max={360} showSlider />
          <NumericFraction label={_('Hole')} attr="hole" min={0} max={100} showSlider />
        </PlotlySection>
      </SubplotAccordion>
    )}
  </EditorControlsContext.Consumer>
);

export default GraphSubplotsPanel;

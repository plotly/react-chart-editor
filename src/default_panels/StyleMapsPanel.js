import React from 'react';
import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  PlotlySection,
  Dropdown,
  Radio,
  Numeric,
  ColorPicker,
} from '../components';

const StyleMapsPanel = (props, {localize: _}) => (
  <SubplotAccordion>
    <PlotlySection name={_('Base Map')} attr="style">
      <Dropdown
        label={_('Tiles')}
        attr="style"
        options={[
          {label: _('No tiles (white background)'), value: 'white-bg'},
          {label: _('Open Street Map'), value: 'open-street-map'},
          {label: _('Carto Positron'), value: 'carto-positron'},
          {label: _('Carto Dark Matter'), value: 'carto-darkmatter'},
          {label: _('Stamen Terrain'), value: 'stamen-terrain'},
          {label: _('Stamen Toner'), value: 'stamen-toner'},
          {label: _('Stamen Watercolor'), value: 'stamen-watercolor'},
          {label: _('Mapbox Basic'), value: 'basic'},
          {label: _('Mapbox Outdoors'), value: 'outdoors'},
          {label: _('Mapbox Light'), value: 'light'},
          {label: _('Mapbox Dark'), value: 'dark'},
          {label: _('Mapbox Satellite'), value: 'satellite'},
          {label: _('Mapbox Satellite with Streets'), value: 'satellite-streets'},
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
        options={[{label: _('1:110,000,000'), value: 110}, {label: _('1:50,000,000'), value: 50}]}
      />
      <Numeric label={_('Scale')} attr="projection.scale" min={0} />
      <Numeric label={_('Latitude')} attr="projection.rotation.lon" min={0} />
      <Numeric label={_('Longitude')} attr="projection.rotation.lat" min={0} />
      <Numeric label={_('Roll')} attr="projection.rotation.roll" min={0} />
    </PlotlySection>
  </SubplotAccordion>
);

StyleMapsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleMapsPanel;

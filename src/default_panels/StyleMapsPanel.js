import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  PlotlySection,
  Dropdown,
  MapboxStyleDropdown,
  MapboxLayersAccordion,
  Radio,
  Numeric,
  ColorPicker,
  MapboxSourceArray,
} from '../components';

const StyleMapsPanel = (props, {localize: _}) => (
  <SubplotAccordion>
    <PlotlySection name={_('Base Map')} attr="style">
      <MapboxStyleDropdown label={_('Tile Source')} attr="style" />
    </PlotlySection>
    <PlotlySection name={_('Layers')} attr="style">
      <MapboxLayersAccordion>
        <Radio
          attr="below"
          options={[
            {label: _('Below Data'), value: 'traces'},
            {label: _('Above Data'), value: ''},
          ]}
        />
        <MapboxSourceArray label={_('Tile Source URL')} attr="source" show />
      </MapboxLayersAccordion>
    </PlotlySection>
    <PlotlySection name={_('Map Positioning')}>
      <Numeric label={_('Center Latitude')} attr="center.lat" />
      <Numeric label={_('Center Longitude')} attr="center.lon" />
      <Numeric label={_('Zoom Level')} attr="zoom" min={0} />
      <Numeric label={_('Bearing')} attr="bearing" />
      <Numeric label={_('Pitch')} attr="pitch" min={0} />
      <Dropdown
        label={_('Bounds Fitting')}
        attr="fitbounds"
        options={[
          {label: _('Off'), value: false},
          {label: _('Locations'), value: 'locations'},
          {label: _('GeoJSON'), value: 'geojson'},
        ]}
        clearable={false}
      />
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
      <Numeric label={_('Scale')} attr="projection.scale" min={0} />
      <Numeric label={_('Center Latitude')} attr="projection.rotation.lon" min={0} />
      <Numeric label={_('Center Longitude')} attr="projection.rotation.lat" min={0} />
      <Numeric label={_('Roll')} attr="projection.rotation.roll" min={0} />
    </PlotlySection>

    <PlotlySection name={_('Base Map')} attr="visible">
      <Radio
        attr="visible"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Radio
        label={_('Resolution')}
        attr="resolution"
        options={[
          {label: _('1:110,000,000'), value: 110},
          {label: _('1:50,000,000'), value: 50},
        ]}
      />
    </PlotlySection>

    <PlotlySection name={_('Country Borders')} attr="showcountries">
      <Radio
        attr="showcountries"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Border Width')} attr="countrywidth" units="px" />
      <ColorPicker label={_('Border Color')} attr="countrycolor" />
    </PlotlySection>
    <PlotlySection name={_('Sub-Country Unit Borders')} attr="showsubunits">
      <Radio
        attr="showsubunits"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Border Width')} attr="subunitwidth" units="px" />
      <ColorPicker label={_('Border Color')} attr="subunitcolor" />
    </PlotlySection>
    <PlotlySection name={_('Coastlines')} attr="showcoastlines">
      <Radio
        attr="showcoastlines"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Width')} attr="coastlinewidth" units="px" />
      <ColorPicker label={_('Color')} attr="coastlinecolor" />
    </PlotlySection>
    <PlotlySection name={_('Oceans')} attr="showocean">
      <Radio
        attr="showocean"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorPicker label={_('Color')} attr="oceancolor" />
    </PlotlySection>
    <PlotlySection name={_('Land')} attr="showland">
      <Radio
        attr="showland"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorPicker label={_('Color')} attr="landcolor" />
    </PlotlySection>
    <PlotlySection name={_('Lakes')} attr="showlakes">
      <Radio
        attr="showlakes"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorPicker label={_('Color')} attr="lakecolor" />
    </PlotlySection>
    <PlotlySection name={_('Rivers')} attr="showrivers">
      <Radio
        attr="showrivers"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Width')} attr="riverwidth" units="px" />
      <ColorPicker label={_('Color')} attr="rivercolor" />
    </PlotlySection>

    <PlotlySection name={_('Map Frame')} attr="showframe">
      <Radio
        attr="showframe"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Width')} attr="framewidth" units="px" />
      <ColorPicker label={_('Color')} attr="framecolor" />
    </PlotlySection>
  </SubplotAccordion>
);

StyleMapsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleMapsPanel;

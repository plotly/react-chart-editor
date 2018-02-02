import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  LayoutSectionOverride,
  Radio,
  Section,
  TraceAccordion,
  TraceSelector,
} from '../components';
import {localize} from '../lib';

const GraphCreatePanel = ({localize: _}) => {
  const geoProjectionOptions = {
    usa: [
      {
        label: _('Albers USA'),
        value: 'albers usa',
      },
    ],
    other: [
      {label: _('Equirectangular'), value: 'equirectangular'},
      {label: _('Mercator'), value: 'mercator'},
      {label: _('Orthographic'), value: 'orthographic'},
      {label: _('Natural Earth'), value: 'naturalEarth'},
      {label: _('Kavrayskiy7'), value: 'kavrayskiy7'},
      {label: _('Miller'), value: 'miller'},
      {label: _('Robinson'), value: 'robinson'},
      {label: _('Eckert4'), value: 'eckert4'},
      {label: _('Azimuthal Equal Area'), value: 'azimuthalEqualArea'},
      {label: _('Azimuthal Equidistant'), value: 'azimuthalEquidistant'},
      {label: _('Conic Equal Area'), value: 'conicEqualArea'},
      {label: _('Conic Conformal'), value: 'conicConformal'},
      {label: _('Conic Equidistant'), value: 'conicEquidistant'},
      {label: _('Gnomonic'), value: 'gnomonic'},
      {label: _('Stereographic'), value: 'stereographic'},
      {label: _('Mollweide'), value: 'mollweide'},
      {label: _('Hammer'), value: 'hammer'},
      {label: _('Transverse Mercator'), value: 'transverseMercator'},
      {label: _('Winkel Tripel'), value: 'winkel3'},
      {label: _('Aitoff'), value: 'aitoff'},
      {label: _('Sinusoidal'), value: 'sinusoidal'},
    ],
  };

  const geoScopeOptions = [
    {label: _('World'), value: 'world'},
    {label: _('USA'), value: 'usa'},
    {label: _('Europe'), value: 'europe'},
    {label: _('Asia'), value: 'asia'},
    {label: _('Africa'), value: 'africa'},
    {label: _('North America'), value: 'north america'},
    {label: _('South America'), value: 'south america'},
  ];

  return (
    <TraceAccordion canAdd>
      <TraceSelector label={_('Plot Type')} attr="type" show />

      <DataSelector label={_('Labels')} attr="labels" />

      <DataSelector label={_('Values')} attr="values" />

      <DataSelector label={_('Locations')} attr="locations" />

      <DataSelector label={_('Latitude')} attr="lat" />

      <DataSelector label={_('Longitude')} attr="lon" />

      <DataSelector label={_('X')} attr="x" />

      <DataSelector label={_('Y')} attr="y" />

      <DataSelector label={{choropleth: _('Values'), '*': _('Z')}} attr="z" />

      <DataSelector label={_('Color')} attr="marker.color" />

      <DataSelector label={_('Open')} attr="open" />

      <DataSelector label={_('High')} attr="high" />

      <DataSelector label={_('Low')} attr="low" />

      <DataSelector label={_('Close')} attr="close" />

      <Radio
        label={_('Transpose')}
        attr="transpose"
        options={[
          {label: _('No'), value: false},
          {label: _('Yes'), value: true},
        ]}
      />

      <Section name={_('Location Format')}>
        <Dropdown
          attr="locationmode"
          clearable={false}
          options={[
            {label: _('Country Names'), value: 'country names'},
            {label: _('Country Abbreviations (ISO-3)'), value: 'ISO-3'},
            {
              label: _('USA State Abbreviations (e.g. NY)'),
              value: 'USA-states',
            },
          ]}
        />
      </Section>

      <LayoutSectionOverride name={_('Map Region')}>
        <Dropdown
          attr="geo.scope"
          clearable={false}
          options={geoScopeOptions}
        />
      </LayoutSectionOverride>

      <LayoutSectionOverride name={_('Projection')}>
        <Dropdown
          attr="geo.projection.type"
          clearable={false}
          options={geoProjectionOptions}
        />
      </LayoutSectionOverride>
    </TraceAccordion>
  );
};

GraphCreatePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphCreatePanel);

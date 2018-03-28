import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  ErrorBars,
  Radio,
  PlotlySection,
  LayoutSection,
  AxisCreator,
  TraceAccordion,
  TraceSelector,
  TextEditor,
  Numeric,
  TraceTypeSection,
} from '../components';
import {localize} from '../lib';

const GraphCreatePanel = ({localize: _}) => {
  return (
    <TraceAccordion canAdd>
      <TextEditor label={_('Name')} attr="name" richTextOnly />
      <TraceSelector label={_('Type')} attr="type" show />

      <PlotlySection name={_('Data')}>
        <DataSelector label={_('Labels')} attr="labels" />
        <DataSelector label={_('Values')} attr="values" />
        <DataSelector label={_('Locations')} attr="locations" />
        <DataSelector label={_('Latitude')} attr="lat" />
        <DataSelector label={_('Longitude')} attr="lon" />
        <DataSelector
          label={{
            histogram2d: _('X Values'),
            histogram: _('X Values'),
            '*': _('X'),
          }}
          attr="x"
        />
        <DataSelector
          label={{
            histogram2d: _('Y Values'),
            histogram: _('Y Values'),
            '*': _('Y'),
          }}
          attr="y"
        />
        <DataSelector
          label={{
            choropleth: _('Values'),
            histogram2d: _('Z Values'),
            '*': _('Z'),
          }}
          attr="z"
        />
        <DataSelector label={_('I (Optional)')} attr="i" />
        <DataSelector label={_('J (Optional)')} attr="j" />
        <DataSelector label={_('K (Optional)')} attr="k" />
        <DataSelector label={_('Open')} attr="open" />
        <DataSelector label={_('High')} attr="high" />
        <DataSelector label={_('Low')} attr="low" />
        <DataSelector label={_('Close')} attr="close" />
        <DataSelector label={_('A')} attr="a" />
        <DataSelector label={_('B')} attr="b" />
        <DataSelector label={_('C')} attr="c" />
        <DataSelector label={_('Headers')} attr="header.values" />
        <DataSelector label={_('Columns')} attr="cells.values" />
      </PlotlySection>

      <TraceTypeSection
        name={_('Data')}
        traceTypes={['scatterpolar', 'scatterpolargl']}
      >
        <DataSelector label={_('Radius')} attr="r" />
        <DataSelector label={_('Theta')} attr="theta" />
        <Dropdown
          label={_('Theta Unit')}
          options={[
            {label: _('Radians'), value: 'radians'},
            {label: _('Degrees'), value: 'degrees'},
            {label: _('Gradians'), value: 'gradians'},
          ]}
          attr="thetaunit"
          clearable={false}
        />
      </TraceTypeSection>

      <PlotlySection name={_('Axes to Use')}>
        <AxisCreator attr="fake_attr" localize={_} />
      </PlotlySection>

      <PlotlySection name={_('Error Bars X')}>
        <ErrorBars localize={_} attr="error_x" />
      </PlotlySection>

      <PlotlySection name={_('Error Bars Y')}>
        <ErrorBars localize={_} attr="error_y" />
      </PlotlySection>

      <PlotlySection name={_('Error Bars Z')}>
        <ErrorBars localize={_} attr="error_z" />
      </PlotlySection>

      <PlotlySection name={_('Header Options')}>
        <DataSelector label={_('Fill Color')} attr="header.fill.color" />
        <DataSelector label={_('Font Color')} attr="header.font.color" />
        <DataSelector label={_('Font Size')} attr="header.font.size" />
      </PlotlySection>

      <PlotlySection name={_('Cell Options')}>
        <DataSelector label={_('Fill Color')} attr="cells.fill.color" />
        <DataSelector label={_('Font Color')} attr="cells.font.color" />
        <DataSelector label={_('Font Size')} attr="cells.font.size" />
      </PlotlySection>

      <PlotlySection name={_('Column Options')}>
        <DataSelector label={_('Width')} attr="columnwidth" />
        <DataSelector label={_('Order')} attr="columnorder" />
      </PlotlySection>

      <PlotlySection name={_('Options')}>
        <DataSelector label={_('Intensity')} attr="intensity" />
        <DataSelector label={_('Facecolor')} attr="facecolor" />
        <DataSelector label={_('Vertexcolor')} attr="vertexcolor" />
        <Dropdown
          label={_('Location Format')}
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
        <LayoutSection>
          <Dropdown
            label={_('Map Region')}
            attr="geo.scope"
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
            attr="geo.projection.type"
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
        </LayoutSection>
        <Numeric label={_('Sum')} step={10} attr="sum" />
        <DataSelector label={_('Text')} attr="text" />
        <DataSelector label={_('Color')} attr="marker.color" />
        <Radio
          label={_('Transpose')}
          attr="transpose"
          options={[
            {label: _('No'), value: false},
            {label: _('Yes'), value: true},
          ]}
        />
      </PlotlySection>
    </TraceAccordion>
  );
};

GraphCreatePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphCreatePanel);

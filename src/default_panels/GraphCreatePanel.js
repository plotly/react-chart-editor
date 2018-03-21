import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  ErrorBars,
  GeoProjections,
  GeoScope,
  Radio,
  Section,
  AxisCreator,
  TraceAccordion,
  TraceSelector,
  TextEditor,
  Numeric,
  TraceTypeSection,
  LayoutNumericSlider,
} from '../components';
import {localize} from '../lib';

const GraphCreatePanel = ({localize: _}) => {
  return (
    <TraceAccordion canAdd>
      <TextEditor label={_('Name')} attr="name" richTextOnly />
      <TraceSelector label={_('Type')} attr="type" show />

      <Section name={_('Data')}>
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
      </Section>

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
        <LayoutNumericSlider
          attr="polar.sector[0]"
          label={_('Theta Start')}
          min={0}
          max={360}
          showSlider
        />
        <LayoutNumericSlider
          attr="polar.sector[1]"
          label={_('Theta End')}
          min={0}
          max={360}
          showSlider
        />
      </TraceTypeSection>

      <Section name={_('Axes to Use')}>
        <AxisCreator attr="fake_attr" localize={_} />
      </Section>

      <Section name={_('Error Bars X')}>
        <ErrorBars localize={_} attr="error_x" />
      </Section>

      <Section name={_('Error Bars Y')}>
        <ErrorBars localize={_} attr="error_y" />
      </Section>

      <Section name={_('Error Bars Z')}>
        <ErrorBars localize={_} attr="error_z" />
      </Section>

      <Section name={_('Header Options')}>
        <DataSelector label={_('Fill Color')} attr="header.fill.color" />
        <DataSelector label={_('Font Color')} attr="header.font.color" />
        <DataSelector label={_('Font Size')} attr="header.font.size" />
      </Section>

      <Section name={_('Cell Options')}>
        <DataSelector label={_('Fill Color')} attr="cells.fill.color" />
        <DataSelector label={_('Font Color')} attr="cells.font.color" />
        <DataSelector label={_('Font Size')} attr="cells.font.size" />
      </Section>

      <Section name={_('Column Options')}>
        <DataSelector label={_('Width')} attr="columnwidth" />
        <DataSelector label={_('Order')} attr="columnorder" />
      </Section>

      <Section name={_('Options')}>
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
        <GeoScope
          label={_('Map Region')}
          attr="geo.scope"
          clearable={false}
          localize={_}
        />
        <GeoProjections
          label={_('Projection')}
          attr="geo.projection.type"
          clearable={false}
          localize={_}
        />
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
      </Section>
    </TraceAccordion>
  );
};

GraphCreatePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphCreatePanel);

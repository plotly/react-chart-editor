import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  GeoProjections,
  GeoScope,
  Radio,
  Section,
  TraceAccordion,
  TraceSelector,
  TextEditor,
  Numeric,
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

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
        <DataSelector label={_('X')} attr="x" />
        <DataSelector label={_('Y')} attr="y" />
        <DataSelector label={{choropleth: _('Values'), '*': _('Z')}} attr="z" />
        <DataSelector label={_('Open')} attr="open" />
        <DataSelector label={_('High')} attr="high" />
        <DataSelector label={_('Low')} attr="low" />
        <DataSelector label={_('Close')} attr="close" />
        <DataSelector label={_('A')} attr="a" />
        <DataSelector label={_('B')} attr="b" />
        <DataSelector label={_('C')} attr="c" />
      </Section>

      <Section name={_('Options')}>
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

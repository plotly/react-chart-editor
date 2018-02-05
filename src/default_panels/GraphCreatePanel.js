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
} from '../components';
import {localize} from '../lib';

const GraphCreatePanel = ({localize: _}) => {
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

      <Section name={_('Map Region')}>
        <GeoScope attr="geo.scope" clearable={false} localize={_} />
      </Section>

      <Section name={_('Projection')}>
        <GeoProjections
          attr="geo.projection.type"
          clearable={false}
          localize={_}
        />
      </Section>
    </TraceAccordion>
  );
};

GraphCreatePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphCreatePanel);

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
import {scopeDefaults, projNames} from 'plotly.js/src/plots/geo/constants';

const geoScopeOptions = Object.keys(scopeDefaults).map(k => ({
  label: k,
  value: k,
}));
const geoProjectionOptions = Object.keys(projNames).map(k => ({
  label: k,
  value: k,
}));

const GraphCreatePanel = ({localize: _}) => (
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

    <DataSelector label={_('Open')} attr="open" />

    <DataSelector label={_('High')} attr="high" />

    <DataSelector label={_('Low')} attr="low" />

    <DataSelector label={_('Close')} attr="close" />

    <Radio
      label={_('Transpose')}
      attr="transpose"
      options={[{label: _('No'), value: false}, {label: _('Yes'), value: true}]}
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
      <Dropdown attr="geo.scope" clearable={false} options={geoScopeOptions} />
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

GraphCreatePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphCreatePanel);

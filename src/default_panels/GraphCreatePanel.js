import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  DropdownCustom,
  Radio,
  PlotlySection,
  AxesCreator,
  SubplotCreator,
  TraceAccordion,
  TraceSelector,
  LocationSelector,
  Dropzone,
  Numeric,
} from '../components';

const GraphCreatePanel = (props, {localize: _}) => {
  return (
    <TraceAccordion
      canAdd
      canReorder
    >
      <TraceSelector label={_('Type')} attr="type" show />
      <Dropzone attr="geojson" fileType="geojson" />
      <LocationSelector attr="type" />
      <DataSelector label={_('Values')} attr="values" />
      <DataSelector label={_('Labels')} attr="labels" />
      <DataSelector label={_('Parents')} attr="parents" />

      <Dropdown
        label={_('Parent Value Mode')}
        attr="branchvalues"
        options={[
          {label: _('Total'), value: 'total'},
          {label: _('Remainder'), value: 'remainder'},
        ]}
        clearable={false}
      />

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
      <DropdownCustom
        label={_('GeoJSON Location Field')}
        attr="featureidkey"
        options={[
          {label: _('id'), value: 'id'},
          {label: _('Custom'), value: 'custom'},
        ]}
        customOpt="custom"
        dafaultOpt=""
        clearable={false}
      />
      <Numeric label={_('Radius')} attr="radius" min={0} max={50} showSlider />
      <DataSelector label={_('Measure')} attr="measure" />

      <PlotlySection name={_('Nodes')}>
        <DataSelector label={_('Labels')} attr="node.label" />
        <DataSelector label={_('Groups')} attr="node.groups" />
        <DataSelector label={_('X')} attr="node.x" />
        <DataSelector label={_('Y')} attr="node.y" />
      </PlotlySection>
      <PlotlySection name={_('Links')}>
        <DataSelector label={_('Sources')} attr="link.source" />
        <DataSelector label={_('Targets')} attr="link.target" />
        <DataSelector label={_('Values')} attr="link.value" />
        <DataSelector label={_('Labels')} attr="link.label" />
      </PlotlySection>
      <Radio
        label={_('Orientation')}
        attr="orientation"
        options={[
          {label: _('Vertical'), value: 'v'},
          {label: _('Horizontal'), value: 'h'},
        ]}
      />
      <DataSelector label={_('I (Optional)')} attr="i" />
      <DataSelector label={_('J (Optional)')} attr="j" />
      <DataSelector label={_('K (Optional)')} attr="k" />
      <DataSelector label={_('A')} attr="a" />
      <DataSelector label={_('B')} attr="b" />
      <DataSelector label={_('C')} attr="c" />
      <DataSelector label={_('U')} attr="u" />
      <DataSelector label={_('V')} attr="v" />
      <DataSelector label={_('W')} attr="w" />
      <DataSelector label={_('X start')} attr="starts.x" />
      <DataSelector label={_('Y start')} attr="starts.y" />
      <DataSelector label={_('Z start')} attr="starts.z" />
      <DataSelector label={_('Headers')} attr="header.values" />
      <DataSelector label={_('Columns')} attr="cells.values" />

      <AxesCreator attr="fake_attr" />
      <SubplotCreator attr="fake_attr" />

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

export default GraphCreatePanel;
GraphCreatePanel.contextTypes = {
  localize: PropTypes.func,
};

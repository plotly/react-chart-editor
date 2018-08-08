import React from 'react';
import PropTypes from 'prop-types';
import {
  DataSelector,
  Dropdown,
  Radio,
  PlotlySection,
  AxesCreator,
  SubplotCreator,
  TraceAccordion,
  TraceSelector,
  Numeric,
  TraceTypeSection,
  LocationSelector,
} from '../components';
import {
  HistogramInfoVertical,
  HistogramInfoHorizontal,
} from '../components/fields/derived';

const GraphCreatePanel = (props, {localize: _}) => {
  return (
    <TraceAccordion canAdd excludeFits>
      <TraceSelector label={_('Type')} attr="type" show />

      <LocationSelector attr="type" />

      <DataSelector label={_('Values')} attr="values" />
      <DataSelector label={_('Labels')} attr="labels" />

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
      <Radio
        label={_('Orientation')}
        attr="orientation"
        options={[
          {label: _('Vertical'), value: 'v'},
          {label: _('Horizontal'), value: 'h'},
        ]}
      />
      <HistogramInfoVertical>
        {_(
          'Note: in vertical orientation, X values are used for bins and Y values for weights.'
        )}
      </HistogramInfoVertical>
      <HistogramInfoHorizontal>
        {_(
          'Note: in horizontal orientation, Y Values are used for bins and X values for weights.'
        )}
      </HistogramInfoHorizontal>
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

      <TraceTypeSection
        traceTypes={['scatterpolar', 'scatterpolargl']}
        mode="trace"
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
        <Numeric label={_('Sum')} step={10} attr="sum" />
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

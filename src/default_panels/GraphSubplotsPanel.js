import PropTypes from 'prop-types';
import {
  SubplotAccordion,
  RectanglePositioner,
  AxisOverlayDropdown,
  PlotlySection,
  TraceTypeSection,
  AxisAnchorDropdown,
  AxisSide,
  Dropdown,
  Radio,
  Numeric,
  ColorPicker,
  VisibilitySelect,
  NumericFraction,
} from '../components';
import {TRACE_TO_AXIS} from '../lib/constants';

const GraphSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion>
    <PlotlySection name={_('Boundaries')} attr="xaxis.domain[0]">
      <AxisOverlayDropdown label={_('X Overlay')} attr="xaxis.overlaying" />
      <AxisOverlayDropdown label={_('Y Overlay')} attr="yaxis.overlaying" />
    </PlotlySection>

    <RectanglePositioner attr="domain.x[0]" />
    <RectanglePositioner attr="xaxis.domain[0]" cartesian />

    <TraceTypeSection name={_('X Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
      <AxisAnchorDropdown label={_('Anchor to')} attr="xaxis.anchor" clearable={false} />
      <AxisSide label={_('Side')} attr="xaxis.side" />
    </TraceTypeSection>
    <TraceTypeSection name={_('Y Anchor')} traceTypes={TRACE_TO_AXIS.cartesian}>
      <AxisAnchorDropdown label={_('Anchor to')} attr="yaxis.anchor" clearable={false} />
      <AxisSide label={_('Side')} attr="yaxis.side" />
    </TraceTypeSection>

    <PlotlySection name={_('Aspect Ratio')}>
      <VisibilitySelect
        attr="aspectmode"
        options={[
          {label: _('Auto'), value: 'mode'},
          {label: _('Cube'), value: 'cube'},
          {label: _('Data'), value: 'data'},
          {label: _('Manual'), value: 'manual'},
        ]}
        dropdown={true}
        clearable={false}
        showOn="manual"
        defaultOpt="mode"
      >
        <Numeric label={_('X')} attr="aspectratio.x" step={0.1} />
        <Numeric label={_('Y')} attr="aspectratio.y" step={0.1} />
        <Numeric label={_('Z')} attr="aspectratio.z" step={0.1} />
      </VisibilitySelect>
    </PlotlySection>
    <PlotlySection name={_('Projection')}>
      <Dropdown
        label={_('Type')}
        attr="camera.projection.type"
        options={[
          {label: _('Perspective'), value: 'perspective'},
          {label: _('Orthographic'), value: 'orthographic'},
        ]}
        clearable={false}
      />
    </PlotlySection>
    <PlotlySection name={_('Canvas')}>
      <ColorPicker label={_('Plot Background')} attr="bgcolor" />
    </PlotlySection>

    <PlotlySection name={_('Bar Options')}>
      <Radio
        label={_('Bar Mode')}
        attr="barmode"
        options={[
          {label: _('Stack'), value: 'stack'},
          {label: _('Overlay'), value: 'overlay'},
        ]}
      />
      <NumericFraction label={_('Bar Padding')} attr="bargap" showSlider />
    </PlotlySection>

    <PlotlySection name={_('Ternary')}>
      <Numeric label={_('Sum')} attr="sum" />
    </PlotlySection>

    <PlotlySection name={_('Polar Sector')}>
      <Numeric label={_('Min')} attr="sector[0]" min={-360} max={360} showSlider />
      <Numeric label={_('Max')} attr="sector[1]" min={-360} max={360} showSlider />
      <NumericFraction label={_('Hole')} attr="hole" min={0} max={100} showSlider />
    </PlotlySection>
  </SubplotAccordion>
);

GraphSubplotsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default GraphSubplotsPanel;

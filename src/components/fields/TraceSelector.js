import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectToContainer,
  traceTypeToPlotlyInitFigure,
  localize,
  plotlyTraceToCustomTrace,
} from 'lib';
import {EDITOR_ACTIONS} from 'lib/constants';
import TraceTypeSelector from 'components/widgets/TraceTypeSelector';

function computeTraceOptionsFromSchema(schema, _, context) {
  // Filter out Polar "area" type as it is fairly broken and we want to present
  // scatter with fill as an "area" chart type for convenience.
  const traceTypes = Object.keys(schema.traces).filter(
    t => !['area', 'scattermapbox'].includes(t)
  );

  // explicit map of all supported trace types (as of plotlyjs 1.32)
  const traceOptions = [
    {value: 'scatter', label: _('Scatter')},
    {value: 'box', label: _('Box')},
    {value: 'bar', label: _('Bar')},
    {value: 'heatmap', label: _('Heatmap')},
    // {value: 'histogram', label: _('Histogram')},
    // {value: 'histogram2d', label: _('2D Histogram')},
    // {value: 'histogram2dcontour', label: _('2D Contour Histogram')},
    {value: 'pie', label: _('Pie')},
    {value: 'contour', label: _('Contour')},
    {value: 'scatterternary', label: _('Ternary Scatter')},
    // {value: 'violin', label: _('Violin')},
    {value: 'scatter3d', label: _('3D Scatter')},
    {value: 'surface', label: _('Surface')},
    {value: 'mesh3d', label: _('3D Mesh')},
    {value: 'scattergeo', label: _('Atlas Map')},
    {value: 'choropleth', label: _('Choropleth')},
    // {value: 'scattergl', label: _('Scatter GL')},
    // {value: 'pointcloud', label: _('Point Cloud')},
    // {value: 'heatmapgl', label: _('Heatmap GL')},
    // {value: 'parcoords', label: _('Parallel Coordinates')},
    // {value: 'sankey', label: _('Sankey')},
    // {value: 'table', label: _('Table')},
    // {value: 'carpet', label: _('Carpet')},
    // {value: 'scattercarpet', label: _('Carpet Scatter')},
    // {value: 'contourcarpet', label: _('Carpet Contour')},
    {value: 'ohlc', label: _('OHLC')},
    {value: 'candlestick', label: _('Candlestick')},
    // {value: 'scatterpolar', label: _('Polar Scatter')},
  ].filter(obj => traceTypes.indexOf(obj.value) !== -1);

  const traceIndex = traceType =>
    traceOptions.findIndex(opt => opt.value === traceType);

  traceOptions.splice(
    traceIndex('scatter') + 1,
    0,
    {label: _('Line'), value: 'line'},
    {label: _('Area'), value: 'area'}
  );

  traceOptions.splice(traceIndex('scatter3d') + 1, 0, {
    label: _('3D Line'),
    value: 'line3d',
  });

  if (context.config && context.config.mapboxAccessToken) {
    traceOptions.push({value: 'scattermapbox', label: _('Satellite Map')});
  }

  return traceOptions;
}

class TraceSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.updatePlot = this.updatePlot.bind(this);

    let fillMeta;
    if (props.getValObject) {
      fillMeta = props.getValObject('fill');
    }
    if (fillMeta) {
      this.fillTypes = fillMeta.values.filter(v => v !== 'none');
    } else {
      this.fillTypes = [
        'tozeroy',
        'tozerox',
        'tonexty',
        'tonextx',
        'toself',
        'tonext',
      ];
    }
    this.setTraceDefaults(
      props.container,
      props.fullContainer,
      props.updateContainer
    );
    this.setLocals(props, context);
  }

  setLocals(props, context) {
    const _ = props.localize;
    if (props.traceOptions) {
      this.traceOptions = props.traceOptions;
    } else if (context.plotSchema) {
      this.traceOptions = computeTraceOptionsFromSchema(
        context.plotSchema,
        _,
        this.context
      );
    } else {
      this.traceOptions = [{label: _('Scatter'), value: 'scatter'}];
    }
    if (props.container) {
      this.fullValue = plotlyTraceToCustomTrace(props.container);
    }
  }

  setTraceDefaults(container, fullContainer, updateContainer) {
    if (
      container &&
      container.uid &&
      !container.mode &&
      fullContainer._fullInput.type === 'scatter'
    ) {
      updateContainer({
        type: 'scatter',
        mode: fullContainer.mode || 'markers',
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {container, fullContainer, updateContainer} = nextProps;
    this.setTraceDefaults(container, fullContainer, updateContainer);
    this.setLocals(nextProps, nextContext);
  }

  updatePlot(value) {

    const {updateContainer} = this.props;
    if (updateContainer) {
      updateContainer(traceTypeToPlotlyInitFigure(value));
    }
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
      options: this.traceOptions,
      clearable: false,
    });
    // Check and see if the advanced slector prop is true
    const {advancedTraceTypeSelector} = this.context;
    if (advancedTraceTypeSelector) {
      return (
        <div
          className="trace-type-select-dropdown__wrapper"
          onClick={() =>
            this.context.openModal(TraceTypeSelector, props)
          }
        >
          <UnconnectedDropdown {...props} />
        </div>
      );
    }

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.contextTypes = {
  openModal: PropTypes.func,
  advancedTraceTypeSelector: PropTypes.bool,
  plotSchema: PropTypes.object,
  config: PropTypes.object,
};

TraceSelector.propTypes = {
  getValObject: PropTypes.func,
  container: PropTypes.object.isRequired,
  fullContainer: PropTypes.object.isRequired,
  fullValue: PropTypes.any.isRequired,
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default connectToContainer(localize(TraceSelector));

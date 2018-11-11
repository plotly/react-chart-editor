'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function computeTraceOptionsFromSchema(schema, _, context) {
  // Filter out Polar "area" type as it is fairly broken and we want to present
  // scatter with fill as an "area" chart type for convenience.
  var traceTypes = Object.keys(schema.traces).filter(function (t) {
    return !['area', 'scattermapbox'].includes(t);
  });

  var traceOptions = [{
    value: 'scatter',
    label: _('Scatter')
  }, {
    value: 'box',
    label: _('Box')
  }, {
    value: 'bar',
    label: _('Bar')
  }, {
    value: 'heatmap',
    label: _('Heatmap')
  }, {
    value: 'histogram',
    label: _('Histogram')
  }, {
    value: 'histogram2d',
    label: _('2D Histogram')
  }, {
    value: 'histogram2dcontour',
    label: _('2D Contour Histogram')
  }, {
    value: 'pie',
    label: _('Pie')
  }, {
    value: 'contour',
    label: _('Contour')
  }, {
    value: 'scatterternary',
    label: _('Ternary Scatter')
  }, {
    value: 'violin',
    label: _('Violin')
  }, {
    value: 'scatter3d',
    label: _('3D Scatter')
  }, {
    value: 'surface',
    label: _('Surface')
  }, {
    value: 'mesh3d',
    label: _('3D Mesh')
  }, {
    value: 'cone',
    label: _('Cone')
  }, {
    value: 'streamtube',
    label: _('Streamtube')
  }, {
    value: 'scattergeo',
    label: _('Atlas Map')
  }, {
    value: 'choropleth',
    label: _('Choropleth')
  }, {
    value: 'scattergl',
    label: _('Scatter GL')
  }, {
    value: 'pointcloud',
    label: _('Point Cloud')
  }, {
    value: 'heatmapgl',
    label: _('Heatmap GL')
  }, {
    value: 'parcoords',
    label: _('Parallel Coordinates')
  }, {
    value: 'sankey',
    label: _('Sankey')
  }, {
    value: 'table',
    label: _('Table')
  }, {
    value: 'carpet',
    label: _('Carpet')
  }, {
    value: 'scattercarpet',
    label: _('Carpet Scatter')
  }, {
    value: 'contourcarpet',
    label: _('Carpet Contour')
  }, {
    value: 'ohlc',
    label: _('OHLC')
  }, {
    value: 'candlestick',
    label: _('Candlestick')
  }, {
    value: 'scatterpolar',
    label: _('Polar Scatter')
  }, {
    value: 'scatterpolargl',
    label: _('Polar Scatter GL')
  }, {
    value: 'barpolar',
    label: _('Polar Bar')
  }].filter(function (obj) {
    return traceTypes.indexOf(obj.value) !== -1;
  });

  var traceIndex = function traceIndex(traceType) {
    return traceOptions.findIndex(function (opt) {
      return opt.value === traceType;
    });
  };

  traceOptions.splice(traceIndex('scatter') + 1, 0, { label: _('Line'), value: 'line' }, { label: _('Area'), value: 'area' }, { label: _('Timeseries'), value: 'timeseries' });

  traceOptions.splice(traceIndex('scatter3d') + 1, 0, {
    label: _('3D Line'),
    value: 'line3d'
  });

  if (context.config && context.config.mapboxAccessToken) {
    traceOptions.push({
      value: 'scattermapbox',
      label: _('Satellite Map')
    });
  }

  return traceOptions;
}

exports.computeTraceOptionsFromSchema = computeTraceOptionsFromSchema;
//# sourceMappingURL=computeTraceOptionsFromSchema.js.map
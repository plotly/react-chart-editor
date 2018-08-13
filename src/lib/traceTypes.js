/**
 * Trace type constants
 */

export const chartCategory = _ => {
  return {
    SIMPLE: {
      value: 'SIMPLE',
      label: _('Simple'),
    },
    CHARTS_3D: {
      value: 'CHARTS_3D',
      label: _('3D charts'),
    },
    FINANCIAL: {
      value: 'FINANCIAL',
      label: _('Finance'),
    },
    DISTRIBUTIONS: {
      value: 'DISTRIBUTIONS',
      label: _('Distributions'),
    },
    MAPS: {
      value: 'MAPS',
      label: _('Maps'),
    },
    SPECIALIZED: {
      value: 'SPECIALIZED',
      label: _('Specialized'),
    },
    THREE_D: {
      value: '3D',
      label: _('3D'),
    },
  };
};

// Layout specification for TraceTypeSelector.js
export const categoryLayout = _ => [
  chartCategory(_).SIMPLE,
  chartCategory(_).DISTRIBUTIONS,
  chartCategory(_).THREE_D,
  chartCategory(_).MAPS,
  chartCategory(_).FINANCIAL,
  chartCategory(_).SPECIALIZED,
];

export const traceTypes = _ => [
  {
    value: 'scatter',
    label: _('Scatter'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'bar',
    label: _('Bar'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'line',
    label: _('Line'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'area',
    label: _('Area'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'heatmap',
    label: _('Heatmap'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'table',
    label: _('Table'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'contour',
    label: _('Contour'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'pie',
    label: _('Pie'),
    category: chartCategory(_).SIMPLE,
  },
  {
    value: 'scatter3d',
    label: _('3D Scatter'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'line3d',
    label: _('3D Line'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'surface',
    label: _('3D Surface'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'cone',
    label: _('Cone'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'streamtube',
    label: _('Streamtube'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'mesh3d',
    label: _('3D Mesh'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'box',
    label: _('Box'),
    category: chartCategory(_).DISTRIBUTIONS,
  },
  {
    value: 'violin',
    label: _('Violin'),
    category: chartCategory(_).DISTRIBUTIONS,
  },
  {
    value: 'histogram',
    label: _('Histogram'),
    category: chartCategory(_).DISTRIBUTIONS,
  },
  {
    value: 'histogram2d',
    label: _('2D Histogram'),
    category: chartCategory(_).DISTRIBUTIONS,
  },
  {
    value: 'histogram2dcontour',
    label: _('2D Contour Histogram'),
    category: chartCategory(_).DISTRIBUTIONS,
  },
  {
    value: 'choropleth',
    label: _('Choropleth'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'scattermapbox',
    label: _('Satellite Map'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'scattergeo',
    label: _('Atlas Map'),
    category: chartCategory(_).MAPS,
  },
  // {
  //   value: 'parcoords',
  //   label: _('Parallel Coordinates'),
  //   category: chartCategory(_).SPECIALIZED,
  // },
  // {
  //   value: 'sankey',
  //   label: _('Sankey'),
  //   category: chartCategory(_).SPECIALIZED,
  // },
  // {
  //   value: 'carpet',
  //   label: _('Carpet'),
  //   category: chartCategory(_).SPECIALIZED,
  // },
  {
    value: 'scatterpolar',
    label: _('Polar Scatter'),
    category: chartCategory(_).SPECIALIZED,
  },
  {
    value: 'scatterternary',
    label: _('Ternary Scatter'),
    category: chartCategory(_).SPECIALIZED,
  },
  {
    value: 'candlestick',
    label: _('Candlestick'),
    category: chartCategory(_).FINANCIAL,
  },
  {
    value: 'ohlc',
    label: _('OHLC'),
    category: chartCategory(_).FINANCIAL,
  },
  // {
  //   value: 'pointcloud',
  //   label: _('Point Cloud'),
  //   category: chartCategory(_).THREE_D,
  // },
  {
    value: 'scattergl',
    icon: 'scatter',
    label: _('Scatter'),
    category: chartCategory(_).THREE_D,
  },
  {
    value: 'scatterpolargl',
    icon: 'scatterpolar',
    label: _('Polar Scatter'),
    category: chartCategory(_).THREE_D,
  },
  // {
  //   value: 'heatmapgl',
  //   icon: 'heatmap',
  //   label: _('Heatmap GL'),
  //   category: chartCategory(_).THREE_D,
  // },
];

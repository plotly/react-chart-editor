/**
 * Trace type constants
 */

export const chartCategory = (_) => {
  return {
    SIMPLE: {
      value: 'SIMPLE',
      label: _('Simple'),
    },
    MAPS: {
      value: 'MAPS',
      label: _('Maps'),
      maxColumns: 1,
    },
  };
};

// Layout specification for TraceTypeSelector.js
export const categoryLayout = (_) => [
  chartCategory(_).SIMPLE,
  chartCategory(_).MAPS,
];

export const traceTypes = (_) => [
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
    value: 'scattermapbox',
    label: _('Tile Map'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'scattergeo',
    label: _('Atlas Map'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'choroplethmapbox',
    label: _('Choropleth Tile Map'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'choropleth',
    label: _('Choropleth Atlas Map'),
    category: chartCategory(_).MAPS,
  },
  {
    value: 'densitymapbox',
    label: _('Density Tile Map'),
    category: chartCategory(_).MAPS,
  },
];

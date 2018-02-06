export const baseClass = 'plotly-editor';

/*
 * Control represents multiple settings (like for several axes)
 * and the values are different.
 *
 * Because this is sometimes used in contexts where users can enter freeform
 * strings, we include a non-printable character (ESC) so it's not something
 * people could type.
 */
export const MULTI_VALUED = '\x1bMIXED_VALUES';

// how mixed values are represented in text inputs
export const MULTI_VALUED_PLACEHOLDER = '---';

export const getMultiValueText = (key, _) => {
  const multiValueText = {
    title: _('Multiple Values'),
    text: _(
      'This input has multiple values associated with it. ' +
        'Changing this setting will override these custom inputs.'
    ),
    subText: _(
      "Common Case: An 'All' tab might display this message " +
        'because the X and Y tabs contain different settings.'
    ),
  };
  return multiValueText[key];
};

export const EDITOR_ACTIONS = {
  UPDATE_TRACES: 'plotly-editor-update-traces',
  ADD_TRACE: 'plotly-editor-add-trace',
  DELETE_TRACE: 'plotly-editor-delete-trace',
  UPDATE_AXIS_REFERENCES: 'plotly-editor-update-axis-references',
  UPDATE_LAYOUT: 'plotly-editor-update-layout',
  DELETE_ANNOTATION: 'plotly-editor-delete-annotation',
  DELETE_SHAPE: 'plotly-editor-delete-shape',
  DELETE_IMAGE: 'plotly-editor-delete-image',
};

export const DEFAULT_FONTS = [
  {label: 'Sans Serif', value: 'sans-serif'},
  {label: 'Serif', value: 'serif'},
  {label: 'Monospaced', value: 'monospace'},
];

export const RETURN_KEY = 'Enter';
export const ESCAPE_KEY = 'Escape';
export const COMMAND_KEY = 'Meta';
export const CONTROL_KEY = 'Control';

export const TRACE_TO_AXIS = {
  cartesian: [
    'scatter',
    'box',
    'bar',
    'heatmap',
    'contour',
    'ohlc',
    'candlestick',
  ],
  ternary: ['scatterternary'],
  gl3d: ['scatter3d', 'surface', 'mesh3d'],
  geo: ['scattergeo', 'choropleth'],
  mapbox: ['scattermapbox'],
};

/**
 * Trace type constants
 */
export const CHART_CLASS = {
  POINTS_2D: 'POINTS_2D',
  TERNARY: 'TERNARY',
  PLOT_3D: 'PLOT_3D',
  GEOGRAPHIC: 'GEOGRAPHIC',
  MAPBOXGL: 'MAPBOXGL',
  SINGLE: 'SINGLE',
  FINANCIAL: 'FINANCIAL',
  TABLE: 'TABLE',
};

// Layout specification for CategorizedSelectTrace
export const CHART_CATEGORY = {
  BUSINESS: 'BUSINESS',
  SCIENCE: 'SCIENCE',
  CHARTS_3D: 'CHARTS_3D',
  FINANCIAL: 'FINANCIAL',
  STATISTICS: 'STATISTICS',
  MAPS: 'MAPS',
};

export const CATEGORY_LAYOUT = [
  {category: CHART_CATEGORY.BUSINESS, label: 'Business'},
  {category: CHART_CATEGORY.SCIENCE, label: 'Science'},
  {category: CHART_CATEGORY.CHARTS_3D, label: '3D charts'},
  {category: CHART_CATEGORY.FINANCIAL, label: 'Finance'},
  {category: CHART_CATEGORY.STATISTICS, label: 'Statistics'},
  {category: CHART_CATEGORY.MAPS, label: 'Maps'},
];

export const TRACE_TYPES = {
  scatter: {
    meta: {
      type: 'scatter',
      label: 'Scatter plot',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.BUSINESS,
    },
  },

  line: {
    meta: {
      type: 'line',
      label: 'Line plot',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.BUSINESS,
    },
  },

  bar: {
    meta: {
      type: 'bar',
      label: 'Bar chart',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.BUSINESS,
    },
  },

  /*
     * NOTE - We're ID'ing this chart as `cartesianArea`
     * to not confuse this chart type with the actual plotly.js
     * chart type 'area' (polar area chart)
     */
  cartesianArea: {
    meta: {
      type: 'cartesianArea',
      label: 'Area Chart',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.BUSINESS,
    },
  },

  errorbars: {
    meta: {
      type: 'errorbars',
      label: 'Error bars',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.SCIENCE,
    },
  },

  histogram: {
    meta: {
      type: 'histogram',
      label: 'Histogram',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.STATISTICS,
    },
  },

  box: {
    meta: {
      type: 'box',
      label: 'Box plot',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.STATISTICS,
    },
  },

  histogram2d: {
    meta: {
      type: 'histogram2d',
      label: '2D Histogram Heatmap',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.STATISTICS,
    },
  },

  scatterternary: {
    meta: {
      type: 'scatterternary',
      label: 'Ternary plot',
      chartClass: CHART_CLASS.TERNARY,
      category: CHART_CATEGORY.SCIENCE,
    },
  },

  choropleth: {
    meta: {
      type: 'choropleth',
      label: 'Choropleth',
      chartClass: CHART_CLASS.GEOGRAPHIC,
      category: CHART_CATEGORY.MAPS,
    },
  },

  scattergeo: {
    meta: {
      type: 'scattergeo',
      label: 'Atlas Maps',
      chartClass: CHART_CLASS.GEOGRAPHIC,
      category: CHART_CATEGORY.MAPS,
    },
  },

  scattermapbox: {
    meta: {
      type: 'scattermapbox',
      label: 'Satellite Maps',
      chartClass: CHART_CLASS.MAPBOXGL,
      category: CHART_CATEGORY.MAPS,
    },
  },

  scatter3d: {
    meta: {
      type: 'scatter3d',
      label: '3D Scatter',
      chartClass: CHART_CLASS.PLOT_3D,
      category: CHART_CATEGORY.CHARTS_3D,
    },
  },

  line3d: {
    meta: {
      type: 'line3d',
      label: '3D Line',
      chartClass: CHART_CLASS.PLOT_3D,
      category: CHART_CATEGORY.CHARTS_3D,
    },
  },

  surface: {
    meta: {
      type: 'surface',
      label: '3D Surface',
      chartClass: CHART_CLASS.PLOT_3D,
      category: CHART_CATEGORY.CHARTS_3D,
    },
  },

  mesh3d: {
    meta: {
      type: 'mesh3d',
      label: '3D Mesh',
      chartClass: CHART_CLASS.PLOT_3D,
      category: CHART_CATEGORY.CHARTS_3D,
    },
  },

  pie: {
    meta: {
      type: 'pie',
      label: 'Pie chart',
      chartClass: CHART_CLASS.SINGLE,
      category: CHART_CATEGORY.BUSINESS,
    },
  },

  animation: {
    meta: {
      type: 'animation',
      label: 'Animation',
      chartClass: CHART_CLASS.POINTS_2D,
      category: CHART_CATEGORY.FINANCIAL,
    },
  },

  timeseries: {
    meta: {
      type: 'timeseries',
      label: 'Time Series',
      chartClass: CHART_CLASS.FINANCIAL,
      category: CHART_CATEGORY.FINANCIAL,
    },
  },

  candlestick: {
    meta: {
      type: 'candlestick',
      label: 'Candlestick Chart',
      chartClass: CHART_CLASS.FINANCIAL,
      category: CHART_CATEGORY.FINANCIAL,
    },
  },

  ohlc: {
    meta: {
      type: 'ohlc',
      label: 'OHLC Chart',
      chartClass: CHART_CLASS.FINANCIAL,
      category: CHART_CATEGORY.FINANCIAL,
    },
  },

  table: {
    meta: {
      type: 'table',
      label: 'Table',
      chartClass: CHART_CLASS.TABLE,
      category: CHART_CATEGORY.STATISTICS,
    },
  },
};

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
  UPDATE_LAYOUT: 'plotly-editor-update-layout',
  DELETE_ANNOTATION: 'plotly-editor-delete-annotation',
  DELETE_SHAPE: 'plotly-editor-delete-shape',
  DELETE_IMAGE: 'plotly-editor-delete-image',
  DELETE_RANGESELECTOR: 'plotly-editor-delete-rangeselector',
  DELETE_TRANSFORM: 'plotly-editor-delete-transform',
  MOVE_TO: 'plotly-editor-move-to',
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

// matches gd._fullLayout._subplots categories except for xaxis & yaxis which
// are in fact cartesian types
export const TRACE_TO_AXIS = {
  cartesian: [
    'scatter',
    'scattergl',
    'box',
    'violin',
    'bar',
    'heatmap',
    'heatmapgl',
    'contour',
    'ohlc',
    'candlestick',
    'histogram',
    'histogram2d',
    'histogram2dcontour',
    'carpet',
    'scattercarpet',
    'contourcarpet',
    'waterfall',
    'funnel',
  ],
  ternary: ['scatterternary'],
  gl3d: ['scatter3d', 'surface', 'mesh3d', 'cone', 'streamtube'],
  geo: ['scattergeo', 'choropleth'],
  mapbox: ['scattermapbox'],
  polar: ['scatterpolar', 'scatterpolargl', 'barpolar'],
};

// Note: scene, and xaxis/yaxis were added for convenience sake even though they're not subplot types
export const SUBPLOT_TO_ATTR = {
  cartesian: {data: ['xaxis', 'yaxis'], layout: ['x', 'y']},
  xaxis: {data: 'xaxis', layout: 'x'},
  yaxis: {data: 'yaxis', layout: 'y'},
  x: {data: 'xaxis', layout: 'x'},
  y: {data: 'yaxis', layout: 'y'},
  ternary: {data: 'subplot', layout: 'ternary'},
  gl3d: {data: 'scene', layout: 'scene'},
  scene: {data: 'scene', layout: 'scene'},
  geo: {data: 'geo', layout: 'geo'},
  mapbox: {data: 'subplot', layout: 'mapbox'},
  polar: {data: 'subplot', layout: 'polar'},
};

export const subplotName = (type, _) =>
  ({
    x: _('X'),
    y: _('Y'),
    ternary: _('Ternary'),
    gl3d: _('Scene'),
    scene: _('Scene'),
    geo: _('Geo'),
    mapbox: _('Mapbox'),
    polar: _('Polar'),
  }[type]);

export const TRANSFORMS_LIST = ['filter', 'groupby', 'aggregate', 'sort'];

export const TRANSFORMABLE_TRACES = [
  'scatter',
  'scattergl',
  'box',
  'violin',
  'bar',
  'ohlc',
  'candlestick',
  'histogram',
  'histogram2d',
  'waterfall',
];

export const TRACES_WITH_GL = ['scatter', 'scatterpolar', 'scattergl', 'scatterpolargl'];

export const COLORS = {
  charcoal: '#444444',
  white: '#ffffff',
  mutedBlue: '#1f77b4',
  safetyOrange: '#ff7f0e',
  cookedAsparagusGreen: '#2ca02c',
  brickRed: '#d62728',
  mutedPurple: '#9467bd',
  chestnutBrown: '#8c564b',
  raspberryYogurtPink: '#e377c2',
  middleGray: '#7f7f7f',
  curryYellowGreen: '#bcbd22',
  blueTeal: '#17becf',
  editorLink: '#447bdc',
  black: '#000000',
};

export const DEFAULT_COLORS = Object.values(COLORS);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var baseClass = exports.baseClass = 'plotly-editor';

/*
 * Control represents multiple settings (like for several axes)
 * and the values are different.
 *
 * Because this is sometimes used in contexts where users can enter freeform
 * strings, we include a non-printable character (ESC) so it's not something
 * people could type.
 */
var MULTI_VALUED = exports.MULTI_VALUED = '\x1bMIXED_VALUES';

// how mixed values are represented in text inputs
var MULTI_VALUED_PLACEHOLDER = exports.MULTI_VALUED_PLACEHOLDER = '---';

var getMultiValueText = exports.getMultiValueText = function getMultiValueText(key, _) {
  var multiValueText = {
    title: _('Multiple Values'),
    text: _('This input has multiple values associated with it. ' + 'Changing this setting will override these custom inputs.'),
    subText: _("Common Case: An 'All' tab might display this message " + 'because the X and Y tabs contain different settings.')
  };
  return multiValueText[key];
};

var EDITOR_ACTIONS = exports.EDITOR_ACTIONS = {
  UPDATE_TRACES: 'plotly-editor-update-traces',
  ADD_TRACE: 'plotly-editor-add-trace',
  DELETE_TRACE: 'plotly-editor-delete-trace',
  UPDATE_LAYOUT: 'plotly-editor-update-layout',
  DELETE_ANNOTATION: 'plotly-editor-delete-annotation',
  DELETE_SHAPE: 'plotly-editor-delete-shape',
  DELETE_IMAGE: 'plotly-editor-delete-image',
  DELETE_RANGESELECTOR: 'plotly-editor-delete-rangeselector',
  DELETE_TRANSFORM: 'plotly-editor-delete-transform'
};

var DEFAULT_FONTS = exports.DEFAULT_FONTS = [{ label: 'Sans Serif', value: 'sans-serif' }, { label: 'Serif', value: 'serif' }, { label: 'Monospaced', value: 'monospace' }];

var RETURN_KEY = exports.RETURN_KEY = 'Enter';
var ESCAPE_KEY = exports.ESCAPE_KEY = 'Escape';
var COMMAND_KEY = exports.COMMAND_KEY = 'Meta';
var CONTROL_KEY = exports.CONTROL_KEY = 'Control';

// matches gd._fullLayout._subplots categories except for xaxis & yaxis which
// are in fact cartesian types
var TRACE_TO_AXIS = exports.TRACE_TO_AXIS = {
  cartesian: ['scatter', 'scattergl', 'box', 'violin', 'bar', 'heatmap', 'heatmapgl', 'contour', 'ohlc', 'candlestick', 'histogram', 'histogram2d', 'histogram2dcontour'],
  ternary: ['scatterternary'],
  gl3d: ['scatter3d', 'surface', 'mesh3d', 'cone', 'streamtube'],
  geo: ['scattergeo', 'choropleth'],
  mapbox: ['scattermapbox'],
  polar: ['scatterpolar', 'scatterpolargl', 'barpolar']
};

// Note: scene, and xaxis/yaxis were added for convenience sake even though they're not subplot types
var SUBPLOT_TO_ATTR = exports.SUBPLOT_TO_ATTR = {
  cartesian: { data: ['xaxis', 'yaxis'], layout: ['x', 'y'] },
  xaxis: { data: 'xaxis', layout: 'x' },
  yaxis: { data: 'yaxis', layout: 'y' },
  x: { data: 'xaxis', layout: 'x' },
  y: { data: 'yaxis', layout: 'y' },
  ternary: { data: 'subplot', layout: 'ternary' },
  gl3d: { data: 'scene', layout: 'scene' },
  scene: { data: 'scene', layout: 'scene' },
  geo: { data: 'geo', layout: 'geo' },
  mapbox: { data: 'subplot', layout: 'mapbox' },
  polar: { data: 'subplot', layout: 'polar' }
};

var subplotName = exports.subplotName = function subplotName(type, _) {
  return {
    x: _('X'),
    y: _('Y'),
    ternary: _('Ternary'),
    gl3d: _('Scene'),
    scene: _('Scene'),
    geo: _('Geo'),
    mapbox: _('Mapbox'),
    polar: _('Polar')
  }[type];
};

var TRANSFORMS_LIST = exports.TRANSFORMS_LIST = ['filter', 'groupby', 'aggregate', 'sort'];

var TRANSFORMABLE_TRACES = exports.TRANSFORMABLE_TRACES = ['scatter', 'scattergl', 'box', 'violin', 'bar', 'ohlc', 'candlestick', 'histogram', 'histogram2d'];

var TRACES_WITH_GL = exports.TRACES_WITH_GL = ['scatter', 'scatterpolar', 'scattergl', 'scatterpolargl'];

var COLORS = exports.COLORS = {
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
  black: '#000000'
};

var DEFAULT_COLORS = exports.DEFAULT_COLORS = [COLORS.charcoal, COLORS.white, COLORS.mutedBlue, COLORS.safetyOrange, COLORS.cookedAsparagusGreen, COLORS.brickRed, COLORS.mutedPurple, COLORS.chestnutBrown, COLORS.raspberryYogurtPink, COLORS.middleGray, COLORS.curryYellowGreen, COLORS.blueTeal];
//# sourceMappingURL=constants.js.map
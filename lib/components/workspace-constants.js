'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var CLEAR_WORKSPACE = exports.CLEAR_WORKSPACE = 'WORKSPACE_CLEAR_WORKSPACE';

var EDIT_MODE = exports.EDIT_MODE = {
    ANALYSIS: 'WORKSPACE_EDIT_MODE_ANALYSIS',
    GRAPH: 'WORKSPACE_EDIT_MODE_GRAPH',
    STYLE: 'WORKSPACE_EDIT_MODE_STYLE',
    SHARE: 'WORKSPACE_EDIT_MODE_SHARE',
    EXPORT: 'WORKSPACE_EDIT_MODE_EXPORT',
    JSON: 'WORKSPACE_EDIT_MODE_JSON'
};

var STYLE_MODE = exports.STYLE_MODE = {
    TRACES: 'WORKSPACE_STYLE_MODE_TRACES',
    LAYOUT: 'WORKSPACE_STYLE_MODE_LAYOUT',
    NOTES: 'WORKSPACE_STYLE_MODE_NOTES',
    AXES: 'WORKSPACE_STYLE_MODE_AXES',
    LEGEND: 'WORKSPACE_STYLE_MODE_LEGEND',
    COLOR_BARS: 'WORKSPACE_STYLE_MODE_COLOR_BARS',
    SHAPES: 'WORKSPACE_STYLE_MODE_SHAPES',
    MAPBOX_LAYERS: 'WORKSPACE_STYLE_MODE_MAPBOX_LAYERS',
    IMAGES: 'WORKSPACE_STYLE_MODE_IMAGES',
    MOBILE: 'WORKSPACE_STYLE_MODE_MOBILE'
};

var GRAPH_MODE = exports.GRAPH_MODE = {
    CREATE: 'WORKSPACE_GRAPH_MODE_CREATE',
    FILTER: 'WORKSPACE_GRAPH_MODE_FILTER',
    GROUPBY: 'WORKSPACE_GRAPH_MODE_GROUPBY'
};

var ADD_PLOT_ID = exports.ADD_PLOT_ID = 'WORKSPACE_ADD_PLOT_ID';
var ADD_PLOT_SOURCE = exports.ADD_PLOT_SOURCE = 'WORKSPACE_ADD_PLOT_SOURCE';
var ADD_PLOT_SOURCE_SHARE_KEY = exports.ADD_PLOT_SOURCE_SHARE_KEY = 'WORKSPACE_ADD_PLOT_SOURCE_SHARE_KEY';
var UPDATE_PLOT_DIRTY = exports.UPDATE_PLOT_DIRTY = 'WORKSPACE_UPDATE_PLOT_DIRTY';

var ADD_SHARE_FID = exports.ADD_SHARE_FID = 'WORKSPACE_ADD_SHARE_FID';

// Spec used to create the EditModeMenu Buttons
var EDIT_MODE_MENU_ITEMS = exports.EDIT_MODE_MENU_ITEMS = [{
    mode: EDIT_MODE.GRAPH,
    text: 'Graph',
    refName: 'graphModeToggle'
}, {
    mode: EDIT_MODE.STYLE,
    text: 'Style',
    refName: 'styleModeToggle'
}, {
    mode: EDIT_MODE.ANALYSIS,
    text: 'Analysis',
    refName: 'analysisModeToggle'
}, {
    mode: EDIT_MODE.JSON,
    text: 'JSON',
    refName: 'jsonModeToggle'
}, {
    mode: EDIT_MODE.EXPORT,
    text: 'Export',
    refName: 'exportModeToggle'
}];

var STYLE_MODE_MENU_ITEMS = exports.STYLE_MODE_MENU_ITEMS = [{
    mode: STYLE_MODE.TRACES,
    text: 'Traces',
    refName: 'tracesStyleModeToggle'
}, {
    mode: STYLE_MODE.LAYOUT,
    text: 'Layout',
    refName: 'layoutStyleModeToggle'
}, {
    mode: STYLE_MODE.NOTES,
    text: 'Notes',
    refName: 'notesStyleModeToggle'
}, {
    mode: STYLE_MODE.AXES,
    text: 'Axes',
    refName: 'axesStyleModeToggle'
}, {
    mode: STYLE_MODE.LEGEND,
    text: 'Legend',
    refName: 'legendStyleModeToggle'
}, {
    mode: STYLE_MODE.COLOR_BARS,
    text: 'Color Bars',
    refName: 'colorBarsStyleModeToggle'
}, {
    mode: STYLE_MODE.SHAPES,
    text: 'Shapes',
    refName: 'shapesStyleModeToggle'
}, {
    mode: STYLE_MODE.MAPBOX_LAYERS,
    text: 'GeoJSON',
    refName: 'mapboxLayersToggle'
}, {
    mode: STYLE_MODE.IMAGES,
    text: 'Images',
    refName: 'imagesStyleModeToggle'
}, {
    mode: STYLE_MODE.MOBILE,
    text: 'Mobile',
    refName: 'MobileStyleModeToggle'
}];

var GRAPH_MODE_MENU_ITEMS = exports.GRAPH_MODE_MENU_ITEMS = [{
    mode: GRAPH_MODE.CREATE,
    text: 'create',
    refName: 'createGraphModeToggle'
}, {
    mode: GRAPH_MODE.FILTER,
    text: 'filter',
    refName: 'filterGraphModeToggle'
}, {
    mode: GRAPH_MODE.GROUPBY,
    text: 'group',
    refName: 'groupbyGraphModeToggle'
}];

// temp / saved state of fids and column uids
var UPDATE_COLUMN_ID_MAP = exports.UPDATE_COLUMN_ID_MAP = 'WORKSPACE_UPDATE_COLUMN_ID_MAP';
var UPDATE_FID_MAP = exports.UPDATE_FID_MAP = 'WORKSPACE_UPDATE_FID_MAP';
var UPDATE_LAST_SAVED = exports.UPDATE_LAST_SAVED = 'WORKSPACE_UPDATE_LAST_SAVED';
var MARK_FID_AS_UNSAVED = exports.MARK_FID_AS_UNSAVED = 'WORKSPACE_MARK_FID_AS_UNSAVED';
var REMOVE_COLUMN_IDS_FROM_COLUMN_ID_MAP = exports.REMOVE_COLUMN_IDS_FROM_COLUMN_ID_MAP = 'WORKSPACE_REMOVE_COLUMN_IDS_FROM_COLUMN_ID_MAP';

// panels
var EDIT_MODES = exports.EDIT_MODES = Object.keys(EDIT_MODE).map(function (k) {
    return EDIT_MODE[k];
});
var STYLE_MODES = exports.STYLE_MODES = Object.keys(STYLE_MODE).map(function (k) {
    return STYLE_MODE[k];
});
var GRAPH_MODES = exports.GRAPH_MODES = Object.keys(GRAPH_MODE).map(function (k) {
    return GRAPH_MODE[k];
});
var SELECT_EDIT_MODE = exports.SELECT_EDIT_MODE = 'WORKSPACE_SELECT_EDIT_MODE';
var SELECT_STYLE_MODE = exports.SELECT_STYLE_MODE = 'WORKSPACE_SELECT_STYLE_MODE';
var SELECT_GRAPH_MODE = exports.SELECT_GRAPH_MODE = 'WORKSPACE_SELECT_GRAPH_MODE';

// figure
var ADD_BREAKPOINT = exports.ADD_BREAKPOINT = 'WORKSPACE_ADD_BREAKPOINT';
var DELETE_BREAKPOINT = exports.DELETE_BREAKPOINT = 'WORKSPACE_DELETE_BREAKPOINT';
var PLOTLY_RELAYOUT = exports.PLOTLY_RELAYOUT = 'WORKSPACE_RELAYOUT';
var PLOTLY_RESTYLE = exports.PLOTLY_RESTYLE = 'WORKSPACE_RESTYLE';
var PLOTLY_NEW_PLOT = exports.PLOTLY_NEW_PLOT = 'WORKSPACE_NEW_PLOT';
var PLOTLY_ADD_FRAMES = exports.PLOTLY_ADD_FRAMES = 'WORKSPACE_ADD_FRAMES';
var PLOTLY_DELETE_FRAMES = exports.PLOTLY_DELETE_FRAMES = 'WORKSPACE_DELETE_FRAMES';
var SELECT_FRAME = exports.SELECT_FRAME = 'WORKSPACE_SELECT_FRAME';
var SET_BASE_LAYOUT = exports.SET_BASE_LAYOUT = 'WORKSPACE_SET_BASE_LAYOUT';
var SET_BREAKPOINT = exports.SET_BREAKPOINT = 'WORKSPACE_SET_BREAKPOINT';

// annotations
var INLINE_STYLE_LINK = exports.INLINE_STYLE_LINK = 'LINK';
var INLINE_STYLE_SUPER = exports.INLINE_STYLE_SUPER = 'SUPERSCRIPT';
var INLINE_STYLE_SUB = exports.INLINE_STYLE_SUB = 'SUBSCRIPT';

// columns and tables
var MERGE_COLUMNS_AND_TABLES = exports.MERGE_COLUMNS_AND_TABLES = 'WORKSPACE_MERGE_COLUMNS_AND_TABLES';
var UPDATE_TABLE = exports.UPDATE_TABLE = 'UPDATE_TABLE';
var ADD_EMPTY_TABLE = exports.ADD_EMPTY_TABLE = 'WORKSPACE_ADD_EMTPY_TABLE';
var SELECT_TABLE = exports.SELECT_TABLE = 'WORKSPACE_SELECT_TABLE';
var OVERWRITE_SOURCE = exports.OVERWRITE_SOURCE = 'WORKSPACE_OVERWRITE_SOURCE';
var REMOVE_TABLE = exports.REMOVE_TABLE = 'WORKSPACE_REMOVE_TABLE';
var REMOVE_COLUMNS_FROM_TABLE = exports.REMOVE_COLUMNS_FROM_TABLE = 'WORKSPACE_REMOVE_COLUMNS_FROM_TABLE';

// encoding
var ASSIGN_COLUMN = exports.ASSIGN_COLUMN = 'WORKSPACE_ASSIGN_COLUMN';
var SWITCH_CHART_TYPE = exports.SWITCH_CHART_TYPE = 'WORKSPACE_SWITCH_CHART_TYPE';
var NEW_ENCODING_LAYER = exports.NEW_ENCODING_LAYER = 'WORKSPACE_NEW_ENCODING_LAYER';
var REMOVE_ENCODING_LAYER = exports.REMOVE_ENCODING_LAYER = 'WORKSPACE_REMOVE_ENCODING_LAYER';
var SET_ENCODING = exports.SET_ENCODING = 'WORKSPACE_SET_ENCODING';
var DEFAULT_ENCODING_TYPE = exports.DEFAULT_ENCODING_TYPE = 'scatter';

// analyses
var UPDATE_ANALYSIS = exports.UPDATE_ANALYSIS = 'WORKSPACE_UPDATE_ANALYSIS';
var ADD_ANALYSIS = exports.ADD_ANALYSIS = 'WORKSPACE_ADD_ANALYSIS';
var REMOVE_ANALYSIS = exports.REMOVE_ANALYSIS = 'WORKSPACE_REMOVE_ANALYSIS';
var UPDATE_ANALYSIS_META = exports.UPDATE_ANALYSIS_META = 'WORKSPACE_UPDATE_ANALYSIS_META';

// HOT
var MAX_HOT_ROWS = exports.MAX_HOT_ROWS = 5000;
var CONTEXT_MENU_SOURCE = exports.CONTEXT_MENU_SOURCE = 'WORKSPACE_CONTEXT_MENU_SOURCE';
var SORT_SOURCE = exports.SORT_SOURCE = 'WORKSPACE_SORT_SOURCE';
var INSERT_HEADERS_ABOVE_SOURCE = exports.INSERT_HEADERS_ABOVE_SOURCE = 'WORKSPACE_INSERT_HEADERS_ABOVE_SOURCE';
var CONTEXT_MENU_KEYS = exports.CONTEXT_MENU_KEYS = {
    CLEAR_HEADERS: 'WORKSPACE_CONTEXT_MENU_KEYS_CLEAR_HEADERS',
    COL_LEFT: 'WORKSPACE_CONTEXT_MENU_KEYS_COL_LEFT',
    COL_RIGHT: 'WORKSPACE_CONTEXT_MENU_KEYS_COL_RIGHT',
    INSERT_HEADERS_ABOVE: 'WORKSPACE_CONTEXT_MENU_KEYS_INSERT_HEADERS_ABOVE',
    REMOVE_COL: 'WORKSPACE_CONTEXT_MENU_KEYS_REMOVE_COL',
    REMOVE_ROW: 'WORKSPACE_CONTEXT_MENU_KEYS_REMOVE_ROW',
    RENAME_HEADER: 'WORKSPACE_CONTEXT_MENU_KEYS_RENAME_HEADER',
    RESET_SORT: 'WORKSPACE_CONTEXT_MENU_KEYS_RESET_SORT',
    ROW_ABOVE: 'WORKSPACE_CONTEXT_MENU_KEYS_ROW_ABOVE',
    ROW_BELOW: 'WORKSPACE_CONTEXT_MENU_KEYS_ROW_BELOW',
    SET_HEADERS: 'WORKSPACE_CONTEXT_MENU_KEYS_SET_HEADERS',
    SORT_ASCENDING: 'WORKSPACE_CONTEXT_MENU_KEYS_SORT_ASCENDING',
    SORT_DESCENDING: 'WORKSPACE_CONTEXT_MENU_KEYS_SORT_DESCENDING',
    TRANSPOSE_TABLE: 'WORKSPACE_CONTEXT_MENU_KEYS_TRANSPOSE_TABLE'
};

// style panels
var CONTROL_TYPES = exports.CONTROL_TYPES = {
    FONT: 'FONT',
    COLOR: 'COLOR',
    ANCHOR_SELECTOR: 'ANCHOR_SELECTOR',
    DASH: 'DASH',
    SYMBOL: 'SYMBOL',
    RADIO: 'RADIO',
    TEXTAREA: 'TEXTAREA',
    ANNOTATION_EDITOR: 'ANNOTATION_EDITOR',
    MAPBOX_ACCESS_TOKEN: 'MAPBOX_ACCESS_TOKEN',
    NUMERIC_INPUT: 'NUMERIC_INPUT',
    FLAGLIST_CHECKBOX: 'FLAGLIST_CHECKBOX',
    COLUMN_INPUT: 'COLUMN_INPUT',
    COLOR_PALETTE: 'COLOR_PALETTE',
    DATETIME_INPUT: 'DATETIME_INPUT',
    DATETIME_DURATION: 'DATETIME_DURATION',
    DROPDOWN_SELECTOR: 'DROPDOWN_SELECTOR',
    DROPDOWN_WITH_TEXT_INPUT: 'DROPDOWN_WITH_TEXT_INPUT',
    RANGE: 'RANGE',
    SLIDER: 'SLIDER',
    INPUT_SLIDER: 'INPUT_SLIDER',
    BUTTON: 'BUTTON',
    RANGE_SELECTOR_BUTTONS: 'RANGE_SELECTOR_BUTTONS',
    TEXT_INPUT: 'TEXT_INPUT',
    UPLOAD_SHAPE_FILE: 'UPLOAD_SHAPE_FILE',
    UPLOAD_IMAGE_FILE: 'UPLOAD_IMAGE_FILE',
    REF_CONTROL: 'REF_CONTROL',
    ANCHOR: 'ANCHOR',
    MAPBOX_STYLE_URL: 'MAPBOX_STYLE_URL',
    ORIENTATION: 'ORIENTATION',
    NOTE: 'NOTE',
    ARROW: 'ARROW'
};

// encoding panel
var ENCODING_ATTRIBUTE_TYPES = exports.ENCODING_ATTRIBUTE_TYPES = {
    PLOTLYJS: 'PLOTLYJS',
    ENCODING: 'ENCODING'
};

/*
 * Control represents multiple settings (like for several axes)
 * and the values are different.
 *
 * Because this is sometimes used in contexts where users can enter freeform
 * strings, we include a non-printable character (ESC) so it's not something
 * people could type.
 */
var MIXED_VALUES = exports.MIXED_VALUES = '\x1bMIXED_VALUES';

// how mixed values are represented in text inputs
var MIXED_MODE_VALUE = exports.MIXED_MODE_VALUE = '-';

// import modal
var IMPORT_MODES = exports.IMPORT_MODES = {
    EXAMPLES: 'EXAMPLES',
    SQL: 'SQL',
    URL: 'URL',
    UPLOAD: 'UPLOAD'
};

var ORG_IMPORT_MODES = exports.ORG_IMPORT_MODES = {

    DATASET: 'DATASET',
    NOTEBOOK: 'NOTEBOOK',
    PRESENTATION: 'PRESENTATION'
};

var IMPORT_EXAMPLE_URL = exports.IMPORT_EXAMPLE_URL = 'https://raw.githubusercontent.com/plotly/datasets/master/iris.csv';

var CHART_TYPE_ICON = exports.CHART_TYPE_ICON = {
    animation: 'icon-animation',
    area: 'icon-plot-area',
    bar: 'icon-plot-bar',
    box: 'icon-plot-box',
    candlestick: 'icon-candlestick',
    cartesianArea: 'icon-plot-area',
    choropleth: 'icon-choropleth',
    contour: 'icon-contour',
    errorbars: 'icon-error-bars',
    heatmap: 'icon-plot-heatmap',
    histogram2d: 'icon-plot-2d-hist',
    histogram2dcontour: 'icon-plot-2d-hist',
    histogram: 'icon-plot-hist',
    line: 'icon-plot-line',
    mesh3d: 'icon-mesh3d',
    ohlc: 'icon-ohlc',
    pie: 'icon-pie-chart',
    scatter3d: 'icon-plot-3d-scatter',
    line3d: 'icon-plot-3d-line',
    scatter: 'icon-plot-scatter',
    scattergeo: 'icon-scatter-chart',
    scattermapbox: 'icon-scatter-chart',
    scatterternary: 'icon-ternary-scatter',
    surface: 'icon-plot-3d-surface',
    timeseries: 'icon-time-series'
};

var ALL_AXES = exports.ALL_AXES = [{
    axisTypeIdentifier: 'AxesSpec',
    typeQuery: 'cartesian',
    identifier: 'xaxis',
    defaultAxis: 'xaxis',
    options: [{ value: 'allaxes', label: 'All', title: 'All Axes' }, { value: 'xaxis', label: 'X', title: 'X Axes', singular: 'X axis' }, { value: 'yaxis', label: 'Y', title: 'Y Axes', singular: 'Y axis' }]
}, {
    axisTypeIdentifier: 'AxesSpec',
    typeQuery: 'gl2d',
    identifier: 'xaxis',
    defaultAxis: 'xaxis',
    options: [{ value: 'allaxes', label: 'All', title: 'All Axes' }, { value: 'xaxis', label: 'X', title: 'X Axes', singular: 'X axis' }, { value: 'yaxis', label: 'Y', title: 'Y Axes', singular: 'Y axis' }]
}, {
    axisTypeIdentifier: 'GeoSpec',
    typeQuery: 'geo',
    identifier: 'geo',
    defaultAxis: 'lonaxis',
    options: [{ value: 'lataxis', label: 'Latitude', title: 'Latitude' }, { value: 'lonaxis', label: 'Longitude', title: 'Longitude' }]
}, {
    axisTypeIdentifier: 'SceneSpec',
    typeQuery: 'gl3d',
    identifier: 'scene',
    defaultAxis: 'xaxis',
    options: [{ value: 'allaxes', label: 'All', title: 'All Axes' }, { value: 'xaxis', label: 'X', title: 'X Axes', singular: 'X axis' }, { value: 'yaxis', label: 'Y', title: 'Y Axes', singular: 'Y axis' }, { value: 'zaxis', label: 'Z', title: 'Z Axes', singular: 'Z axis' }]
}, {
    axisTypeIdentifier: 'TernarySpec',
    typeQuery: 'ternary',
    identifier: 'ternary',
    defaultAxis: 'aaxis',
    options: [{ value: 'aaxis', label: 'A', title: 'A Axes', singular: 'A Axis' }, { value: 'baxis', label: 'B', title: 'B Axes', singular: 'B Axis' }, { value: 'caxis', label: 'C', title: 'C Axes', singular: 'C Axis' }]
}, {
    typeQuery: 'pie',
    options: 'NO_AXES'
}];

// Layout specification for CategorizedSelectTrace
var CHART_CATEGORY = exports.CHART_CATEGORY = {
    BUSINESS: 'BUSINESS',
    SCIENCE: 'SCIENCE',
    CHARTS_3D: 'CHARTS_3D',
    FINANCIAL: 'FINANCIAL',
    STATISTICS: 'STATISTICS',
    MAPS: 'MAPS'
};

var CATEGORY_LAYOUT = exports.CATEGORY_LAYOUT = [{ category: CHART_CATEGORY.BUSINESS, label: 'Business' }, { category: CHART_CATEGORY.SCIENCE, label: 'Science' }, { category: CHART_CATEGORY.CHARTS_3D, label: '3d charts' }, { category: CHART_CATEGORY.FINANCIAL, label: 'Finance' }, { category: CHART_CATEGORY.STATISTICS, label: 'Statistics' }, { category: CHART_CATEGORY.MAPS, label: 'Maps' }];

// ShareModalTabs
var SHARE_MODAL_TAB_OPTIONS = exports.SHARE_MODAL_TAB_OPTIONS = {
    LINK_AND_PRIVACY: 'Link & Privacy',
    COLLABORATORS: 'Collaborate',
    EMBED: 'Embed'
};

var SHARE_MODAL_TABS = exports.SHARE_MODAL_TABS = Object.keys(SHARE_MODAL_TAB_OPTIONS).map(function (k) {
    return SHARE_MODAL_TAB_OPTIONS[k];
});

// 1x1px transparent gif: https://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
var IMAGE_PLACEHOLDER = exports.IMAGE_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

var MAPBOX_ERROR_TYPES = exports.MAPBOX_ERROR_TYPES = {
    INVALID_JSON: 'INVALID_JSON',
    FAILED_REQUEST: 'FAILED_REQUEST',
    FAILED_PARSING: 'FAILED_PARSING',
    UNKNOWN: 'UNKNOWN'
};

var WORKSPACE_PLOT_ID = exports.WORKSPACE_PLOT_ID = 'js-main-plotly-workspace-plot';

var WORKSPACE_CONTAINER = exports.WORKSPACE_CONTAINER = document.getElementById('main');
var WORKSPACE_PLACEHOLDER = exports.WORKSPACE_PLACEHOLDER = document.getElementById('placeholderworkspace');

var IS_TRANSFORM = true;

// quadruplet containing [CONSTANT_NAME TYPE LABEL IS_TRANSFORM].
var ANALYSES = exports.ANALYSES = [['DESCRIPTIVE', 'descriptive-statistics', 'Descriptive statistics', !IS_TRANSFORM], ['ANOVA_TEST', 'anova', 'ANOVA', !IS_TRANSFORM], ['CHI_SQUARED_TEST', 'chi-squared-test', 'Chi-squared test', !IS_TRANSFORM], ['T_TEST', 't-test', 'T-test (two-tailed, independent)', !IS_TRANSFORM], ['CORRELATION', 'column-correlation', 'Column correlation', !IS_TRANSFORM], ['FIT', 'fit', 'Curve fitting', IS_TRANSFORM], ['AVERAGE', 'average', 'Average', IS_TRANSFORM], ['MOVING_AVERAGE', 'moving-average', 'Moving average', IS_TRANSFORM]];

var ANALYSES_TYPES = exports.ANALYSES_TYPES = ANALYSES.reduce(function (accum, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        type = _ref2[1];

    accum[name] = type;
    return accum;
}, {});

var ANALYSES_TYPES_TO_LABELS = exports.ANALYSES_TYPES_TO_LABELS = ANALYSES.reduce(function (accum, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 3),
        type = _ref4[1],
        label = _ref4[2];

    accum[type] = label;
    return accum;
}, {});

// used by WorkspaceActions to search for linked transforms inside traces
var TRANSFORM_TYPES = exports.TRANSFORM_TYPES = ANALYSES.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 4),
        isTransform = _ref6[3];

    return isTransform;
}).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        type = _ref8[1];

    return type;
});

/*
 * Constants relating to the user interface
 */

var RETURN_KEY = exports.RETURN_KEY = 'Enter';
var ESCAPE_KEY = exports.ESCAPE_KEY = 'Escape';
var COMMAND_KEY = exports.COMMAND_KEY = 'Meta';
var CONTROL_KEY = exports.CONTROL_KEY = 'Control';
//# sourceMappingURL=workspace-constants.js.map
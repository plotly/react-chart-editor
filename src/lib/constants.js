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

export const multiValueText = {
  title: 'Multiple Values',
  text:
    'This input has multiple values associated with it. ' +
    'Changing this setting will override these custom inputs.',
  subText:
    "Common Case: An 'All' tab might display this message " +
    'because the X and Y tabs contain different settings.',
};

/*
export const CLEAR_WORKSPACE = "WORKSPACE_CLEAR_WORKSPACE";

export const EDIT_MODE = {
  ANALYSIS: "WORKSPACE_EDIT_MODE_ANALYSIS",
  GRAPH: "WORKSPACE_EDIT_MODE_GRAPH",
  STYLE: "WORKSPACE_EDIT_MODE_STYLE",
  SHARE: "WORKSPACE_EDIT_MODE_SHARE",
  EXPORT: "WORKSPACE_EDIT_MODE_EXPORT",
  JSON: "WORKSPACE_EDIT_MODE_JSON",
};

export const STYLE_MODE = {
  TRACES: "WORKSPACE_STYLE_MODE_TRACES",
  LAYOUT: "WORKSPACE_STYLE_MODE_LAYOUT",
  NOTES: "WORKSPACE_STYLE_MODE_NOTES",
  AXES: "WORKSPACE_STYLE_MODE_AXES",
  LEGEND: "WORKSPACE_STYLE_MODE_LEGEND",
  COLOR_BARS: "WORKSPACE_STYLE_MODE_COLOR_BARS",
  SHAPES: "WORKSPACE_STYLE_MODE_SHAPES",
  MAPBOX_LAYERS: "WORKSPACE_STYLE_MODE_MAPBOX_LAYERS",
  IMAGES: "WORKSPACE_STYLE_MODE_IMAGES",
  MOBILE: "WORKSPACE_STYLE_MODE_MOBILE",
};

export const GRAPH_MODE = {
  CREATE: "WORKSPACE_GRAPH_MODE_CREATE",
  FILTER: "WORKSPACE_GRAPH_MODE_FILTER",
  GROUPBY: "WORKSPACE_GRAPH_MODE_GROUPBY",
};

export const ADD_PLOT_ID = "WORKSPACE_ADD_PLOT_ID";
export const ADD_PLOT_SOURCE = "WORKSPACE_ADD_PLOT_SOURCE";
export const ADD_PLOT_SOURCE_SHARE_KEY = "WORKSPACE_ADD_PLOT_SOURCE_SHARE_KEY";
export const UPDATE_PLOT_DIRTY = "WORKSPACE_UPDATE_PLOT_DIRTY";

export const ADD_SHARE_FID = "WORKSPACE_ADD_SHARE_FID";

// Spec used to create the EditSidebar Buttons
export const EDIT_MODE_MENU_ITEMS = [
  {
    mode: EDIT_MODE.GRAPH,
    text: "Graph",
  },
  {
    mode: EDIT_MODE.STYLE,
    text: "Style",
  },
  {
    mode: EDIT_MODE.ANALYSIS,
    text: "Analysis",
  },
  {
    mode: EDIT_MODE.JSON,
    text: "JSON",
  },
  {
    mode: EDIT_MODE.EXPORT,
    text: "Export",
  },
];

export const STYLE_MODE_MENU_ITEMS = [
  {
    mode: STYLE_MODE.TRACES,
    text: "Traces",
  },
  {
    mode: STYLE_MODE.LAYOUT,
    text: "Layout",
  },
  {
    mode: STYLE_MODE.NOTES,
    text: "Notes",
  },
  {
    mode: STYLE_MODE.AXES,
    text: "Axes",
  },
  {
    mode: STYLE_MODE.LEGEND,
    text: "Legend",
  },
  {
    mode: STYLE_MODE.COLOR_BARS,
    text: "Color Bars",
  },
  {
    mode: STYLE_MODE.SHAPES,
    text: "Shapes",
  },
  {
    mode: STYLE_MODE.MAPBOX_LAYERS,
    text: "GeoJSON",
  },
  {
    mode: STYLE_MODE.IMAGES,
    text: "Images",
  },
  {
    mode: STYLE_MODE.MOBILE,
    text: "Mobile",
  },
];

export const GRAPH_MODE_MENU_ITEMS = [
  {
    mode: GRAPH_MODE.CREATE,
    text: "create",
  },
  {
    mode: GRAPH_MODE.FILTER,
    text: "filter",
  },
  {
    mode: GRAPH_MODE.GROUPBY,
    text: "group",
  },
];

// temp / saved state of fids and column uids
export const UPDATE_COLUMN_ID_MAP = "WORKSPACE_UPDATE_COLUMN_ID_MAP";
export const UPDATE_FID_MAP = "WORKSPACE_UPDATE_FID_MAP";
export const UPDATE_LAST_SAVED = "WORKSPACE_UPDATE_LAST_SAVED";
export const MARK_FID_AS_UNSAVED = "WORKSPACE_MARK_FID_AS_UNSAVED";
export const REMOVE_COLUMN_IDS_FROM_COLUMN_ID_MAP =
  "WORKSPACE_REMOVE_COLUMN_IDS_FROM_COLUMN_ID_MAP";

// panels
export const EDIT_MODES = Object.keys(EDIT_MODE).map(k => EDIT_MODE[k]);
export const STYLE_MODES = Object.keys(STYLE_MODE).map(k => STYLE_MODE[k]);
export const GRAPH_MODES = Object.keys(GRAPH_MODE).map(k => GRAPH_MODE[k]);
export const SELECT_EDIT_MODE = "WORKSPACE_SELECT_EDIT_MODE";
export const SELECT_STYLE_MODE = "WORKSPACE_SELECT_STYLE_MODE";
export const SELECT_GRAPH_MODE = "WORKSPACE_SELECT_GRAPH_MODE";

// figure
export const ADD_BREAKPOINT = "WORKSPACE_ADD_BREAKPOINT";
export const DELETE_BREAKPOINT = "WORKSPACE_DELETE_BREAKPOINT";
export const PLOTLY_RELAYOUT = "WORKSPACE_RELAYOUT";
export const PLOTLY_RESTYLE = "WORKSPACE_RESTYLE";
export const PLOTLY_NEW_PLOT = "WORKSPACE_NEW_PLOT";
export const PLOTLY_ADD_FRAMES = "WORKSPACE_ADD_FRAMES";
export const PLOTLY_DELETE_FRAMES = "WORKSPACE_DELETE_FRAMES";
export const SELECT_FRAME = "WORKSPACE_SELECT_FRAME";
export const SET_BASE_LAYOUT = "WORKSPACE_SET_BASE_LAYOUT";
export const SET_BREAKPOINT = "WORKSPACE_SET_BREAKPOINT";

// annotations
export const INLINE_STYLE_LINK = "LINK";
export const INLINE_STYLE_SUPER = "SUPERSCRIPT";
export const INLINE_STYLE_SUB = "SUBSCRIPT";

// columns and tables
export const MERGE_COLUMNS_AND_TABLES = "WORKSPACE_MERGE_COLUMNS_AND_TABLES";
export const UPDATE_TABLE = "UPDATE_TABLE";
export const ADD_EMPTY_TABLE = "WORKSPACE_ADD_EMTPY_TABLE";
export const SELECT_TABLE = "WORKSPACE_SELECT_TABLE";
export const OVERWRITE_SOURCE = "WORKSPACE_OVERWRITE_SOURCE";
export const REMOVE_TABLE = "WORKSPACE_REMOVE_TABLE";
export const REMOVE_COLUMNS_FROM_TABLE = "WORKSPACE_REMOVE_COLUMNS_FROM_TABLE";

// encoding
export const ASSIGN_COLUMN = "WORKSPACE_ASSIGN_COLUMN";
export const SWITCH_CHART_TYPE = "WORKSPACE_SWITCH_CHART_TYPE";
export const NEW_ENCODING_LAYER = "WORKSPACE_NEW_ENCODING_LAYER";
export const REMOVE_ENCODING_LAYER = "WORKSPACE_REMOVE_ENCODING_LAYER";
export const SET_ENCODING = "WORKSPACE_SET_ENCODING";
export const DEFAULT_ENCODING_TYPE = "scatter";

// analyses
export const UPDATE_ANALYSIS = "WORKSPACE_UPDATE_ANALYSIS";
export const ADD_ANALYSIS = "WORKSPACE_ADD_ANALYSIS";
export const REMOVE_ANALYSIS = "WORKSPACE_REMOVE_ANALYSIS";
export const UPDATE_ANALYSIS_META = "WORKSPACE_UPDATE_ANALYSIS_META";

// HOT
export const MAX_HOT_ROWS = 5000;
export const CONTEXT_MENU_SOURCE = "WORKSPACE_CONTEXT_MENU_SOURCE";
export const SORT_SOURCE = "WORKSPACE_SORT_SOURCE";
export const INSERT_HEADERS_ABOVE_SOURCE =
  "WORKSPACE_INSERT_HEADERS_ABOVE_SOURCE";
export const CONTEXT_MENU_KEYS = {
  CLEAR_HEADERS: "WORKSPACE_CONTEXT_MENU_KEYS_CLEAR_HEADERS",
  COL_LEFT: "WORKSPACE_CONTEXT_MENU_KEYS_COL_LEFT",
  COL_RIGHT: "WORKSPACE_CONTEXT_MENU_KEYS_COL_RIGHT",
  INSERT_HEADERS_ABOVE: "WORKSPACE_CONTEXT_MENU_KEYS_INSERT_HEADERS_ABOVE",
  REMOVE_COL: "WORKSPACE_CONTEXT_MENU_KEYS_REMOVE_COL",
  REMOVE_ROW: "WORKSPACE_CONTEXT_MENU_KEYS_REMOVE_ROW",
  RENAME_HEADER: "WORKSPACE_CONTEXT_MENU_KEYS_RENAME_HEADER",
  RESET_SORT: "WORKSPACE_CONTEXT_MENU_KEYS_RESET_SORT",
  ROW_ABOVE: "WORKSPACE_CONTEXT_MENU_KEYS_ROW_ABOVE",
  ROW_BELOW: "WORKSPACE_CONTEXT_MENU_KEYS_ROW_BELOW",
  SET_HEADERS: "WORKSPACE_CONTEXT_MENU_KEYS_SET_HEADERS",
  SORT_ASCENDING: "WORKSPACE_CONTEXT_MENU_KEYS_SORT_ASCENDING",
  SORT_DESCENDING: "WORKSPACE_CONTEXT_MENU_KEYS_SORT_DESCENDING",
  TRANSPOSE_TABLE: "WORKSPACE_CONTEXT_MENU_KEYS_TRANSPOSE_TABLE",
};

// style panels
export const CONTROL_TYPES = {
  FONT: "FONT",
  COLOR: "COLOR",
  ANCHOR_SELECTOR: "ANCHOR_SELECTOR",
  DASH: "DASH",
  SYMBOL: "SYMBOL",
  RADIO: "RADIO",
  TEXTAREA: "TEXTAREA",
  ANNOTATION_EDITOR: "ANNOTATION_EDITOR",
  MAPBOX_ACCESS_TOKEN: "MAPBOX_ACCESS_TOKEN",
  NUMERIC_INPUT: "NUMERIC_INPUT",
  FLAGLIST_CHECKBOX: "FLAGLIST_CHECKBOX",
  COLUMN_INPUT: "COLUMN_INPUT",
  COLOR_PALETTE: "COLOR_PALETTE",
  DATETIME_INPUT: "DATETIME_INPUT",
  DATETIME_DURATION: "DATETIME_DURATION",
  DROPDOWN_SELECTOR: "DROPDOWN_SELECTOR",
  DROPDOWN_WITH_TEXT_INPUT: "DROPDOWN_WITH_TEXT_INPUT",
  RANGE: "RANGE",
  SLIDER: "SLIDER",
  INPUT_SLIDER: "INPUT_SLIDER",
  BUTTON: "BUTTON",
  RANGE_SELECTOR_BUTTONS: "RANGE_SELECTOR_BUTTONS",
  TEXT_INPUT: "TEXT_INPUT",
  UPLOAD_SHAPE_FILE: "UPLOAD_SHAPE_FILE",
  UPLOAD_IMAGE_FILE: "UPLOAD_IMAGE_FILE",
  REF_CONTROL: "REF_CONTROL",
  ANCHOR: "ANCHOR",
  MAPBOX_STYLE_URL: "MAPBOX_STYLE_URL",
  ORIENTATION: "ORIENTATION",
  NOTE: "NOTE",
  ARROW: "ARROW",
};

// encoding panel
export const ENCODING_ATTRIBUTE_TYPES = {
  PLOTLYJS: "PLOTLYJS",
  ENCODING: "ENCODING",
};

// import modal
export const IMPORT_MODES = {
  EXAMPLES: "EXAMPLES",
  SQL: "SQL",
  URL: "URL",
  UPLOAD: "UPLOAD",
};

export const ORG_IMPORT_MODES = {
  DATASET: "DATASET",
  NOTEBOOK: "NOTEBOOK",
  PRESENTATION: "PRESENTATION",
};

export const IMPORT_EXAMPLE_URL =
  "https://raw.githubusercontent.com/plotly/datasets/master/iris.csv";

export const CHART_TYPE_ICON = {
  animation: "icon-animation",
  area: "icon-plot-area",
  bar: "icon-plot-bar",
  box: "icon-plot-box",
  candlestick: "icon-candlestick",
  cartesianArea: "icon-plot-area",
  choropleth: "icon-choropleth",
  contour: "icon-contour",
  errorbars: "icon-error-bars",
  heatmap: "icon-plot-heatmap",
  histogram2d: "icon-plot-2d-hist",
  histogram2dcontour: "icon-plot-2d-hist",
  histogram: "icon-plot-hist",
  line: "icon-plot-line",
  mesh3d: "icon-mesh3d",
  ohlc: "icon-ohlc",
  pie: "icon-pie-chart",
  scatter3d: "icon-plot-3d-scatter",
  line3d: "icon-plot-3d-line",
  scatter: "icon-plot-scatter",
  scattergeo: "icon-scatter-chart",
  scattermapbox: "icon-scatter-chart",
  scatterternary: "icon-ternary-scatter",
  surface: "icon-plot-3d-surface",
  timeseries: "icon-time-series",
};

export const ALL_AXES = [
  {
    axisTypeIdentifier: "AxesSpec",
    typeQuery: "cartesian",
    identifier: "xaxis",
    defaultAxis: "xaxis",
    options: [
      { value: "allaxes", label: "All", title: "All Axes" },
      { value: "xaxis", label: "X", title: "X Axes", singular: "X axis" },
      { value: "yaxis", label: "Y", title: "Y Axes", singular: "Y axis" },
    ],
  },
  {
    axisTypeIdentifier: "AxesSpec",
    typeQuery: "gl2d",
    identifier: "xaxis",
    defaultAxis: "xaxis",
    options: [
      { value: "allaxes", label: "All", title: "All Axes" },
      { value: "xaxis", label: "X", title: "X Axes", singular: "X axis" },
      { value: "yaxis", label: "Y", title: "Y Axes", singular: "Y axis" },
    ],
  },
  {
    axisTypeIdentifier: "GeoSpec",
    typeQuery: "geo",
    identifier: "geo",
    defaultAxis: "lonaxis",
    options: [
      { value: "lataxis", label: "Latitude", title: "Latitude" },
      { value: "lonaxis", label: "Longitude", title: "Longitude" },
    ],
  },
  {
    axisTypeIdentifier: "SceneSpec",
    typeQuery: "gl3d",
    identifier: "scene",
    defaultAxis: "xaxis",
    options: [
      { value: "allaxes", label: "All", title: "All Axes" },
      { value: "xaxis", label: "X", title: "X Axes", singular: "X axis" },
      { value: "yaxis", label: "Y", title: "Y Axes", singular: "Y axis" },
      { value: "zaxis", label: "Z", title: "Z Axes", singular: "Z axis" },
    ],
  },
  {
    axisTypeIdentifier: "TernarySpec",
    typeQuery: "ternary",
    identifier: "ternary",
    defaultAxis: "aaxis",
    options: [
      { value: "aaxis", label: "A", title: "A Axes", singular: "A Axis" },
      { value: "baxis", label: "B", title: "B Axes", singular: "B Axis" },
      { value: "caxis", label: "C", title: "C Axes", singular: "C Axis" },
    ],
  },
  {
    typeQuery: "pie",
    options: "NO_AXES",
  },
];

// Layout specification for CategorizedSelectTrace
export const CHART_CATEGORY = {
  BUSINESS: "BUSINESS",
  SCIENCE: "SCIENCE",
  CHARTS_3D: "CHARTS_3D",
  FINANCIAL: "FINANCIAL",
  STATISTICS: "STATISTICS",
  MAPS: "MAPS",
};

export const CATEGORY_LAYOUT = [
  { category: CHART_CATEGORY.BUSINESS, label: "Business" },
  { category: CHART_CATEGORY.SCIENCE, label: "Science" },
  { category: CHART_CATEGORY.CHARTS_3D, label: "3d charts" },
  { category: CHART_CATEGORY.FINANCIAL, label: "Finance" },
  { category: CHART_CATEGORY.STATISTICS, label: "Statistics" },
  { category: CHART_CATEGORY.MAPS, label: "Maps" },
];

// ShareModalTabs
export const SHARE_MODAL_TAB_OPTIONS = {
  LINK_AND_PRIVACY: "Link & Privacy",
  COLLABORATORS: "Collaborate",
  EMBED: "Embed",
};

export const SHARE_MODAL_TABS = Object.keys(SHARE_MODAL_TAB_OPTIONS).map(k => {
  return SHARE_MODAL_TAB_OPTIONS[k];
});

// 1x1px transparent gif: https://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
export const IMAGE_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const MAPBOX_ERROR_TYPES = {
  INVALID_JSON: "INVALID_JSON",
  FAILED_REQUEST: "FAILED_REQUEST",
  FAILED_PARSING: "FAILED_PARSING",
  UNKNOWN: "UNKNOWN",
};

export const WORKSPACE_PLOT_ID = "js-main-plotly-workspace-plot";

export const WORKSPACE_CONTAINER = document.getElementById("main");
export const WORKSPACE_PLACEHOLDER = document.getElementById(
  "placeholderworkspace"
);

const IS_TRANSFORM = true;

// quadruplet containing [CONSTANT_NAME TYPE LABEL IS_TRANSFORM].
export const ANALYSES = [
  [
    "DESCRIPTIVE",
    "descriptive-statistics",
    "Descriptive statistics",
    !IS_TRANSFORM,
  ],
  ["ANOVA_TEST", "anova", "ANOVA", !IS_TRANSFORM],
  ["CHI_SQUARED_TEST", "chi-squared-test", "Chi-squared test", !IS_TRANSFORM],
  ["T_TEST", "t-test", "T-test (two-tailed, independent)", !IS_TRANSFORM],
  ["CORRELATION", "column-correlation", "Column correlation", !IS_TRANSFORM],
  ["FIT", "fit", "Curve fitting", IS_TRANSFORM],
  ["AVERAGE", "average", "Average", IS_TRANSFORM],
  ["MOVING_AVERAGE", "moving-average", "Moving average", IS_TRANSFORM],
];

export const ANALYSES_TYPES = ANALYSES.reduce((accum, [name, type]) => {
  accum[name] = type;
  return accum;
}, {});

export const ANALYSES_TYPES_TO_LABELS = ANALYSES.reduce(
  (accum, [, type, label]) => {
    accum[type] = label;
    return accum;
  },
  {}
);

// used by WorkspaceActions to search for linked transforms inside traces
export const TRANSFORM_TYPES = ANALYSES.filter(
  ([, , , isTransform]) => isTransform
).map(([, type]) => type);

// Constants relating to the user interface

export const RETURN_KEY = "Enter";
export const ESCAPE_KEY = "Escape";
export const COMMAND_KEY = "Meta";
export const CONTROL_KEY = "Control";
*/

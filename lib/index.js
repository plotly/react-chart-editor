'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRANSFORMABLE_TRACES = exports.traceHasColorbar = exports.PlotlyPanelContext = exports.PlotlyFoldContext = exports.ModalProviderContext = exports.PanelMenuWrapperContext = exports.EditorControlsContext = exports.RectanglePositioner = exports.DefaultEditor = exports.EditorControls = exports.walkObject = exports.localizeString = exports.localize = exports.dereference = exports.connectTraceToPlot = exports.connectRangeSelectorToAxis = exports.connectToContainer = exports.connectLayoutToPlot = exports.connectAggregationToTransform = exports.connectTransformToTrace = exports.connectAxesToLayout = exports.connectImageToLayout = exports.connectShapeToLayout = exports.connectAnnotationToLayout = exports.connectNonCartesianSubplotToLayout = exports.connectCartesianSubplotToLayout = exports.TraceSelector = exports.TraceRequiredPanel = exports.TraceMarkerSection = exports.TraceAccordion = exports.TextEditor = exports.SymbolSelector = exports.StyleTracesPanel = exports.StyleImagesPanel = exports.StyleShapesPanel = exports.StyleNotesPanel = exports.StyleLegendPanel = exports.StyleLayoutPanel = exports.StyleColorbarsPanel = exports.StyleAxesPanel = exports.GraphTransformsPanel = exports.SingleSidebarItem = exports.Section = exports.PlotlySection = exports.Radio = exports.PanelMenuWrapper = exports.PanelEmpty = exports.Panel = exports.PlotlyPanel = exports.Text = exports.AxisRangeValue = exports.Numeric = exports.LineShapeSelector = exports.LineDashSelector = exports.LayoutSection = exports.LayoutPanel = exports.NumericFractionInverse = exports.PositioningNumeric = exports.NumericFraction = exports.Info = exports.GraphCreatePanel = exports.FontSelector = exports.Fold = exports.PlotlyFold = exports.Flaglist = exports.RangesliderVisible = exports.EDITOR_ACTIONS = exports.Dropzone = exports.Dropdown = exports.DataSelector = exports.ErrorBars = exports.ContourNumeric = exports.PieColorscalePicker = exports.ColorscalePicker = exports.ColorwayPicker = exports.PanelMessage = exports.ColorPicker = exports.Button = exports.AxesSelector = exports.DTicks = exports.NTicks = exports.AxesRange = exports.AxesFold = exports.TransformAccordion = exports.ArrowSelector = exports.PositioningRef = exports.AnnotationRef = exports.AnnotationArrowRef = exports.RangeSelectorAccordion = exports.ImageAccordion = exports.ShapeAccordion = exports.AnnotationAccordion = undefined;

var _PlotlyEditor = require('./PlotlyEditor');

var _PlotlyEditor2 = _interopRequireDefault(_PlotlyEditor);

var _DefaultEditor = require('./DefaultEditor');

var _DefaultEditor2 = _interopRequireDefault(_DefaultEditor);

var _EditorControls = require('./EditorControls');

var _EditorControls2 = _interopRequireDefault(_EditorControls);

var _lib = require('./lib');

var _constants = require('./lib/constants');

var _context = require('./context');

var _components = require('./components');

var _StyleColorbarsPanel = require('./default_panels/StyleColorbarsPanel');

var _default_panels = require('./default_panels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AnnotationAccordion = _components.AnnotationAccordion;
exports.ShapeAccordion = _components.ShapeAccordion;
exports.ImageAccordion = _components.ImageAccordion;
exports.RangeSelectorAccordion = _components.RangeSelectorAccordion;
exports.AnnotationArrowRef = _components.AnnotationArrowRef;
exports.AnnotationRef = _components.AnnotationRef;
exports.PositioningRef = _components.PositioningRef;
exports.ArrowSelector = _components.ArrowSelector;
exports.TransformAccordion = _components.TransformAccordion;
exports.AxesFold = _components.AxesFold;
exports.AxesRange = _components.AxesRange;
exports.NTicks = _components.NTicks;
exports.DTicks = _components.DTicks;
exports.AxesSelector = _components.AxesSelector;
exports.Button = _components.Button;
exports.ColorPicker = _components.ColorPicker;
exports.PanelMessage = _components.PanelMessage;
exports.ColorwayPicker = _components.ColorwayPicker;
exports.ColorscalePicker = _components.ColorscalePicker;
exports.PieColorscalePicker = _components.PieColorscalePicker;
exports.ContourNumeric = _components.ContourNumeric;
exports.ErrorBars = _components.ErrorBars;
exports.DataSelector = _components.DataSelector;
exports.Dropdown = _components.Dropdown;
exports.Dropzone = _components.Dropzone;
exports.EDITOR_ACTIONS = _constants.EDITOR_ACTIONS;
exports.RangesliderVisible = _components.RangesliderVisible;
exports.Flaglist = _components.Flaglist;
exports.PlotlyFold = _components.PlotlyFold;
exports.Fold = _components.Fold;
exports.FontSelector = _components.FontSelector;
exports.GraphCreatePanel = _default_panels.GraphCreatePanel;
exports.Info = _components.Info;
exports.NumericFraction = _components.NumericFraction;
exports.PositioningNumeric = _components.PositioningNumeric;
exports.NumericFractionInverse = _components.NumericFractionInverse;
exports.LayoutPanel = _components.LayoutPanel;
exports.LayoutSection = _components.LayoutSection;
exports.LineDashSelector = _components.LineDashSelector;
exports.LineShapeSelector = _components.LineShapeSelector;
exports.Numeric = _components.Numeric;
exports.AxisRangeValue = _components.AxisRangeValue;
exports.Text = _components.Text;
exports.PlotlyPanel = _components.PlotlyPanel;
exports.Panel = _components.Panel;
exports.PanelEmpty = _components.PanelEmpty;
exports.PanelMenuWrapper = _components.PanelMenuWrapper;
exports.Radio = _components.Radio;
exports.PlotlySection = _components.PlotlySection;
exports.Section = _components.Section;
exports.SingleSidebarItem = _components.SingleSidebarItem;
exports.GraphTransformsPanel = _default_panels.GraphTransformsPanel;
exports.StyleAxesPanel = _default_panels.StyleAxesPanel;
exports.StyleColorbarsPanel = _default_panels.StyleColorbarsPanel;
exports.StyleLayoutPanel = _default_panels.StyleLayoutPanel;
exports.StyleLegendPanel = _default_panels.StyleLegendPanel;
exports.StyleNotesPanel = _default_panels.StyleNotesPanel;
exports.StyleShapesPanel = _default_panels.StyleShapesPanel;
exports.StyleImagesPanel = _default_panels.StyleImagesPanel;
exports.StyleTracesPanel = _default_panels.StyleTracesPanel;
exports.SymbolSelector = _components.SymbolSelector;
exports.TextEditor = _components.TextEditor;
exports.TraceAccordion = _components.TraceAccordion;
exports.TraceMarkerSection = _components.TraceMarkerSection;
exports.TraceRequiredPanel = _components.TraceRequiredPanel;
exports.TraceSelector = _components.TraceSelector;
exports.connectCartesianSubplotToLayout = _lib.connectCartesianSubplotToLayout;
exports.connectNonCartesianSubplotToLayout = _lib.connectNonCartesianSubplotToLayout;
exports.connectAnnotationToLayout = _lib.connectAnnotationToLayout;
exports.connectShapeToLayout = _lib.connectShapeToLayout;
exports.connectImageToLayout = _lib.connectImageToLayout;
exports.connectAxesToLayout = _lib.connectAxesToLayout;
exports.connectTransformToTrace = _lib.connectTransformToTrace;
exports.connectAggregationToTransform = _lib.connectAggregationToTransform;
exports.connectLayoutToPlot = _lib.connectLayoutToPlot;
exports.connectToContainer = _lib.connectToContainer;
exports.connectRangeSelectorToAxis = _lib.connectRangeSelectorToAxis;
exports.connectTraceToPlot = _lib.connectTraceToPlot;
exports.dereference = _lib.dereference;
exports.localize = _lib.localize;
exports.localizeString = _lib.localizeString;
exports.walkObject = _lib.walkObject;
exports.EditorControls = _EditorControls2.default;
exports.DefaultEditor = _DefaultEditor2.default;
exports.RectanglePositioner = _components.RectanglePositioner;
exports.EditorControlsContext = _context.EditorControlsContext;
exports.PanelMenuWrapperContext = _context.PanelMenuWrapperContext;
exports.ModalProviderContext = _context.ModalProviderContext;
exports.PlotlyFoldContext = _context.PlotlyFoldContext;
exports.PlotlyPanelContext = _context.PlotlyPanelContext;
exports.traceHasColorbar = _StyleColorbarsPanel.traceHasColorbar;
exports.TRANSFORMABLE_TRACES = _constants.TRANSFORMABLE_TRACES;
exports.default = _PlotlyEditor2.default;
//# sourceMappingURL=index.js.map
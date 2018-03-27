import PlotlyEditor from './PlotlyEditor';
import DefaultEditor from './DefaultEditor';
import EditorControls from './EditorControls';
import {
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectAggregationToTransform,
  connectImageToLayout,
  connectAxesToLayout,
  connectTransformToTrace,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  connectRangeSelectorToAxis,
  dereference,
  localize,
  localizeString,
  walkObject,
} from './lib';
import {EDITOR_ACTIONS} from './lib/constants';

import {
  AnnotationAccordion,
  ShapeAccordion,
  RangeSelectorAccordion,
  ImageAccordion,
  AnnotationArrowRef,
  AnnotationRef,
  PositioningRef,
  ArrowSelector,
  AxesFold,
  AxesRange,
  TransformAccordion,
  NTicks,
  DTicks,
  AxesSelector,
  Button,
  CanvasSize,
  ColorPicker,
  ColorscalePicker,
  ContourNumeric,
  ErrorBars,
  DataSelector,
  Dropdown,
  Dropzone,
  Flaglist,
  Fold,
  FontSelector,
  Info,
  NumericFraction,
  PositioningNumeric,
  NumericFractionInverse,
  LayoutPanel,
  LineDashSelector,
  LineShapeSelector,
  Numeric,
  AxisRangeValue,
  Text,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  SingleSidebarItem,
  SymbolSelector,
  TextEditor,
  RangesliderVisible,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceSelector,
  SectionHeader,
} from './components';

import {
  GraphCreatePanel,
  StyleAxesPanel,
  GraphTransformsPanel,
  StyleColorbarsPanel,
  StyleLayoutPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleImagesPanel,
  StyleTracesPanel,
} from './default_panels';

export {
  AnnotationAccordion,
  ShapeAccordion,
  ImageAccordion,
  RangeSelectorAccordion,
  AnnotationArrowRef,
  AnnotationRef,
  PositioningRef,
  ArrowSelector,
  TransformAccordion,
  AxesFold,
  connectAggregationToTransform,
  AxesRange,
  NTicks,
  DTicks,
  AxesSelector,
  Button,
  CanvasSize,
  ColorPicker,
  ColorscalePicker,
  ContourNumeric,
  SectionHeader,
  ErrorBars,
  DataSelector,
  Dropdown,
  Dropzone,
  EDITOR_ACTIONS,
  RangesliderVisible,
  Flaglist,
  Fold,
  FontSelector,
  GraphCreatePanel,
  Info,
  NumericFraction,
  PositioningNumeric,
  NumericFractionInverse,
  LayoutPanel,
  LineDashSelector,
  LineShapeSelector,
  Numeric,
  AxisRangeValue,
  Text,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  SingleSidebarItem,
  GraphTransformsPanel,
  StyleAxesPanel,
  StyleColorbarsPanel,
  StyleLayoutPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleImagesPanel,
  StyleTracesPanel,
  SymbolSelector,
  TextEditor,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceSelector,
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectTransformToTrace,
  connectLayoutToPlot,
  connectToContainer,
  connectRangeSelectorToAxis,
  connectTraceToPlot,
  dereference,
  localize,
  localizeString,
  walkObject,
  EditorControls,
  DefaultEditor,
};

export default PlotlyEditor;

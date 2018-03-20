import bem from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectShapeToLayout from './connectShapeToLayout';
import connectSliderToLayout from './connectSliderToLayout';
import connectImageToLayout from './connectImageToLayout';
import connectUpdateMenuToLayout from './connectUpdateMenuToLayout';
import connectRangeSelectorToAxis from './connectRangeSelectorToAxis';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot, {getLayoutContext} from './connectLayoutToPlot';
import connectToContainer, {
  containerConnectedContextTypes,
} from './connectToContainer';
import {computeTraceOptionsFromSchema} from './computeTraceOptionsFromSchema';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import getAllAxes, {
  axisIdToAxisName,
  traceTypeToAxisType,
  getAxisTitle,
} from './getAllAxes';
import localize, {localizeString} from './localize';
import tinyColor from 'tinycolor2';
import unpackPlotProps from './unpackPlotProps';
import walkObject, {isPlainObject} from './walkObject';
import {
  traceTypeToPlotlyInitFigure,
  plotlyTraceToCustomTrace,
} from './customTraceType';
import * as PlotlyIcons from 'plotly-icons';
import supplyLayoutPlotProps from './supplyLayoutPlotProps';
import striptags from './striptags';
import {
  capitalize,
  lowerCase,
  upperCase,
  removeNonWord,
  camelCase,
  pascalCase,
} from './strings';

const TOO_LIGHT_FACTOR = 0.8;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

function renderTraceIcon(trace, prefix = 'Plot') {
  if (!trace) {
    return null;
  }
  const componentName = `${prefix}${pascalCase(trace)}Icon`;
  return PlotlyIcons[componentName]
    ? PlotlyIcons[componentName]
    : PlotlyIcons.PlotLineIcon;
}

export {
  axisIdToAxisName,
  bem,
  capitalize,
  lowerCase,
  upperCase,
  removeNonWord,
  camelCase,
  pascalCase,
  clamp,
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectSliderToLayout,
  connectUpdateMenuToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectRangeSelectorToAxis,
  connectTraceToPlot,
  containerConnectedContextTypes,
  computeTraceOptionsFromSchema,
  traceTypeToPlotlyInitFigure,
  dereference,
  findFullTraceIndex,
  getAllAxes,
  getAxisTitle,
  getDisplayName,
  getLayoutContext,
  isPlainObject,
  localize,
  localizeString,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
  unpackPlotProps,
  walkObject,
  supplyLayoutPlotProps,
  tooLight,
  striptags,
  traceTypeToAxisType,
};

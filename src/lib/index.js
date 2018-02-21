import bem from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectShapeToLayout from './connectShapeToLayout';
import connectImageToLayout from './connectImageToLayout';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot, {getLayoutContext} from './connectLayoutToPlot';
import connectToContainer, {
  containerConnectedContextTypes,
} from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import connectSubplotToLayout from './connectSubplotToLayout';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import getAllAxes, {traceTypeToAxisType} from './getAllAxes';
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function capitalize(s) {
  return !s ? '' : s.charAt(0).toUpperCase() + s.substring(1);
}

const TOO_LIGHT_FACTOR = 0.8;
export function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

function renderTraceIcon(trace) {
  const componentName = `Plot${capitalize(trace)}Icon`;
  return PlotlyIcons[componentName]
    ? PlotlyIcons[componentName]
    : PlotlyIcons.PlotLineIcon;
}

export {
  bem,
  capitalize,
  clamp,
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  connectSubplotToLayout,
  containerConnectedContextTypes,
  traceTypeToPlotlyInitFigure,
  dereference,
  findFullTraceIndex,
  getAllAxes,
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
  traceTypeToAxisType,
};

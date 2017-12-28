import bem, {icon} from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot, {getLayoutContext} from './connectLayoutToPlot';
import connectToContainer from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
import tinyColor from 'tinycolor2';
import unpackPlotProps from './unpackPlotProps';
import walkObject, {isPlainObject} from './walkObject';
import {
  customTraceToPlotlyTrace,
  plotlyTraceToCustomTrace,
} from './customTraceType';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const TOO_LIGHT_FACTOR = 0.8;
export function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

export {
  bem,
  clamp,
  connectAnnotationToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  customTraceToPlotlyTrace,
  dereference,
  findFullTraceIndex,
  getDisplayName,
  getLayoutContext,
  icon,
  isPlainObject,
  localize,
  localizeString,
  plotlyTraceToCustomTrace,
  unpackPlotProps,
  walkObject,
};

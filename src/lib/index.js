import bem, {icon} from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot, {getLayoutContext} from './connectLayoutToPlot';
import connectToContainer from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
import unpackPlotProps from './unpackPlotProps';
import walkObject, {isPlainObject} from './walkObject';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export {
  bem,
  clamp,
  connectAnnotationToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  dereference,
  getDisplayName,
  getLayoutContext,
  findFullTraceIndex,
  icon,
  isPlainObject,
  localize,
  localizeString,
  unpackPlotProps,
  walkObject,
};

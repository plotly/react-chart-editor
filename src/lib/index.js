import bem, {icon} from './bem';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot from './connectLayoutToPlot';
import connectToContainer from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
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
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  dereference,
  getDisplayName,
  findFullTraceIndex,
  icon,
  isPlainObject,
  localize,
  localizeString,
  walkObject,
};

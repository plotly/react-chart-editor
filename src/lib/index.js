import bem, {icon} from './bem';
import connectLayoutToPlot from './connectLayoutToPlot';
import connectToContainer from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
import walkObject, {makeAttrSetterPath} from './walkObject';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export {
  bem,
  clamp,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  dereference,
  getDisplayName,
  findFullTraceIndex,
  icon,
  localize,
  localizeString,
  makeAttrSetterPath,
  walkObject,
};

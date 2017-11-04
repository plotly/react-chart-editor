import bem from './bem';
import connectToPlot from './connectToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
import walkObject, {makeAttrSetterPath} from './walkObject';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export {
  bem,
  clamp,
  connectToPlot,
  dereference,
  findFullTraceIndex,
  localize,
  localizeString,
  makeAttrSetterPath,
  walkObject,
};

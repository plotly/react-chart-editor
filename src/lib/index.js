import findAttrs from './find-attrs';
import connectToPlot from './connectToPlot';
import bem from './bem';
import localize, {localizeString} from './localize';

export {bem, connectToPlot, findAttrs, localize, localizeString};

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

import {MULTI_VALUED} from './constants';
import {isPlainObject} from '../lib';

/**
 * Deep-copies the value using JSON. Underscored (private) keys are removed.
 * @param {*} value Some nested value from the plotDiv object.
 * @returns {*} A deepcopy of the value.
 */
function deepCopyPublic(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  const skipPrivateKeys = (key, value) => (key.startsWith('_') ? 0 : value);

  return window.JSON.parse(window.JSON.stringify(value, skipPrivateKeys));
}

function setMultiValuedContainer(intoObj, fromObj, key, config = {}) {
  const intoVal = intoObj[key];
  const fromVal = fromObj[key];

  // don't merge private attrs
  if (
    (typeof key === 'string' && key.charAt(0) === '_' && key !== '_group') ||
    typeof intoVal === 'function' ||
    key === 'module'
  ) {
    return;
  }

  // already a mixture of values, can't get any worse
  if (intoVal === MULTI_VALUED) {
    return;
  } else if (intoVal === void 0) {
    // if the original doesn't have the key it's because that key
    // doesn't do anything there - so use the new value
    // note that if fromObj doesn't have a key in intoObj we will not
    // attempt to merge them at all, so this behavior makes the merge
    // independent of order.
    intoObj[key] = fromVal;
  } else if (key === 'colorscale') {
    // colorscales are arrays... need to stringify before comparing
    // (other vals we don't want to stringify, as differences could
    // potentially be real, like 'false' and false)
    if (String(intoVal) !== String(fromVal)) {
      intoObj[key] = MULTI_VALUED;
    }
  } else if (Array.isArray(intoVal)) {
    // in data, other arrays are data, which we don't care about
    // for styling purposes
    if (!config.searchArrays) {
      return;
    }
    if (!Array.isArray(fromVal)) {
      intoObj[key] = MULTI_VALUED;
    } else {
      // in layout though, we need to recurse into arrays
      for (let i = 0; i < fromVal.length; i++) {
        setMultiValuedContainer(intoVal, fromVal, i, config);
      }
    }
  } else if (isPlainObject(fromVal)) {
    // recurse into objects
    if (!isPlainObject(intoVal)) {
      throw new Error('tried to merge object into non-object: ' + key);
    }
    Object.keys(fromVal).forEach(function(key2) {
      setMultiValuedContainer(intoVal, fromVal, key2, config);
    });
  } else if (isPlainObject(intoVal)) {
    throw new Error('tried to merge non-object into object: ' + key);
  } else if (intoVal !== fromVal) {
    // different non-empty values -
    intoObj[key] = MULTI_VALUED;
  }
}

export {deepCopyPublic, setMultiValuedContainer};

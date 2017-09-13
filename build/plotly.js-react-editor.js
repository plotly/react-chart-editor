(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.createPlotlyComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * inspired by is-number <https://github.com/jonschlinkert/is-number>
 * but significantly simplified and sped up by ignoring number and string constructors
 * ie these return false:
 *   new Number(1)
 *   new String('1')
 */

'use strict';

/**
 * Is this string all whitespace?
 * This solution kind of makes my brain hurt, but it's significantly faster
 * than !str.trim() or any other solution I could find.
 *
 * whitespace codes from: http://en.wikipedia.org/wiki/Whitespace_character
 * and verified with:
 *
 *  for(var i = 0; i < 65536; i++) {
 *      var s = String.fromCharCode(i);
 *      if(+s===0 && !s.trim()) console.log(i, s);
 *  }
 *
 * which counts a couple of these as *not* whitespace, but finds nothing else
 * that *is* whitespace. Note that charCodeAt stops at 16 bits, but it appears
 * that there are no whitespace characters above this, and code points above
 * this do not map onto white space characters.
 */
function allBlankCharCodes(str){
    var l = str.length,
        a;
    for(var i = 0; i < l; i++) {
        a = str.charCodeAt(i);
        if((a < 9 || a > 13) && (a !== 32) && (a !== 133) && (a !== 160) &&
            (a !== 5760) && (a !== 6158) && (a < 8192 || a > 8205) &&
            (a !== 8232) && (a !== 8233) && (a !== 8239) && (a !== 8287) &&
            (a !== 8288) && (a !== 12288) && (a !== 65279)) {
                return false;
        }
    }
    return true;
}

module.exports = function(n) {
    var type = typeof n;
    if(type === 'string') {
        var original = n;
        n = +n;
        // whitespace strings cast to zero - filter them out
        if(n===0 && allBlankCharCodes(original)) return false;
    }
    else if(type !== 'number') return false;

    return n - n < 1;
};

},{}],2:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":18}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))
},{"./emptyFunction":2,"_process":18}],5:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var extendFlat = require('../../lib/extend').extendFlat;
var fontAttrs = require('../../plots/font_attributes');

module.exports = {
    hoverlabel: {
        bgcolor: {
            valType: 'color',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the background color of the hover labels for this trace'
            ].join(' ')
        },
        bordercolor: {
            valType: 'color',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the border color of the hover labels for this trace.'
            ].join(' ')
        },
        font: {
            family: extendFlat({}, fontAttrs.family, { arrayOk: true }),
            size: extendFlat({}, fontAttrs.size, { arrayOk: true }),
            color: extendFlat({}, fontAttrs.color, { arrayOk: true })
        },
        namelength: {
            valType: 'integer',
            min: -1,
            arrayOk: true,
            role: 'style',
            description: [
                'Sets the length (in number of characters) of the trace name in',
                'the hover labels for this trace. -1 shows the whole name',
                'regardless of length. 0-3 shows the first 0-3 characters, and',
                'an integer >3 will show the whole name if it is less than that',
                'many characters, but if it is longer, will truncate to',
                '`namelength - 3` characters and add an ellipsis.'
            ].join(' ')
        }
    }
};

},{"../../lib/extend":6,"../../plots/font_attributes":16}],6:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var isPlainObject = require('./is_plain_object.js');
var isArray = Array.isArray;

function primitivesLoopSplice(source, target) {
    var i, value;
    for(i = 0; i < source.length; i++) {
        value = source[i];
        if(value !== null && typeof(value) === 'object') {
            return false;
        }
        if(value !== void(0)) {
            target[i] = value;
        }
    }
    return true;
}

exports.extendFlat = function() {
    return _extend(arguments, false, false, false);
};

exports.extendDeep = function() {
    return _extend(arguments, true, false, false);
};

exports.extendDeepAll = function() {
    return _extend(arguments, true, true, false);
};

exports.extendDeepNoArrays = function() {
    return _extend(arguments, true, false, true);
};

/*
 * Inspired by https://github.com/justmoon/node-extend/blob/master/index.js
 * All credit to the jQuery authors for perfecting this amazing utility.
 *
 * API difference with jQuery version:
 * - No optional boolean (true -> deep extend) first argument,
 *   use `extendFlat` for first-level only extend and
 *   use `extendDeep` for a deep extend.
 *
 * Other differences with jQuery version:
 * - Uses a modern (and faster) isPlainObject routine.
 * - Expected to work with object {} and array [] arguments only.
 * - Does not check for circular structure.
 *   FYI: jQuery only does a check across one level.
 *   Warning: this might result in infinite loops.
 *
 */
function _extend(inputs, isDeep, keepAllKeys, noArrayCopies) {
    var target = inputs[0],
        length = inputs.length;

    var input, key, src, copy, copyIsArray, clone, allPrimitives;

    if(length === 2 && isArray(target) && isArray(inputs[1]) && target.length === 0) {

        allPrimitives = primitivesLoopSplice(inputs[1], target);

        if(allPrimitives) {
            return target;
        } else {
            target.splice(0, target.length); // reset target and continue to next block
        }
    }

    for(var i = 1; i < length; i++) {
        input = inputs[i];

        for(key in input) {
            src = target[key];
            copy = input[key];

            // Stop early and just transfer the array if array copies are disallowed:
            if(noArrayCopies && isArray(copy)) {
                target[key] = copy;
            }

            // recurse if we're merging plain objects or arrays
            else if(isDeep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if(copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                } else {
                    clone = src && isPlainObject(src) ? src : {};
                }

                // never move original objects, clone them
                target[key] = _extend([clone, copy], isDeep, keepAllKeys, noArrayCopies);
            }

            // don't bring in undefined values, except for extendDeepAll
            else if(typeof copy !== 'undefined' || keepAllKeys) {
                target[key] = copy;
            }
        }
    }

    return target;
}

},{"./is_plain_object.js":8}],7:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

/**
 * Return true for arrays, whether they're untyped or not.
 */

// IE9 fallback
var ab = (typeof ArrayBuffer === 'undefined' || !ArrayBuffer.isView) ?
    {isView: function() { return false; }} :
    ArrayBuffer;

module.exports = function isArray(a) {
    return Array.isArray(a) || ab.isView(a);
};

},{}],8:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

// more info: http://stackoverflow.com/questions/18531624/isplainobject-thing
module.exports = function isPlainObject(obj) {

    // We need to be a little less strict in the `imagetest` container because
    // of how async image requests are handled.
    //
    // N.B. isPlainObject(new Constructor()) will return true in `imagetest`
    if(window && window.process && window.process.versions) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    return (
        Object.prototype.toString.call(obj) === '[object Object]' &&
        Object.getPrototypeOf(obj) === Object.prototype
    );
};

},{}],9:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

/* eslint-disable no-console */

var config = require('../plot_api/plot_config');

var loggers = module.exports = {};

/**
 * ------------------------------------------
 * debugging tools
 * ------------------------------------------
 */

loggers.log = function() {
    if(config.logging > 1) {
        var messages = ['LOG:'];

        for(var i = 0; i < arguments.length; i++) {
            messages.push(arguments[i]);
        }

        apply(console.trace || console.log, messages);
    }
};

loggers.warn = function() {
    if(config.logging > 0) {
        var messages = ['WARN:'];

        for(var i = 0; i < arguments.length; i++) {
            messages.push(arguments[i]);
        }

        apply(console.trace || console.log, messages);
    }
};

loggers.error = function() {
    if(config.logging > 0) {
        var messages = ['ERROR:'];

        for(var i = 0; i < arguments.length; i++) {
            messages.push(arguments[i]);
        }

        apply(console.error, messages);
    }
};

/*
 * Robust apply, for IE9 where console.log doesn't support
 * apply like other functions do
 */
function apply(f, args) {
    if(f.apply) {
        f.apply(f, args);
    }
    else {
        for(var i = 0; i < args.length; i++) {
            f(args[i]);
        }
    }
}

},{"../plot_api/plot_config":14}],10:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var isNumeric = require('fast-isnumeric');
var isArray = require('./is_array');
var isPlainObject = require('./is_plain_object');
var containerArrayMatch = require('../plot_api/container_array_match');

/**
 * convert a string s (such as 'xaxis.range[0]')
 * representing a property of nested object into set and get methods
 * also return the string and object so we don't have to keep track of them
 * allows [-1] for an array index, to set a property inside all elements
 * of an array
 * eg if obj = {arr: [{a: 1}, {a: 2}]}
 * you can do p = nestedProperty(obj, 'arr[-1].a')
 * but you cannot set the array itself this way, to do that
 * just set the whole array.
 * eg if obj = {arr: [1, 2, 3]}
 * you can't do nestedProperty(obj, 'arr[-1]').set(5)
 * but you can do nestedProperty(obj, 'arr').set([5, 5, 5])
 */
module.exports = function nestedProperty(container, propStr) {
    if(isNumeric(propStr)) propStr = String(propStr);
    else if(typeof propStr !== 'string' ||
            propStr.substr(propStr.length - 4) === '[-1]') {
        throw 'bad property string';
    }

    var j = 0,
        propParts = propStr.split('.'),
        indexed,
        indices,
        i;

    // check for parts of the nesting hierarchy that are numbers (ie array elements)
    while(j < propParts.length) {
        // look for non-bracket chars, then any number of [##] blocks
        indexed = String(propParts[j]).match(/^([^\[\]]*)((\[\-?[0-9]*\])+)$/);
        if(indexed) {
            if(indexed[1]) propParts[j] = indexed[1];
            // allow propStr to start with bracketed array indices
            else if(j === 0) propParts.splice(0, 1);
            else throw 'bad property string';

            indices = indexed[2]
                .substr(1, indexed[2].length - 2)
                .split('][');

            for(i = 0; i < indices.length; i++) {
                j++;
                propParts.splice(j, 0, Number(indices[i]));
            }
        }
        j++;
    }

    if(typeof container !== 'object') {
        return badContainer(container, propStr, propParts);
    }

    return {
        set: npSet(container, propParts, propStr),
        get: npGet(container, propParts),
        astr: propStr,
        parts: propParts,
        obj: container
    };
};

function npGet(cont, parts) {
    return function() {
        var curCont = cont,
            curPart,
            allSame,
            out,
            i,
            j;

        for(i = 0; i < parts.length - 1; i++) {
            curPart = parts[i];
            if(curPart === -1) {
                allSame = true;
                out = [];
                for(j = 0; j < curCont.length; j++) {
                    out[j] = npGet(curCont[j], parts.slice(i + 1))();
                    if(out[j] !== out[0]) allSame = false;
                }
                return allSame ? out[0] : out;
            }
            if(typeof curPart === 'number' && !isArray(curCont)) {
                return undefined;
            }
            curCont = curCont[curPart];
            if(typeof curCont !== 'object' || curCont === null) {
                return undefined;
            }
        }

        // only hit this if parts.length === 1
        if(typeof curCont !== 'object' || curCont === null) return undefined;

        out = curCont[parts[i]];
        if(out === null) return undefined;
        return out;
    };
}

/*
 * Can this value be deleted? We can delete any empty object (null, undefined, [], {})
 * EXCEPT empty data arrays, {} inside an array, or anything INSIDE an *args* array.
 *
 * Info arrays can be safely deleted, but not deleting them has no ill effects other
 * than leaving a trace or layout object with some cruft in it.
 *
 * Deleting data arrays can change the meaning of the object, as `[]` means there is
 * data for this attribute, it's just empty right now while `undefined` means the data
 * should be filled in with defaults to match other data arrays.
 *
 * `{}` inside an array means "the default object" which is clearly different from
 * popping it off the end of the array, or setting it `undefined` inside the array.
 *
 * *args* arrays get passed directly to API methods and we should respect precisely
 * what the user has put there - although if the whole *args* array is empty it's fine
 * to delete that.
 *
 * So we do some simple tests here to find known non-data arrays but don't worry too
 * much about not deleting some arrays that would actually be safe to delete.
 */
var INFO_PATTERNS = /(^|\.)((domain|range)(\.[xy])?|args|parallels)$/;
var ARGS_PATTERN = /(^|\.)args\[/;
function isDeletable(val, propStr) {
    if(!emptyObj(val) ||
        (isPlainObject(val) && propStr.charAt(propStr.length - 1) === ']') ||
        (propStr.match(ARGS_PATTERN) && val !== undefined)
    ) {
        return false;
    }
    if(!isArray(val)) return true;

    if(propStr.match(INFO_PATTERNS)) return true;

    var match = containerArrayMatch(propStr);
    // if propStr matches the container array itself, index is an empty string
    // otherwise we've matched something inside the container array, which may
    // still be a data array.
    return match && (match.index === '');
}

function npSet(cont, parts, propStr) {
    return function(val) {
        var curCont = cont,
            propPart = '',
            containerLevels = [[cont, propPart]],
            toDelete = isDeletable(val, propStr),
            curPart,
            i;

        for(i = 0; i < parts.length - 1; i++) {
            curPart = parts[i];

            if(typeof curPart === 'number' && !isArray(curCont)) {
                throw 'array index but container is not an array';
            }

            // handle special -1 array index
            if(curPart === -1) {
                toDelete = !setArrayAll(curCont, parts.slice(i + 1), val, propStr);
                if(toDelete) break;
                else return;
            }

            if(!checkNewContainer(curCont, curPart, parts[i + 1], toDelete)) {
                break;
            }

            curCont = curCont[curPart];

            if(typeof curCont !== 'object' || curCont === null) {
                throw 'container is not an object';
            }

            propPart = joinPropStr(propPart, curPart);

            containerLevels.push([curCont, propPart]);
        }

        if(toDelete) {
            if(i === parts.length - 1) delete curCont[parts[i]];
            pruneContainers(containerLevels);
        }
        else curCont[parts[i]] = val;
    };
}

function joinPropStr(propStr, newPart) {
    var toAdd = newPart;
    if(isNumeric(newPart)) toAdd = '[' + newPart + ']';
    else if(propStr) toAdd = '.' + newPart;

    return propStr + toAdd;
}

// handle special -1 array index
function setArrayAll(containerArray, innerParts, val, propStr) {
    var arrayVal = isArray(val),
        allSet = true,
        thisVal = val,
        thisPropStr = propStr.replace('-1', 0),
        deleteThis = arrayVal ? false : isDeletable(val, thisPropStr),
        firstPart = innerParts[0],
        i;

    for(i = 0; i < containerArray.length; i++) {
        thisPropStr = propStr.replace('-1', i);
        if(arrayVal) {
            thisVal = val[i % val.length];
            deleteThis = isDeletable(thisVal, thisPropStr);
        }
        if(deleteThis) allSet = false;
        if(!checkNewContainer(containerArray, i, firstPart, deleteThis)) {
            continue;
        }
        npSet(containerArray[i], innerParts, propStr.replace('-1', i))(thisVal);
    }
    return allSet;
}

/**
 * make new sub-container as needed.
 * returns false if there's no container and none is needed
 * because we're only deleting an attribute
 */
function checkNewContainer(container, part, nextPart, toDelete) {
    if(container[part] === undefined) {
        if(toDelete) return false;

        if(typeof nextPart === 'number') container[part] = [];
        else container[part] = {};
    }
    return true;
}

function pruneContainers(containerLevels) {
    var i,
        j,
        curCont,
        propPart,
        keys,
        remainingKeys;
    for(i = containerLevels.length - 1; i >= 0; i--) {
        curCont = containerLevels[i][0];
        propPart = containerLevels[i][1];

        remainingKeys = false;
        if(isArray(curCont)) {
            for(j = curCont.length - 1; j >= 0; j--) {
                if(isDeletable(curCont[j], joinPropStr(propPart, j))) {
                    if(remainingKeys) curCont[j] = undefined;
                    else curCont.pop();
                }
                else remainingKeys = true;
            }
        }
        else if(typeof curCont === 'object' && curCont !== null) {
            keys = Object.keys(curCont);
            remainingKeys = false;
            for(j = keys.length - 1; j >= 0; j--) {
                if(isDeletable(curCont[keys[j]], joinPropStr(propPart, keys[j]))) {
                    delete curCont[keys[j]];
                }
                else remainingKeys = true;
            }
        }
        if(remainingKeys) return;
    }
}

function emptyObj(obj) {
    if(obj === undefined || obj === null) return true;
    if(typeof obj !== 'object') return false; // any plain value
    if(isArray(obj)) return !obj.length; // []
    return !Object.keys(obj).length; // {}
}

function badContainer(container, propStr, propParts) {
    return {
        set: function() { throw 'bad container'; },
        get: function() {},
        astr: propStr,
        parts: propParts,
        obj: container
    };
}

},{"../plot_api/container_array_match":13,"./is_array":7,"./is_plain_object":8,"fast-isnumeric":1}],11:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

// Simple helper functions
// none of these need any external deps

module.exports = function noop() {};

},{}],12:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

/**
 * Push array with unique items
 *
 * @param {array} array
 *  array to be filled
 * @param {any} item
 *  item to be or not to be inserted
 * @return {array}
 *  ref to array (now possibly containing one more item)
 *
 */
module.exports = function pushUnique(array, item) {
    if(item instanceof RegExp) {
        var itemStr = item.toString(),
            i;
        for(i = 0; i < array.length; i++) {
            if(array[i] instanceof RegExp && array[i].toString() === itemStr) {
                return array;
            }
        }
        array.push(item);
    }
    else if(item && array.indexOf(item) === -1) array.push(item);

    return array;
};

},{}],13:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Registry = require('../registry');

/*
 * containerArrayMatch: does this attribute string point into a
 * layout container array?
 *
 * @param {String} astr: an attribute string, like *annotations[2].text*
 *
 * @returns {Object | false} Returns false if `astr` doesn't match a container
 *  array. If it does, returns:
 *     {array: {String}, index: {Number}, property: {String}}
 *  ie the attribute string for the array, the index within the array (or ''
 *  if the whole array) and the property within that (or '' if the whole array
 *  or the whole object)
 */
module.exports = function containerArrayMatch(astr) {
    var rootContainers = Registry.layoutArrayContainers,
        regexpContainers = Registry.layoutArrayRegexes,
        rootPart = astr.split('[')[0],
        arrayStr,
        match;

    // look for regexp matches first, because they may be nested inside root matches
    // eg updatemenus[i].buttons is nested inside updatemenus
    for(var i = 0; i < regexpContainers.length; i++) {
        match = astr.match(regexpContainers[i]);
        if(match && match.index === 0) {
            arrayStr = match[0];
            break;
        }
    }

    // now look for root matches
    if(!arrayStr) arrayStr = rootContainers[rootContainers.indexOf(rootPart)];

    if(!arrayStr) return false;

    var tail = astr.substr(arrayStr.length);
    if(!tail) return {array: arrayStr, index: '', property: ''};

    match = tail.match(/^\[(0|[1-9][0-9]*)\](\.(.+))?$/);
    if(!match) return false;

    return {array: arrayStr, index: Number(match[1]), property: match[3] || ''};
};

},{"../registry":17}],14:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

/**
 * This will be transferred over to gd and overridden by
 * config args to Plotly.plot.
 *
 * The defaults are the appropriate settings for plotly.js,
 * so we get the right experience without any config argument.
 */

module.exports = {

    // no interactivity, for export or image generation
    staticPlot: false,

    // we can edit titles, move annotations, etc - sets all pieces of `edits`
    // unless a separate `edits` config item overrides individual parts
    editable: false,
    edits: {
        // annotationPosition: the main anchor of the annotation, which is the
        // text (if no arrow) or the arrow (which drags the whole thing leaving
        // the arrow length & direction unchanged)
        annotationPosition: false,
        // just for annotations with arrows, change the length  and direction of the arrow
        annotationTail: false,
        annotationText: false,
        axisTitleText: false,
        colorbarPosition: false,
        colorbarTitleText: false,
        legendPosition: false,
        // edit the trace name fields from the legend
        legendText: false,
        shapePosition: false,
        // the global `layout.title`
        titleText: false
    },

    // DO autosize once regardless of layout.autosize
    // (use default width or height values otherwise)
    autosizable: false,

    // set the length of the undo/redo queue
    queueLength: 0,

    // if we DO autosize, do we fill the container or the screen?
    fillFrame: false,

    // if we DO autosize, set the frame margins in percents of plot size
    frameMargins: 0,

    // mousewheel or two-finger scroll zooms the plot
    scrollZoom: false,

    // double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
    doubleClick: 'reset+autosize',

    // new users see some hints about interactivity
    showTips: true,

    // enable axis pan/zoom drag handles
    showAxisDragHandles: true,

    // enable direct range entry at the pan/zoom drag points (drag handles must be enabled above)
    showAxisRangeEntryBoxes: true,

    // link to open this plot in plotly
    showLink: false,

    // if we show a link, does it contain data or just link to a plotly file?
    sendData: true,

    // text appearing in the sendData link
    linkText: 'Edit chart',

    // false or function adding source(s) to linkText <text>
    showSources: false,

    // display the mode bar (true, false, or 'hover')
    displayModeBar: 'hover',

    // remove mode bar button by name
    // (see ./components/modebar/buttons.js for the list of names)
    modeBarButtonsToRemove: [],

    // add mode bar button using config objects
    // (see ./components/modebar/buttons.js for list of arguments)
    modeBarButtonsToAdd: [],

    // fully custom mode bar buttons as nested array,
    // where the outer arrays represents button groups, and
    // the inner arrays have buttons config objects or names of default buttons
    // (see ./components/modebar/buttons.js for more info)
    modeBarButtons: false,

    // add the plotly logo on the end of the mode bar
    displaylogo: true,

    // increase the pixel ratio for Gl plot images
    plotGlPixelRatio: 2,

    // background setting function
    // 'transparent' sets the background `layout.paper_color`
    // 'opaque' blends bg color with white ensuring an opaque background
    // or any other custom function of gd
    setBackground: 'transparent',

    // URL to topojson files used in geo charts
    topojsonURL: 'https://cdn.plot.ly/',

    // Mapbox access token (required to plot mapbox trace types)
    // If using an Mapbox Atlas server, set this option to '',
    // so that plotly.js won't attempt to authenticate to the public Mapbox server.
    mapboxAccessToken: null,

    // Turn all console logging on or off (errors will be thrown)
    // This should ONLY be set via Plotly.setPlotConfig
    logging: false,

    // Set global transform to be applied to all traces with no
    // specification needed
    globalTransforms: []
};

},{}],15:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var fxAttrs = require('../components/fx/attributes');

module.exports = {
    type: {
        valType: 'enumerated',
        role: 'info',
        values: [],     // listed dynamically
        dflt: 'scatter'
    },
    visible: {
        valType: 'enumerated',
        values: [true, false, 'legendonly'],
        role: 'info',
        dflt: true,
        description: [
            'Determines whether or not this trace is visible.',
            'If *legendonly*, the trace is not drawn,',
            'but can appear as a legend item',
            '(provided that the legend itself is visible).'
        ].join(' ')
    },
    showlegend: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        description: [
            'Determines whether or not an item corresponding to this',
            'trace is shown in the legend.'
        ].join(' ')
    },
    legendgroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        description: [
            'Sets the legend group for this trace.',
            'Traces part of the same legend group hide/show at the same time',
            'when toggling legend items.'
        ].join(' ')
    },
    opacity: {
        valType: 'number',
        role: 'style',
        min: 0,
        max: 1,
        dflt: 1,
        description: 'Sets the opacity of the trace.'
    },
    name: {
        valType: 'string',
        role: 'info',
        description: [
            'Sets the trace name.',
            'The trace name appear as the legend item and on hover.'
        ].join(' ')
    },
    uid: {
        valType: 'string',
        role: 'info',
        dflt: ''
    },
    ids: {
        valType: 'data_array',
        description: [
            'Assigns id labels to each datum.',
            'These ids for object constancy of data points during animation.'
        ].join(' ')
    },
    customdata: {
        valType: 'data_array',
        description: [
            'Assigns extra data each datum.',
            'This may be useful when listening to hover, click and selection events.',
            'Note that, *scatter* traces also appends customdata items in the markers',
            'DOM elements'
        ].join(' ')
    },
    hoverinfo: {
        valType: 'flaglist',
        role: 'info',
        flags: ['x', 'y', 'z', 'text', 'name'],
        extras: ['all', 'none', 'skip'],
        arrayOk: true,
        dflt: 'all',
        description: [
            'Determines which trace information appear on hover.',
            'If `none` or `skip` are set, no information is displayed upon hovering.',
            'But, if `none` is set, click and hover events are still fired.'
        ].join(' ')
    },
    hoverlabel: fxAttrs.hoverlabel,
    stream: {
        token: {
            valType: 'string',
            noBlank: true,
            strict: true,
            role: 'info',
            description: [
                'The stream id number links a data trace on a plot with a stream.',
                'See https://plot.ly/settings for more details.'
            ].join(' ')
        },
        maxpoints: {
            valType: 'number',
            min: 0,
            max: 10000,
            dflt: 500,
            role: 'info',
            description: [
                'Sets the maximum number of points to keep on the plots from an',
                'incoming stream.',
                'If `maxpoints` is set to *50*, only the newest 50 points will',
                'be displayed on the plot.'
            ].join(' ')
        }
    }
};

},{"../components/fx/attributes":5}],16:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';


module.exports = {
    family: {
        valType: 'string',
        role: 'style',
        noBlank: true,
        strict: true,
        description: [
            'HTML font family - the typeface that will be applied by the web browser.',
            'The web browser will only be able to apply a font if it is available on the system',
            'which it operates. Provide multiple font families, separated by commas, to indicate',
            'the preference in which to apply fonts if they aren\'t available on the system.',
            'The plotly service (at https://plot.ly or on-premise) generates images on a server,',
            'where only a select number of',
            'fonts are installed and supported.',
            'These include *Arial*, *Balto*, *Courier New*, *Droid Sans*,, *Droid Serif*,',
            '*Droid Sans Mono*, *Gravitas One*, *Old Standard TT*, *Open Sans*, *Overpass*,',
            '*PT Sans Narrow*, *Raleway*, *Times New Roman*.'
        ].join(' ')
    },
    size: {
        valType: 'number',
        role: 'style',
        min: 1
    },
    color: {
        valType: 'color',
        role: 'style'
    }
};

},{}],17:[function(require,module,exports){
/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Loggers = require('./lib/loggers');
var noop = require('./lib/noop');
var pushUnique = require('./lib/push_unique');
var basePlotAttributes = require('./plots/attributes');

exports.modules = {};
exports.allCategories = {};
exports.allTypes = [];
exports.subplotsRegistry = {};
exports.transformsRegistry = {};
exports.componentsRegistry = {};
exports.layoutArrayContainers = [];
exports.layoutArrayRegexes = [];

/**
 * register a module as the handler for a trace type
 *
 * @param {object} _module the module that will handle plotting this trace type
 * @param {string} thisType
 * @param {array of strings} categoriesIn all the categories this type is in,
 *     tested by calls: traceIs(trace, oneCategory)
 * @param {object} meta meta information about the trace type
 */
exports.register = function(_module, thisType, categoriesIn, meta) {
    if(exports.modules[thisType]) {
        Loggers.log('Type ' + thisType + ' already registered');
        return;
    }

    var categoryObj = {};
    for(var i = 0; i < categoriesIn.length; i++) {
        categoryObj[categoriesIn[i]] = true;
        exports.allCategories[categoriesIn[i]] = true;
    }

    exports.modules[thisType] = {
        _module: _module,
        categories: categoryObj
    };

    if(meta && Object.keys(meta).length) {
        exports.modules[thisType].meta = meta;
    }

    exports.allTypes.push(thisType);
};

/**
 * register a subplot type
 *
 * @param {object} _module subplot module:
 *
 *      @param {string or array of strings} attr
 *          attribute name in traces and layout
 *      @param {string or array of strings} idRoot
 *          root of id (setting the possible value for attrName)
 *      @param {object} attributes
 *          attribute(s) for traces of this subplot type
 *
 * In trace objects `attr` is the object key taking a valid `id` as value
 * (the set of all valid ids is generated below and stored in idRegex).
 *
 * In the layout object, a or several valid `attr` name(s) can be keys linked
 * to a nested attribute objects
 * (the set of all valid attr names is generated below and stored in attrRegex).
 */
exports.registerSubplot = function(_module) {
    var plotType = _module.name;

    if(exports.subplotsRegistry[plotType]) {
        Loggers.log('Plot type ' + plotType + ' already registered.');
        return;
    }

    // relayout array handling will look for component module methods with this
    // name and won't find them because this is a subplot module... but that
    // should be fine, it will just fall back on redrawing the plot.
    findArrayRegexps(_module);

    // not sure what's best for the 'cartesian' type at this point
    exports.subplotsRegistry[plotType] = _module;
};

exports.registerComponent = function(_module) {
    var name = _module.name;

    exports.componentsRegistry[name] = _module;

    if(_module.layoutAttributes) {
        if(_module.layoutAttributes._isLinkedToArray) {
            pushUnique(exports.layoutArrayContainers, name);
        }
        findArrayRegexps(_module);
    }
};

function findArrayRegexps(_module) {
    if(_module.layoutAttributes) {
        var arrayAttrRegexps = _module.layoutAttributes._arrayAttrRegexps;
        if(arrayAttrRegexps) {
            for(var i = 0; i < arrayAttrRegexps.length; i++) {
                pushUnique(exports.layoutArrayRegexes, arrayAttrRegexps[i]);
            }
        }
    }
}

/**
 * Get registered module using trace object or trace type
 *
 * @param {object||string} trace
 *  trace object with prop 'type' or trace type as a string
 * @return {object}
 *  module object corresponding to trace type
 */
exports.getModule = function(trace) {
    if(trace.r !== undefined) {
        Loggers.warn('Tried to put a polar trace ' +
            'on an incompatible graph of cartesian ' +
            'data. Ignoring this dataset.', trace
        );
        return false;
    }

    var _module = exports.modules[getTraceType(trace)];
    if(!_module) return false;
    return _module._module;
};

/**
 * Determine if this trace type is in a given category
 *
 * @param {object||string} traceType
 *  a trace (object) or trace type (string)
 * @param {string} category
 *  category in question
 * @return {boolean}
 */
exports.traceIs = function(traceType, category) {
    traceType = getTraceType(traceType);

    // old plot.ly workspace hack, nothing to see here
    if(traceType === 'various') return false;

    var _module = exports.modules[traceType];

    if(!_module) {
        if(traceType && traceType !== 'area') {
            Loggers.log('Unrecognized trace type ' + traceType + '.');
        }

        _module = exports.modules[basePlotAttributes.type.dflt];
    }

    return !!_module.categories[category];
};

/**
 * Determine if this trace has a transform of the given type and return
 * array of matching indices.
 *
 * @param {object} data
 *  a trace object (member of data or fullData)
 * @param {string} type
 *  type of trace to test
 * @return {array}
 *  array of matching indices. If none found, returns []
 */
exports.getTransformIndices = function(data, type) {
    var indices = [];
    var transforms = data.transforms || [];
    for(var i = 0; i < transforms.length; i++) {
        if(transforms[i].type === type) {
            indices.push(i);
        }
    }
    return indices;
};

/**
 * Determine if this trace has a transform of the given type
 *
 * @param {object} data
 *  a trace object (member of data or fullData)
 * @param {string} type
 *  type of trace to test
 * @return {boolean}
 */
exports.hasTransform = function(data, type) {
    var transforms = data.transforms || [];
    for(var i = 0; i < transforms.length; i++) {
        if(transforms[i].type === type) {
            return true;
        }
    }
    return false;

};

/**
 * Retrieve component module method. Falls back on noop if either the
 * module or the method is missing, so the result can always be safely called
 *
 * @param {string} name
 *  name of component (as declared in component module)
 * @param {string} method
 *  name of component module method
 * @return {function}
 */
exports.getComponentMethod = function(name, method) {
    var _module = exports.componentsRegistry[name];

    if(!_module) return noop;
    return _module[method] || noop;
};

function getTraceType(traceType) {
    if(typeof traceType === 'object') traceType = traceType.type;
    return traceType;
}

},{"./lib/loggers":9,"./lib/noop":11,"./lib/push_unique":12,"./plots/attributes":15}],18:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],19:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":23,"_process":18,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],20:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":23,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3}],21:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
},{"./checkPropTypes":19,"./lib/ReactPropTypesSecret":23,"_process":18,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],22:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
},{"./factoryWithThrowingShims":20,"./factoryWithTypeCheckers":21,"_process":18}],23:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _traceAccordion = require("./trace-accordion");

var _traceAccordion2 = _interopRequireDefault(_traceAccordion);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * These are the built-in panels for the editor. If the editor has children specified,
 * those panels will override these.
 */
var DefaultPanels = function (_Component) {
  _inherits(DefaultPanels, _Component);

  function DefaultPanels(props, context) {
    _classCallCheck(this, DefaultPanels);

    var _this = _possibleConstructorReturn(this, (DefaultPanels.__proto__ || Object.getPrototypeOf(DefaultPanels)).call(this, props));

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;
    return _this;
  }

  _createClass(DefaultPanels, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _panel2.default,
          { name: "graph-create" },
          _react2.default.createElement(
            _traceAccordion2.default,
            null,
            _react2.default.createElement(_select2.default, {
              label: "Plot Type",
              attr: "mode",
              options: [{ label: "Line", value: "lines" }, { label: "Scatter", value: "markers" }, { label: "Scatter line", value: "lines+markers" }]
            }),
            _react2.default.createElement(_select2.default, { label: "X", attr: "xsrc", options: this.dataSourceNames }),
            _react2.default.createElement(_select2.default, { label: "Y", attr: "ysrc", options: this.dataSourceNames }),
            _react2.default.createElement(_select2.default, {
              label: "Marker Size",
              attr: "marker.size",
              options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14]
            })
          )
        )
      );
    }
  }]);

  return DefaultPanels;
}(_react.Component);

DefaultPanels.contextTypes = {
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array
};

exports.default = DefaultPanels;

},{"./panel":28,"./select":29,"./trace-accordion":30,"prop-types":22}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenuItem = function (_Component) {
  _inherits(EditModeMenuItem, _Component);

  function EditModeMenuItem(props) {
    _classCallCheck(this, EditModeMenuItem);

    var _this = _possibleConstructorReturn(this, (EditModeMenuItem.__proto__ || Object.getPrototypeOf(EditModeMenuItem)).call(this, props));

    _this.state = {
      expanded: props.expanded
    };

    _this.toggleExpanded = _this.toggleExpanded.bind(_this);
    _this.onChangeSection = _this.onChangeSection.bind(_this);
    _this.renderSubItem = _this.renderSubItem.bind(_this);
    return _this;
  }

  _createClass(EditModeMenuItem, [{
    key: "toggleExpanded",
    value: function toggleExpanded() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: "onChangeSection",
    value: function onChangeSection(item) {
      this.props.onChangeSection(this.props.name + "-" + item);
    }
  }, {
    key: "renderSubItem",
    value: function renderSubItem(item, i) {
      var _this2 = this;

      var isActive = this.props.currentSection === this.props.name + "-" + item;

      return _react2.default.createElement(
        "div",
        {
          key: "subitem-" + i,
          className: "editModeMenu-subItem " + (isActive ? "is-active" : ""),
          onClick: function onClick() {
            return _this2.onChangeSection(item);
          }
        },
        item
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        {
          className: "editModeMenu-item " + (this.state.expanded ? "is-expanded" : "")
        },
        _react2.default.createElement(
          "div",
          { className: "editModeMenu-itemTitle", onClick: this.toggleExpanded },
          this.props.name
        ),
        this.state.expanded && this.props.sections.map(this.renderSubItem)
      );
    }
  }]);

  return EditModeMenuItem;
}(_react.Component);

exports.default = EditModeMenuItem;


EditModeMenuItem.defaultProps = {
  expanded: false
};

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _editModeMenuItem = require("./edit-mode-menu-item.js");

var _editModeMenuItem2 = _interopRequireDefault(_editModeMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenu = function (_Component) {
  _inherits(EditModeMenu, _Component);

  function EditModeMenu() {
    _classCallCheck(this, EditModeMenu);

    return _possibleConstructorReturn(this, (EditModeMenu.__proto__ || Object.getPrototypeOf(EditModeMenu)).apply(this, arguments));
  }

  _createClass(EditModeMenu, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "editModeMenu" },
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Graph",
          expanded: true,
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Create", "Filter", "Group"]
        }),
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Style",
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Traces", "Layout", "Notes", "Axes", "Legend", "Shapes", "Images"]
        })
      );
    }
  }]);

  return EditModeMenu;
}(_react.Component);

exports.default = EditModeMenu;

},{"./edit-mode-menu-item.js":25}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nested_property = require("plotly.js/src/lib/nested_property");

var _nested_property2 = _interopRequireDefault(_nested_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SRC_ATTR_PATTERN = /src$/;

var Field = function (_Component) {
  _inherits(Field, _Component);

  function Field(props, context) {
    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _this._index = context.traceIndex;
    _this._data = context.data[_this._index];
    _this._fullData = context.fullData[_this._index];
    _this._property = (0, _nested_property2.default)(_this._data, _this.props.attr);
    _this._fullProperty = (0, _nested_property2.default)(_this._fullData, _this.props.attr);
    _this.updatePlot = _this.updatePlot.bind(_this);
    _this._contextUpdate = context.handleUpdate;
    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;

    _this.state = {
      value: _this.fullValue
    };
    return _this;
  }

  _createClass(Field, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this._index = nextContext.traceIndex;
      this._contextUpdate = nextContext.handleUpdate;

      if (nextContext.data) {
        this._data = nextContext.data[this._index];
      } else {
        this._data = [];
      }

      if (nextContext.fullData) {
        this._fullData = nextContext.fullData[this._index];
      } else {
        this._fullData = [];
      }
    }
  }, {
    key: "updatePlot",
    value: function updatePlot(event) {
      this.value = event.target.value;
      this.setState({ value: event.target.value });
      this._contextUpdate && this._contextUpdate(this.props.attr, this.value);
    }
  }, {
    key: "value",
    get: function get() {
      return this._property.get();
    },
    set: function set(newValue) {
      this._property.set(newValue);

      this._contextUpdate(gd, this._data, this.props.attr, newValue);
    }
  }, {
    key: "fullValue",
    get: function get() {
      if (SRC_ATTR_PATTERN.test(this.props.attr)) {
        return this._property.get();
      } else {
        return this._fullProperty.get();
      }
    }
  }]);

  return Field;
}(_react.Component);

Field.contextTypes = {
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  handleUpdate: _propTypes2.default.func,
  traceIndex: _propTypes2.default.number
};

exports.default = Field;

},{"plotly.js/src/lib/nested_property":10,"prop-types":22}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.section = context.section;
    return _this;
  }

  _createClass(Panel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.section = nextContext.section;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.name === this.section) {
        return _react2.default.createElement(
          "div",
          { className: "panel" },
          this.props.children
        );
      } else {
        return _react2.default.createElement("div", null);
      }
    }
  }]);

  return Panel;
}(_react.Component);

Panel.contextTypes = {
  section: _propTypes2.default.string
};

exports.default = Panel;

},{"prop-types":22}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _field = require("./field");

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Field) {
  _inherits(Select, _Field);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
  }

  _createClass(Select, [{
    key: "renderOption",
    value: function renderOption(attrs, i) {
      return _react2.default.createElement(
        "option",
        { key: "option-" + i, value: attrs.value },
        attrs.label
      );
    }
  }, {
    key: "render",
    value: function render() {
      var options = this.props.options;

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) !== "object") {
          options[i] = {
            label: opt,
            value: opt
          };
        }
      }

      return _react2.default.createElement(
        "label",
        { className: "field" },
        _react2.default.createElement(
          "span",
          { className: "field-title" },
          this.props.label
        ),
        _react2.default.createElement(
          "select",
          {
            value: this.state.value,
            className: "field-control",
            onChange: this.updatePlot
          },
          options.map(this.renderOption)
        )
      );
    }
  }]);

  return Select;
}(_field2.default);

exports.default = Select;

},{"./field":27}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TracePanel = function (_Component) {
  _inherits(TracePanel, _Component);

  function TracePanel() {
    _classCallCheck(this, TracePanel);

    return _possibleConstructorReturn(this, (TracePanel.__proto__ || Object.getPrototypeOf(TracePanel)).apply(this, arguments));
  }

  _createClass(TracePanel, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        traceIndex: this.props.index
      };
    }
  }, {
    key: "render",
    value: function render() {
      //let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      //{children.map(c => cloneElement(c, {index: this.props.index}))}
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "tracePanel-top tracePanel-top--active" },
          "Trace ",
          this.props.index
        ),
        _react2.default.createElement(
          "div",
          { className: "tracePanel-panel" },
          this.props.children
        )
      );
    }
  }]);

  return TracePanel;
}(_react.Component);

TracePanel.childContextTypes = {
  traceIndex: _propTypes2.default.number
};

var TraceAccordion = function (_Component2) {
  _inherits(TraceAccordion, _Component2);

  function TraceAccordion(props, context) {
    _classCallCheck(this, TraceAccordion);

    var _this2 = _possibleConstructorReturn(this, (TraceAccordion.__proto__ || Object.getPrototypeOf(TraceAccordion)).call(this, props));

    _this2.data = context.data;
    _this2.renderPanel = _this2.renderPanel.bind(_this2);
    return _this2;
  }

  _createClass(TraceAccordion, [{
    key: "renderPanel",
    value: function renderPanel(d, i) {
      return _react2.default.createElement(
        TracePanel,
        { key: i, index: i },
        this.props.children
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "tracePanel" },
        this.data.map(this.renderPanel)
      );
    }
  }]);

  return TraceAccordion;
}(_react.Component);

TraceAccordion.contextTypes = {
  data: _propTypes2.default.array
};

exports.default = TraceAccordion;

},{"prop-types":22}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  baseClassName: "plotlyjsReactEditor"
};

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _panel = require("./components/panel");

var _panel2 = _interopRequireDefault(_panel);

var _editModeMenu = require("./components/edit-mode-menu.js");

var _editModeMenu2 = _interopRequireDefault(_editModeMenu);

var _select = require("./components/select");

var _select2 = _interopRequireDefault(_select);

var _defaultPanels = require("./components/default-panels");

var _defaultPanels2 = _interopRequireDefault(_defaultPanels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyReactEditor = function (_Component) {
  _inherits(PlotlyReactEditor, _Component);

  function PlotlyReactEditor(props) {
    _classCallCheck(this, PlotlyReactEditor);

    var _this = _possibleConstructorReturn(this, (PlotlyReactEditor.__proto__ || Object.getPrototypeOf(PlotlyReactEditor)).call(this, props));

    _this.state = {
      section: "Graph-Create"
    };

    _this.setSection = _this.setSection.bind(_this);
    return _this;
  }

  _createClass(PlotlyReactEditor, [{
    key: "setSection",
    value: function setSection(section) {
      this.setState({ section: section });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var gd = this.props.graphDiv || {};
      var dataSourceNames = Object.keys(this.props.dataSources || {});
      return {
        data: gd.data,
        fullData: gd._fullData,
        layout: gd.layout,
        fullLayout: gd._fullLayout,
        handleUpdate: this.updateProp.bind(this),
        section: this.state.section.toLowerCase(),
        dataSources: this.props.dataSources,
        dataSourceNames: dataSourceNames
      };
    }
  }, {
    key: "updateProp",
    value: function updateProp(attr, value) {
      this.props.onUpdate && this.props.onUpdate(this.props.graphDiv, attr, value);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "plotlyjsReactEditor" },
        _react2.default.createElement(_editModeMenu2.default, {
          currentSection: this.state.section,
          onChangeSection: this.setSection
        }),
        this.props.graphDiv && (this.props.children ? this.props.children : _react2.default.createElement(_defaultPanels2.default, null))
      );
    }
  }]);

  return PlotlyReactEditor;
}(_react.Component);

exports.default = PlotlyReactEditor;


PlotlyReactEditor.childContextTypes = {
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array,
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  handleUpdate: _propTypes2.default.func,
  section: _propTypes2.default.string
};

},{"./components/default-panels":24,"./components/edit-mode-menu.js":26,"./components/panel":28,"./components/select":29,"./constants":31,"prop-types":22}]},{},[32])(32)
});
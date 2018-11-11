'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shamefullyAdjustSizeref = exports.shamefullyDeleteRelatedAnalysisTransforms = exports.shamefullyCreateSplitStyleProps = exports.shamefullyAdjustSplitStyleTargetContainers = exports.shamefullyAddTableColumns = exports.shamefullyAdjustGeo = exports.shamefullyAdjustAxisRef = exports.shamefullyClearAxisTypes = undefined;

var _axis_ids = require('plotly.js/src/plots/cartesian/axis_ids');

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Temporary fix for:
// https://github.com/plotly/react-chart-editor/issues/103
// We should be able to remove this once the plotly.react method has
// been integrated into react-plotly.js and released:
// https://github.com/plotly/react-plotly.js/issues/2
/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
var shamefullyClearAxisTypes = exports.shamefullyClearAxisTypes = function shamefullyClearAxisTypes(graphDiv, _ref) {
  var traceIndexes = _ref.traceIndexes,
      update = _ref.update;

  if (!Array.isArray(graphDiv._fullData)) {
    return;
  }
  var hasSrc = false;
  for (var key in update) {
    if (key.substr(key.length - 3) === 'src') {
      hasSrc = true;
    }
  }
  if (hasSrc) {
    clearAxisTypes(graphDiv, traceIndexes);
  }
};

var axLetters = ['x', 'y', 'z'];
function clearAxisTypes(gd, traces) {
  for (var i = 0; i < traces.length; i++) {
    var trace = gd._fullData[i];
    for (var j = 0; j < 3; j++) {
      var type = axLetters[j];
      var ax = (0, _axis_ids.getFromId)(gd, trace[type + 'axis'] || type);

      // Do not clear log type.
      // Log type is never an auto result so must have been intentional.
      // We are also skipping clearing 3D which could cause bugs with 3D.
      if (ax && ax.type !== 'log') {
        var axAttr = ax._name;
        var typeAttr = axAttr + '.type';
        (0, _nested_property2.default)(gd.layout, typeAttr).set(null);
      }
    }
  }
}

var shamefullyAdjustAxisRef = exports.shamefullyAdjustAxisRef = function shamefullyAdjustAxisRef(graphDiv, payload) {
  if (payload.axesToBeGarbageCollected) {
    payload.axesToBeGarbageCollected.forEach(function (a) {
      var axis = a.charAt(0);
      var axisIdNumber = Number(a.slice(1));

      (0, _nested_property2.default)(graphDiv.layout, axis + 'axis' + (axisIdNumber || '')).set(null);
      Object.keys(graphDiv.layout).filter(function (key) {
        return key.startsWith(axis + 'axis');
      }).forEach(function (key) {
        if ((0, _nested_property2.default)(graphDiv.layout, key + '.overlaying').get() === a) {
          (0, _nested_property2.default)(graphDiv.layout, key + '.overlaying').set(null);
        }
      });
    });
  }
  if (payload.subplotToBeGarbageCollected) {
    (0, _nested_property2.default)(graphDiv.layout, payload.subplotToBeGarbageCollected).set(null);
  }
};

var geoRegex = /^(geo\d*)\./;
var shamefullyAdjustGeo = exports.shamefullyAdjustGeo = function shamefullyAdjustGeo(_ref2, _ref3) {
  var layout = _ref2.layout;
  var update = _ref3.update;

  Object.keys(update).forEach(function (k) {
    var geoMatch = geoRegex.exec(k);
    if (geoMatch) {
      var geo = geoMatch[1];
      if (update[geo + '.scope']) {
        update[geo + '.projection'] = {};
        update[geo + '.center'] = {};
      }

      if (
      // requesting projection change
      update[geo + '.projection.type'] && (update[geo + '.projection.type'] === 'albers usa' || layout[geo] && layout[geo].scope === 'usa')) {
        update[geo + '.scope'] = {};
        update[geo + '.center'] = {};
      }
    }
  });
};

var shamefullyAddTableColumns = exports.shamefullyAddTableColumns = function shamefullyAddTableColumns(graphDiv, _ref4) {
  var traceIndexes = _ref4.traceIndexes,
      update = _ref4.update;

  if (update['cells.values'] && (!graphDiv.data[traceIndexes[0]].header || !graphDiv.data[traceIndexes[0]].header.valuessrc)) {
    update['header.values'] = update['cells.valuessrc'];
  } else if (update['header.values'] === null) {
    update['header.values'] = graphDiv.data[traceIndexes[0]].cells.valuessrc || null;
  } else if (update['cells.values'] === null && !graphDiv.data[traceIndexes[0]].header.valuessrc) {
    update['header.values'] = null;
  }
};

var shamefullyAdjustSplitStyleTargetContainers = exports.shamefullyAdjustSplitStyleTargetContainers = function shamefullyAdjustSplitStyleTargetContainers(graphDiv, _ref5) {
  var traceIndexes = _ref5.traceIndexes,
      update = _ref5.update;

  for (var attr in update) {
    if (attr && attr.startsWith('transforms') && attr.endsWith('groups')) {
      var transformIndex = parseInt(attr.split('[')[1], 10);
      var transform = graphDiv.data[traceIndexes[0]].transforms[transformIndex];

      if (transform && transform.type === 'groupby' && transform.styles) {
        // Create style containers for all groups
        if (!transform.styles.length && update[attr]) {
          (function () {
            var dedupedGroups = [];
            update[attr].forEach(function (group) {
              if (!dedupedGroups.includes(group)) {
                dedupedGroups.push(group);
              }
            });

            var styles = dedupedGroups.map(function (groupEl) {
              return {
                target: groupEl,
                value: {}
              };
            });

            update['transforms[' + transformIndex + '].styles'] = styles;
          })();
        }

        // When clearing the data selector of groupby transforms, we want to clear
        // all the styles we've added
        if (transform.styles.length && !update[attr]) {
          update['transforms[' + transformIndex + '].styles'] = [];
        }
      }
    }
  }
};

var shamefullyCreateSplitStyleProps = exports.shamefullyCreateSplitStyleProps = function shamefullyCreateSplitStyleProps(graphDiv, attr, traceIndex, splitTraceGroup) {
  if (!Array.isArray(splitTraceGroup)) {
    splitTraceGroup = [splitTraceGroup]; // eslint-disable-line
  }

  var indexOfSplitTransform = null;

  graphDiv.data[traceIndex].transforms.forEach(function (t, i) {
    if (t.type === 'groupby') {
      indexOfSplitTransform = i;
    }
  });

  function getProp(group) {
    var indexOfStyleObject = null;

    graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles.forEach(function (s, i) {
      if (s.target.toString() === group) {
        indexOfStyleObject = i;
      }
    });

    var path = graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[indexOfStyleObject].value;

    attr.split('.').forEach(function (p) {
      if (!path[p]) {
        path[p] = {};
      }
      path = path[p];
    });

    return (0, _nested_property2.default)(graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[indexOfStyleObject].value, attr);
  }

  return splitTraceGroup.map(function (g) {
    return getProp(g);
  });
};

var shamefullyDeleteRelatedAnalysisTransforms = exports.shamefullyDeleteRelatedAnalysisTransforms = function shamefullyDeleteRelatedAnalysisTransforms(graphDiv, payload) {
  var parentTraceDataIndex = payload.traceIndexes[0];
  var parentUid = graphDiv.data[parentTraceDataIndex].uid;

  if (parentUid) {
    var relatedAnalysisTraceIndexes = [];
    graphDiv.data.forEach(function (d, i) {
      if (d.transforms && d.transforms.some(function (transform) {
        return ['moving-average', 'fit'].includes(transform.type) && transform.inputUid === parentUid;
      })) {
        relatedAnalysisTraceIndexes.push(i);
      }
    });

    if (relatedAnalysisTraceIndexes.length) {
      relatedAnalysisTraceIndexes.forEach(function (i) {
        graphDiv.data.splice(i, 1);
      });
    }
  }
};

var shamefullyAdjustSizeref = exports.shamefullyAdjustSizeref = function shamefullyAdjustSizeref(gd, _ref6) {
  var update = _ref6.update;
  var _update$markerSize = update['marker.size'],
      size = _update$markerSize === undefined ? null : _update$markerSize,
      _update$markerSizesr = update['marker.sizesrc'],
      src = _update$markerSizesr === undefined ? null : _update$markerSizesr;

  if (size && src) {
    var DEFAULT_MAX_AREA_PX = 45;
    var scaleFactor = DEFAULT_MAX_AREA_PX * DEFAULT_MAX_AREA_PX;
    update['marker.sizeref'] = size.reduce(function (a, b) {
      return Math.max(a, b);
    }) / scaleFactor;
    update['marker.sizemode'] = 'area';
  }
};
//# sourceMappingURL=shame.js.map
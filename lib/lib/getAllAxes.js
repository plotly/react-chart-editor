'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAllAxes;
exports.traceTypeToAxisType = traceTypeToAxisType;
exports.axisIdToAxisName = axisIdToAxisName;
exports.getAxisTitle = getAxisTitle;
exports.getSubplotTitle = getSubplotTitle;

var _constants = require('./constants');

var _2 = require('./');

function getAllAxes(fullLayout) {
  var axes = [];
  // Plotly.js should really have a helper function for this, but until it does..
  if (fullLayout && fullLayout._subplots) {
    Object.keys(fullLayout._subplots).filter(
    // xaxis and yaxis already included separately in _fullLayout._subplots
    function (type) {
      return type !== 'cartesian' && fullLayout._subplots[type].length !== 0;
    }).forEach(function (type) {
      fullLayout._subplots[type].forEach(function (subplot) {
        if (['xaxis', 'yaxis'].includes(type)) {
          // subplot will look like x2, x45, convert it to xaxis2, xaxis45
          subplot = // eslint-disable-line no-param-reassign
          subplot.length > 1 ? subplot.slice(0, 1) + 'axis' + subplot.slice(1) : subplot + 'axis';

          fullLayout[subplot]._subplot = subplot;
          fullLayout[subplot]._axisGroup = type;
          axes.push(fullLayout[subplot]);
        } else {
          Object.keys(fullLayout[subplot]).filter(function (key) {
            return key.includes('axis');
          }).forEach(function (axis) {
            fullLayout[subplot][axis]._subplot = subplot;
            fullLayout[subplot][axis]._axisGroup = type;

            // it should be in plotly.js, but it's not there for geo axes..
            if (!fullLayout[subplot][axis]._name) {
              fullLayout[subplot][axis]._name = axis;
            }
            axes.push(fullLayout[subplot][axis]);
          });
        }
      });
    });
  }

  return axes;
}

function traceTypeToAxisType(traceType) {
  var subplot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // plotly.js actually allows traces with no type and just
  // defaults them to scatter, so do this here as well.
  if (!traceType) {
    traceType = 'scatter'; // eslint-disable-line
  }

  var category = null;
  var traceToAxis = _constants.TRACE_TO_AXIS;
  if (subplot) {
    Object.assign(traceToAxis, _constants.TRACE_TO_AXIS, { scene: _constants.TRACE_TO_AXIS.gl3d });
    delete traceToAxis.gl3d;
  }

  Object.keys(traceToAxis).forEach(function (c) {
    if (traceToAxis[c].includes(traceType)) {
      category = c;
    }
  });

  if (category) {
    return category;
  }

  if (traceType === 'pie' || traceType === 'table') {
    return null;
  }

  throw new Error('Sorry, could not find ' + traceType + ' in any category.');
}

function axisIdToAxisName(id) {
  return id.charAt(0) + 'axis' + id.slice(1);
}

function getAxisNumber(axis) {
  var splitSubplot = axis._subplot ? axis._subplot.split(axis._axisGroup) : [];
  return splitSubplot[1] ? Number(splitSubplot[1]) : axis._name.split('axis')[1];
}

function getAxisTitle(axis) {
  var axisType = (0, _2.capitalize)(axis._name.split('axis')[0]);
  var subplotNumber = getAxisNumber(axis) || 1;

  return axis._input && axis._input.title ? (0, _2.striptags)(axisType + ': ' + axis._input.title) : (0, _2.striptags)(axisType + ' ' + subplotNumber);
}

function getSubplotNumber(subplot, type) {
  return Number(subplot.split(type)[1]);
}

function getSubplotTitle(subplot, type, _) {
  var axisName = (0, _constants.subplotName)(type, _);
  var subplotNumber = getSubplotNumber(subplot, _constants.SUBPLOT_TO_ATTR[type].layout) || '';

  return axisName + ' ' + subplotNumber;
}
//# sourceMappingURL=getAllAxes.js.map
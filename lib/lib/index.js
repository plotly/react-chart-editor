'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDITOR_ACTIONS = exports.getFullTrace = exports.transpose = exports.traceTypeToAxisType = exports.striptags = exports.tooLight = exports.walkObject = exports.unpackPlotProps = exports.renderTraceIcon = exports.plotlyTraceToCustomTrace = exports.maybeTransposeData = exports.maybeAdjustSrc = exports.localizeString = exports.localize = exports.isPlainObject = exports.getDisplayName = exports.getSubplotTitle = exports.getAxisTitle = exports.getAllAxes = exports.dereference = exports.traceTypeToPlotlyInitFigure = exports.computeTraceOptionsFromSchema = exports.containerConnectedContextTypes = exports.connectTraceToPlot = exports.connectAggregationToTransform = exports.connectTransformToTrace = exports.connectRangeSelectorToAxis = exports.connectToContainer = exports.connectLayoutToPlot = exports.connectAxesToLayout = exports.connectImageToLayout = exports.connectUpdateMenuToLayout = exports.connectSliderToLayout = exports.connectShapeToLayout = exports.connectAnnotationToLayout = exports.connectNonCartesianSubplotToLayout = exports.connectCartesianSubplotToLayout = exports.clamp = exports.pascalCase = exports.camelCase = exports.removeNonWord = exports.upperCase = exports.lowerCase = exports.capitalize = exports.bem = exports.axisIdToAxisName = exports.adjustColorscale = undefined;

var _bem = require('./bem');

var _bem2 = _interopRequireDefault(_bem);

var _connectCartesianSubplotToLayout = require('./connectCartesianSubplotToLayout');

var _connectCartesianSubplotToLayout2 = _interopRequireDefault(_connectCartesianSubplotToLayout);

var _connectNonCartesianSubplotToLayout = require('./connectNonCartesianSubplotToLayout');

var _connectNonCartesianSubplotToLayout2 = _interopRequireDefault(_connectNonCartesianSubplotToLayout);

var _connectAnnotationToLayout = require('./connectAnnotationToLayout');

var _connectAnnotationToLayout2 = _interopRequireDefault(_connectAnnotationToLayout);

var _connectShapeToLayout = require('./connectShapeToLayout');

var _connectShapeToLayout2 = _interopRequireDefault(_connectShapeToLayout);

var _connectSliderToLayout = require('./connectSliderToLayout');

var _connectSliderToLayout2 = _interopRequireDefault(_connectSliderToLayout);

var _connectImageToLayout = require('./connectImageToLayout');

var _connectImageToLayout2 = _interopRequireDefault(_connectImageToLayout);

var _connectUpdateMenuToLayout = require('./connectUpdateMenuToLayout');

var _connectUpdateMenuToLayout2 = _interopRequireDefault(_connectUpdateMenuToLayout);

var _connectRangeSelectorToAxis = require('./connectRangeSelectorToAxis');

var _connectRangeSelectorToAxis2 = _interopRequireDefault(_connectRangeSelectorToAxis);

var _connectTransformToTrace = require('./connectTransformToTrace');

var _connectTransformToTrace2 = _interopRequireDefault(_connectTransformToTrace);

var _connectAggregationToTransform = require('./connectAggregationToTransform');

var _connectAggregationToTransform2 = _interopRequireDefault(_connectAggregationToTransform);

var _connectAxesToLayout = require('./connectAxesToLayout');

var _connectAxesToLayout2 = _interopRequireDefault(_connectAxesToLayout);

var _connectLayoutToPlot = require('./connectLayoutToPlot');

var _connectLayoutToPlot2 = _interopRequireDefault(_connectLayoutToPlot);

var _connectToContainer = require('./connectToContainer');

var _connectToContainer2 = _interopRequireDefault(_connectToContainer);

var _computeTraceOptionsFromSchema = require('./computeTraceOptionsFromSchema');

var _connectTraceToPlot = require('./connectTraceToPlot');

var _connectTraceToPlot2 = _interopRequireDefault(_connectTraceToPlot);

var _dereference = require('./dereference');

var _dereference2 = _interopRequireDefault(_dereference);

var _getAllAxes = require('./getAllAxes');

var _getAllAxes2 = _interopRequireDefault(_getAllAxes);

var _localize = require('./localize');

var _localize2 = _interopRequireDefault(_localize);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _unpackPlotProps = require('./unpackPlotProps');

var _unpackPlotProps2 = _interopRequireDefault(_unpackPlotProps);

var _walkObject = require('./walkObject');

var _walkObject2 = _interopRequireDefault(_walkObject);

var _customTraceType = require('./customTraceType');

var _plotlyIcons = require('plotly-icons');

var PlotlyIcons = _interopRequireWildcard(_plotlyIcons);

var _striptags = require('./striptags');

var _striptags2 = _interopRequireDefault(_striptags);

var _strings = require('./strings');

var _reactColorscales = require('react-colorscales');

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOO_LIGHT_FACTOR = 0.8;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function tooLight(color) {
  var hslColor = (0, _tinycolor2.default)(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

function renderTraceIcon(trace) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Plot';

  if (!trace) {
    return null;
  }
  var gl = 'gl';
  var componentName = '' + prefix + (0, _strings.pascalCase)(trace.endsWith(gl) ? trace.slice(0, -gl.length) : trace) + 'Icon';

  return PlotlyIcons[componentName] ? PlotlyIcons[componentName] : PlotlyIcons.PlotLineIcon;
}

function transpose(originalArray) {
  // if we want to transpose a uni dimensional array
  if (originalArray.every(function (a) {
    return !Array.isArray(a);
  })) {
    return originalArray.map(function (a) {
      return [a];
    });
  }

  var longestArrayItem = Array.isArray(originalArray[0]) ? originalArray[0].length : 1;

  originalArray.forEach(function (a) {
    // if it's not an array, it's a string
    var length = Array.isArray(a) ? a.length : 1;
    if (length > longestArrayItem) {
      longestArrayItem = length;
    }
  });

  var newArray = new Array(longestArrayItem);

  for (var outerIndex = 0; outerIndex < originalArray.length; outerIndex++) {
    if (!Array.isArray(originalArray[outerIndex])) {
      originalArray[outerIndex] = [originalArray[outerIndex]];
    }

    for (var innerIndex = 0; innerIndex < longestArrayItem; innerIndex++) {
      // ensure we have an array to push to
      if (!Array.isArray(newArray[innerIndex])) {
        newArray[innerIndex] = [];
      }

      var value = typeof originalArray[outerIndex][innerIndex] !== 'undefined' ? originalArray[outerIndex][innerIndex] : null;
      newArray[innerIndex].push(value);
    }
  }

  return newArray;
}

var specialTableCase = function specialTableCase(traceType, srcAttributePath) {
  /* Just more user friendly
   * Table traces have many configuration options,
   * The below attributes can be 2d or 1d and will affect the plot differently
   * EX:
   * header.values = ['Jan', 'Feb', 'Mar'] => will put data in a row
   * header.values = [['Jan', 1], ['Feb', 2], ['Mar', 3]] => will create 3 columns
   * 1d arrays affect columns
   * 2d arrays affect rows within each column
   */
  return traceType === 'table' && ['header.valuessrc', 'header.font.colorsrc', 'header.font.sizesrc', 'header.fill.colorsrc', 'columnwidthsrc'].some(function (a) {
    return srcAttributePath.endsWith(a);
  });
};

function maybeTransposeData(data, srcAttributePath, traceType) {
  if (!data || Array.isArray(data) && data.length === 0) {
    return null;
  }

  var isTransposable2DArray = srcAttributePath.endsWith('zsrc') && ['contour', 'contourgl', 'heatmap', 'heatmapgl', 'surface', 'carpet', 'contourcarpet'].includes(traceType);

  if (isTransposable2DArray) {
    return transpose(data);
  }

  if (specialTableCase(traceType, srcAttributePath) && Array.isArray(data[0]) && data.length === 1) {
    return data[0];
  }

  return data;
}

function maybeAdjustSrc(src, srcAttributePath, traceType, config) {
  if (!src || Array.isArray(src) && src.length === 0) {
    return null;
  }

  if (specialTableCase(traceType, srcAttributePath) && src.length === 1) {
    return src[0];
  }

  return config && config.fromSrc ? config.fromSrc(src, traceType) : src;
}

function adjustColorscale(colorscale, numberOfNeededColors, colorscaleType, config) {
  if (config && config.repeat) {
    if (numberOfNeededColors < colorscale.length) {
      return colorscale.slice(0, numberOfNeededColors);
    }

    var repetitions = Math.ceil(numberOfNeededColors / colorscale.length);
    var newArray = new Array(repetitions).fill(colorscale);
    return newArray.reduce(function (a, b) {
      return a.concat(b);
    }, []).slice(0, numberOfNeededColors);
  }

  return (0, _reactColorscales.getColorscale)(colorscale, numberOfNeededColors, null, null, colorscaleType);
}

function getFullTrace(props, context) {
  var fullTrace = {};
  if (context.fullData && context.data) {
    if (props.fullDataArrayPosition) {
      // fullDataArrayPosition will be supplied in panels that have the canGroup prop
      fullTrace = context.fullData[props.fullDataArrayPosition[0]];
    } else {
      // for all other panels, we'll find fullTrace with the data index
      fullTrace = context.fullData.filter(function (t) {
        return t && props.traceIndexes[0] === t.index;
      })[0];
    }

    // For transformed traces, we actually want to read in _fullInput because
    // there's original parent information that's more useful to the user there
    // This is true except for fit transforms, where reading in fullData is
    // what we want
    if (fullTrace.transforms && !fullTrace.transforms.some(function (t) {
      return ['moving-average', 'fits'].includes(t.type);
    }) && !props.fullDataArrayPosition) {
      fullTrace = fullTrace._fullInput;
    }
  }
  return fullTrace;
}

exports.adjustColorscale = adjustColorscale;
exports.axisIdToAxisName = _getAllAxes.axisIdToAxisName;
exports.bem = _bem2.default;
exports.capitalize = _strings.capitalize;
exports.lowerCase = _strings.lowerCase;
exports.upperCase = _strings.upperCase;
exports.removeNonWord = _strings.removeNonWord;
exports.camelCase = _strings.camelCase;
exports.pascalCase = _strings.pascalCase;
exports.clamp = clamp;
exports.connectCartesianSubplotToLayout = _connectCartesianSubplotToLayout2.default;
exports.connectNonCartesianSubplotToLayout = _connectNonCartesianSubplotToLayout2.default;
exports.connectAnnotationToLayout = _connectAnnotationToLayout2.default;
exports.connectShapeToLayout = _connectShapeToLayout2.default;
exports.connectSliderToLayout = _connectSliderToLayout2.default;
exports.connectUpdateMenuToLayout = _connectUpdateMenuToLayout2.default;
exports.connectImageToLayout = _connectImageToLayout2.default;
exports.connectAxesToLayout = _connectAxesToLayout2.default;
exports.connectLayoutToPlot = _connectLayoutToPlot2.default;
exports.connectToContainer = _connectToContainer2.default;
exports.connectRangeSelectorToAxis = _connectRangeSelectorToAxis2.default;
exports.connectTransformToTrace = _connectTransformToTrace2.default;
exports.connectAggregationToTransform = _connectAggregationToTransform2.default;
exports.connectTraceToPlot = _connectTraceToPlot2.default;
exports.containerConnectedContextTypes = _connectToContainer.containerConnectedContextTypes;
exports.computeTraceOptionsFromSchema = _computeTraceOptionsFromSchema.computeTraceOptionsFromSchema;
exports.traceTypeToPlotlyInitFigure = _customTraceType.traceTypeToPlotlyInitFigure;
exports.dereference = _dereference2.default;
exports.getAllAxes = _getAllAxes2.default;
exports.getAxisTitle = _getAllAxes.getAxisTitle;
exports.getSubplotTitle = _getAllAxes.getSubplotTitle;
exports.getDisplayName = getDisplayName;
exports.isPlainObject = _walkObject.isPlainObject;
exports.localize = _localize2.default;
exports.localizeString = _localize.localizeString;
exports.maybeAdjustSrc = maybeAdjustSrc;
exports.maybeTransposeData = maybeTransposeData;
exports.plotlyTraceToCustomTrace = _customTraceType.plotlyTraceToCustomTrace;
exports.renderTraceIcon = renderTraceIcon;
exports.unpackPlotProps = _unpackPlotProps2.default;
exports.walkObject = _walkObject2.default;
exports.tooLight = tooLight;
exports.striptags = _striptags2.default;
exports.traceTypeToAxisType = _getAllAxes.traceTypeToAxisType;
exports.transpose = transpose;
exports.getFullTrace = getFullTrace;
exports.EDITOR_ACTIONS = _constants.EDITOR_ACTIONS;
//# sourceMappingURL=index.js.map
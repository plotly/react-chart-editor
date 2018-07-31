import bem from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectShapeToLayout from './connectShapeToLayout';
import connectSliderToLayout from './connectSliderToLayout';
import connectImageToLayout from './connectImageToLayout';
import connectUpdateMenuToLayout from './connectUpdateMenuToLayout';
import connectRangeSelectorToAxis from './connectRangeSelectorToAxis';
import connectTransformToTrace from './connectTransformToTrace';
import connectAggregationToTransform from './connectAggregationToTransform';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot from './connectLayoutToPlot';
import connectToContainer, {
  containerConnectedContextTypes,
} from './connectToContainer';
import {computeTraceOptionsFromSchema} from './computeTraceOptionsFromSchema';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import getAllAxes, {
  axisIdToAxisName,
  traceTypeToAxisType,
  getAxisTitle,
} from './getAllAxes';
import localize, {localizeString} from './localize';
import tinyColor from 'tinycolor2';
import unpackPlotProps from './unpackPlotProps';
import walkObject, {isPlainObject} from './walkObject';
import {
  traceTypeToPlotlyInitFigure,
  plotlyTraceToCustomTrace,
} from './customTraceType';
import * as PlotlyIcons from 'plotly-icons';
import striptags from './striptags';
import {
  capitalize,
  lowerCase,
  upperCase,
  removeNonWord,
  camelCase,
  pascalCase,
} from './strings';
import {getColorscale} from 'react-colorscales';

const TOO_LIGHT_FACTOR = 0.8;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

function renderTraceIcon(trace, prefix = 'Plot') {
  if (!trace) {
    return null;
  }
  const gl = 'gl';
  const componentName = `${prefix}${pascalCase(
    trace.endsWith(gl) ? trace.slice(0, -gl.length) : trace
  )}Icon`;
  return PlotlyIcons[componentName]
    ? PlotlyIcons[componentName]
    : PlotlyIcons.PlotLineIcon;
}

function transpose(originalArray) {
  // if we want to transpose a uni dimensional array
  if (originalArray.every(a => !Array.isArray(a))) {
    return originalArray.map(a => [a]);
  }

  let longestArrayItem = Array.isArray(originalArray[0])
    ? originalArray[0].length
    : 1;

  originalArray.forEach(a => {
    // if it's not an array, it's a string
    const length = Array.isArray(a) ? a.length : 1;
    if (length > longestArrayItem) {
      longestArrayItem = length;
    }
  });

  const newArray = new Array(longestArrayItem);

  for (let outerIndex = 0; outerIndex < originalArray.length; outerIndex++) {
    if (!Array.isArray(originalArray[outerIndex])) {
      originalArray[outerIndex] = [originalArray[outerIndex]];
    }

    for (let innerIndex = 0; innerIndex < longestArrayItem; innerIndex++) {
      // ensure we have an array to push to
      if (!Array.isArray(newArray[innerIndex])) {
        newArray[innerIndex] = [];
      }

      const value =
        typeof originalArray[outerIndex][innerIndex] !== 'undefined'
          ? originalArray[outerIndex][innerIndex]
          : null;
      newArray[innerIndex].push(value);
    }
  }

  return newArray;
}

const specialTableCase = (traceType, srcAttributePath) => {
  /* Just more user friendly
   * Table traces have many configuration options,
   * The below attributes can be 2d or 1d and will affect the plot differently
   * EX:
   * header.values = ['Jan', 'Feb', 'Mar'] => will put data in a row
   * header.values = [['Jan', 1], ['Feb', 2], ['Mar', 3]] => will create 3 columns
   * 1d arrays affect columns
   * 2d arrays affect rows within each column
   */
  return (
    traceType === 'table' &&
    [
      'header.valuessrc',
      'header.font.colorsrc',
      'header.font.sizesrc',
      'header.fill.colorsrc',
      'columnwidthsrc',
    ].some(a => srcAttributePath.endsWith(a))
  );
};

function maybeTransposeData(data, srcAttributePath, traceType) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  const isTransposable2DArray =
    srcAttributePath.endsWith('zsrc') &&
    [
      'contour',
      'contourgl',
      'heatmap',
      'heatmapgl',
      'surface',
      'carpet',
      'contourcarpet',
    ].includes(traceType);

  if (isTransposable2DArray) {
    return transpose(data);
  }

  if (
    specialTableCase(traceType, srcAttributePath) &&
    Array.isArray(data[0]) &&
    data.length === 1
  ) {
    return data[0];
  }

  return data;
}

function maybeAdjustSrc(src, srcAttributePath, traceType, config) {
  if (!src || (Array.isArray(src) && src.length === 0)) {
    return null;
  }

  if (specialTableCase(traceType, srcAttributePath) && src.length === 1) {
    return src[0];
  }

  return config && config.fromSrc ? config.fromSrc(src, traceType) : src;
}

function adjustColorscale(
  colorscale,
  numberOfNeededColors,
  colorscaleType,
  config
) {
  if (config.repeat) {
    const repetitions = Math.ceil(numberOfNeededColors / colorscale.length);
    const newArray = new Array(repetitions).fill(colorscale);
    return newArray
      .reduce((a, b) => {
        return a.concat(b);
      }, [])
      .slice(0, numberOfNeededColors);
  }

  return getColorscale(
    colorscale,
    numberOfNeededColors,
    null,
    null,
    colorscaleType
  );
}

export {
  adjustColorscale,
  axisIdToAxisName,
  bem,
  capitalize,
  lowerCase,
  upperCase,
  removeNonWord,
  camelCase,
  pascalCase,
  clamp,
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectSliderToLayout,
  connectUpdateMenuToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectRangeSelectorToAxis,
  connectTransformToTrace,
  connectAggregationToTransform,
  connectTraceToPlot,
  containerConnectedContextTypes,
  computeTraceOptionsFromSchema,
  traceTypeToPlotlyInitFigure,
  dereference,
  getAllAxes,
  getAxisTitle,
  getDisplayName,
  isPlainObject,
  localize,
  localizeString,
  maybeAdjustSrc,
  maybeTransposeData,
  plotlyTraceToCustomTrace,
  renderTraceIcon,
  unpackPlotProps,
  walkObject,
  tooLight,
  striptags,
  traceTypeToAxisType,
  transpose,
};

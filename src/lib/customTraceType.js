import {COLORS} from 'lib/constants';

export function plotlyTraceToCustomTrace(trace) {
  if (typeof trace !== 'object') {
    throw new Error(
      `trace provided to plotlyTraceToCustomTrace function should be an object, received ${typeof trace}`
    );
  }

  const gl = 'gl';
  const type = trace.type
    ? trace.type.endsWith(gl)
      ? trace.type.slice(0, -gl.length)
      : trace.type
    : 'scatter';

  if (
    (type === 'scatter' || type === 'scattergl') &&
    (![null, undefined, ''].includes(trace.stackgroup) || // eslint-disable-line no-undefined
      ['tozeroy', 'tozerox', 'tonexty', 'tonextx', 'toself', 'tonext'].includes(trace.fill))
  ) {
    return 'area';
  } else if (
    (type === 'scatter' || type === 'scattergl') &&
    (trace.mode === 'lines' || trace.mode === 'lines+markers')
  ) {
    return 'line';
  } else if (type === 'scatter3d' && trace.mode === 'lines') {
    return 'line3d';
  }
  return type;
}

export function traceTypeToPlotlyInitFigure(traceType, gl = '') {
  switch (traceType) {
    case 'line':
      return {type: 'scatter' + gl, mode: 'lines', stackgroup: null};
    case 'scatter':
      return {type: 'scatter' + gl, mode: 'markers', stackgroup: null};
    case 'area':
      return {type: 'scatter' + gl, mode: 'lines', stackgroup: 1};
    case 'scatterpolar':
      return {type: 'scatterpolar' + gl};
    case 'ohlc':
      return {
        type: 'ohlc',
        decreasing: {line: {color: COLORS.middleGray}},
        increasing: {line: {color: COLORS.blueTeal}},
      };
    case 'candlestick':
      return {
        type: 'candlestick',
        decreasing: {
          line: {color: COLORS.middleGray},
          fillcolor: 'rgba(127, 127, 127, 0.5)',
        },
        increasing: {
          line: {color: COLORS.blueTeal},
          fillcolor: 'rgba(23, 190, 207, 0.5)',
        },
      };
    case 'box':
      return {
        type: 'box',
        boxpoints: false,
      };
    case 'violin':
      return {
        type: 'violin',
        bandwidth: 0,
      };
    case 'line3d':
      return {
        type: 'scatter3d',
        mode: 'lines',
      };
    case 'scatter3d':
      return {
        type: 'scatter3d',
        mode: 'markers',
      };
    case 'pie':
      return {
        marker: {
          colors: [],
        },
        type: 'pie',
      };
    case 'bar':
      return {
        orientation: 'v',
        type: 'bar',
      };
    case 'cone':
      return {
        sizeref: 1,
        type: 'cone',
      };
    default:
      return {type: traceType};
  }
}

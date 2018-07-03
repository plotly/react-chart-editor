export function plotlyTraceToCustomTrace(trace) {
  const type = trace.type || 'scatter';
  if (
    type === 'scatter' &&
    ['tozeroy', 'tozerox', 'tonexty', 'tonextx', 'toself', 'tonext'].includes(
      trace.fill
    )
  ) {
    return 'area';
  } else if (
    type === 'scatter' &&
    (trace.mode === 'lines' || trace.mode === 'lines+markers')
  ) {
    return 'line';
  } else if (type === 'scatter3d' && trace.mode === 'lines') {
    return 'line3d';
  }
  return trace.type;
}

export function traceTypeToPlotlyInitFigure(traceType) {
  switch (traceType) {
    case 'line':
      return {type: 'scatter', mode: 'lines', fill: 'none'};
    case 'scatter':
      return {type: 'scatter', mode: 'markers', fill: 'none'};
    case 'area':
      return {type: 'scatter', fill: 'tozeroy'};
    case 'ohlc':
      return {
        type: 'ohlc',
        decreasing: {line: {color: '#7F7F7F'}},
        increasing: {line: {color: '#17BECF'}},
      };
    case 'candlestick':
      return {
        type: 'candlestick',
        decreasing: {
          line: {color: '#7F7F7F'},
          fillcolor: 'rgba(127, 127, 127, 0.5)',
        },
        increasing: {
          line: {color: '#17BECF'},
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
        box: {visible: false},
        meanline: {visible: false},
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
    default:
      return {type: traceType};
  }
}

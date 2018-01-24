export function plotlyTraceToCustomTrace(trace) {
  if (
    trace.type === 'scatter' &&
    ['tozeroy', 'tozerox', 'tonexty', 'tonextx', 'toself', 'tonext'].includes(
      trace.fill
    )
  ) {
    return 'area';
  } else if (
    trace.type === 'scatter' &&
    (trace.mode === 'lines' || trace.mode === 'lines+markers')
  ) {
    return 'line';
  }
  return trace.type;
}

export function traceTypeToPlotlyInitFigure(traceType) {
  if (traceType === 'line') {
    return {type: 'scatter', mode: 'lines', fill: 'none'};
  }

  if (traceType === 'scatter') {
    return {type: 'scatter', mode: 'markers', fill: 'none'};
  }

  if (traceType === 'area') {
    return {type: 'scatter', fill: 'tozeroy'};
  }

  if (traceType === 'ohlc') {
    return {
      type: 'ohlc',
      autobinx: true,
      autobiny: true,
      decreasing: {line: {color: '#7F7F7F'}},
      increasing: {line: {color: '#17BECF'}},
    };
  }

  if (traceType === 'candlestick') {
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
  }

  return {type: traceType};
}

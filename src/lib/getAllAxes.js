export default function getAllAxes(fullLayout) {
  const axes = [];
  // Plotly.js should really have a helper function for this, but until it does..
  if (fullLayout && fullLayout._subplots) {
    Object.keys(fullLayout._subplots)
      .filter(
        // xaxis and yaxis already included separately in _fullLayout._subplots
        type => type !== 'cartesian' && fullLayout._subplots[type].length !== 0
      )
      .forEach(type => {
        fullLayout._subplots[type].forEach(subplot => {
          if (['xaxis', 'yaxis'].includes(type)) {
            // subplot will look like x2, x45, convert it to xaxis2, xaxis45
            subplot = // eslint-disable-line no-param-reassign
              subplot.length > 1
                ? subplot.slice(0, 1) + 'axis' + subplot.slice(1)
                : subplot + 'axis';

            fullLayout[subplot].subplot = subplot;
            axes.push(fullLayout[subplot]);
          } else {
            Object.keys(fullLayout[subplot])
              .filter(key => key.includes('axis'))
              .forEach(axis => {
                fullLayout[subplot][axis].subplot = subplot;

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

export function traceTypeToAxisType(traceType) {
  const TRACE_TO_AXIS = {
    cartesian: [
      'scatter',
      'box',
      'bar',
      'heatmap',
      'contour',
      'ohlc',
      'candlestick',
    ],
    ternary: ['ternary'],
    gl3d: ['scatter3d', 'surface', 'mesh3d'],
    geo: ['scattergeo', 'choropleth'],
    mapbox: ['scattermapbox'],
  };

  let category = null;

  Object.keys(TRACE_TO_AXIS).forEach(c => {
    if (TRACE_TO_AXIS[c].includes(traceType)) {
      category = c;
    }
  });

  if (category) {
    return category;
  }
  throw new Error(`Sorry, could not find ${traceType} in any category.`);
}

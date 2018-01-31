import {unpackPlotProps, getLayoutContext} from './';

// Workaround the issue with nested layouts inside trace component.
// See:
// https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
export function supplyLayoutPlotProps(props, context) {
  return unpackPlotProps(props, {
    ...context,
    ...getLayoutContext(context),
  });
}

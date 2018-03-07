import {unpackPlotProps, getLayoutContext} from './';

// Workaround the issue with nested layouts inside trace component.
// See:
// https://github.com/plotly/react-chart-editor/issues/58#issuecomment-345492794
export default function supplyLayoutPlotProps(props, context) {
  return unpackPlotProps(props, {
    ...context,
    ...getLayoutContext(context),
  });
}

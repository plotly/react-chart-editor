/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
import {list} from 'plotly.js/src/plots/cartesian/axis_ids';
import {UnconnectedNumeric} from './components/fields/Numeric';
import {
  connectLayoutToPlot,
  connectToContainer,
  getLayoutContext,
  unpackPlotProps,
} from './lib';

export function noShame(opts) {
  if (opts.plotly && !opts.plotly.Axes) {
    opts.plotly.Axes = {
      list,
    };
  }
}

class NumericNoArrows extends UnconnectedNumeric {}
NumericNoArrows.propTypes = UnconnectedNumeric.propTypes;
NumericNoArrows.defaultProps = {
  showArrows: false,
};

export const BoxGap = connectLayoutToPlot(
  connectToContainer(NumericNoArrows, {
    supplyPlotProps: (props, context) => {
      // workaround the issue with nested layouts inside trace component.
      // See
      // https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
      const plotProps = unpackPlotProps(props, {
        ...context,
        ...getLayoutContext(context),
      });

      // Full value should multiply by percentage if number.

      return plotProps;
    },
  })
);

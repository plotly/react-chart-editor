/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
import isNumeric from 'fast-isnumeric';
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
  postfix: '%',
};

// Workaround the issue with nested layouts inside trace component.
// See:
// https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
const supplyLayoutPlotProps = (props, context) => {
  return unpackPlotProps(props, {
    ...context,
    ...getLayoutContext(context),
  });
};

export const BoxWidth = connectLayoutToPlot(
  connectToContainer(NumericNoArrows, {
    supplyPlotProps: supplyLayoutPlotProps,
    modifyPlotProps: (props, context, plotProps) => {
      const {fullValue, updatePlot} = plotProps;
      plotProps.fullValue = () => {
        let fv = fullValue();
        if (isNumeric(fv)) {
          fv = Math.round((1 - fv) * 100);
        }
        return fv;
      };

      plotProps.updatePlot = v => {
        if (isNumeric(v)) {
          updatePlot(1 - v / 100);
        } else {
          updatePlot(v);
        }
      };

      plotProps.max = 100;
    },
  })
);

export const BoxPad = connectLayoutToPlot(
  connectToContainer(NumericNoArrows, {
    supplyPlotProps: supplyLayoutPlotProps,
    modifyPlotProps: (props, context, plotProps) => {
      const {fullValue, updatePlot} = plotProps;
      plotProps.fullValue = () => {
        let fv = fullValue();
        if (isNumeric(fv)) {
          fv = fv * 100;
        }
        return fv;
      };

      plotProps.updatePlot = v => {
        if (isNumeric(v)) {
          updatePlot(v / 100);
        } else {
          updatePlot(v);
        }
      };

      plotProps.max = 100;
    },
  })
);

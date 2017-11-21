/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
import {list} from 'plotly.js/src/plots/cartesian/axis_ids';

export function noShame(opts) {
  if (opts.plotly && !opts.plotly.Axes) {
    opts.plotly.Axes = {
      list,
    };
  }
}

import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectTraceToPlot,
  connectCartesianSubplotToLayout,
  connectNonCartesianSubplotToLayout,
  getSubplotTitle,
} from 'lib';
import {TRACE_TO_AXIS, SUBPLOT_TO_ATTR} from 'lib/constants';
import {EditorControlsContext} from '../../context';

const TraceFold = connectTraceToPlot(PlotlyFold);
const NonCartesianSubplotFold = connectNonCartesianSubplotToLayout(PlotlyFold);
const CartesianSubplotFold = connectCartesianSubplotToLayout(PlotlyFold);

class SubplotAccordion extends Component {
  render() {
    const {data = [], layout = {}, localize: _} = this.context;
    const {children} = this.props;
    const subplotFolds = [];

    const allCartesianAxisCombinations = data.reduce((acc, curVal, inx) => {
      if (TRACE_TO_AXIS.cartesian.some(c => c === curVal.type)) {
        const xaxis = 'xaxis' + (curVal.xaxis ? curVal.xaxis.substring(1) : '');
        const yaxis = 'yaxis' + (curVal.yaxis ? curVal.yaxis.substring(1) : '');

        const existingComboIndex = acc.findIndex(t => t.xaxis === xaxis && t.yaxis === yaxis);
        if (existingComboIndex === -1) {
          acc.push({
            xaxis: xaxis,
            yaxis: yaxis,
            xaxisName: curVal.xaxis ? getSubplotTitle(curVal.xaxis, 'x', _) : 'X 1',
            yaxisName: curVal.yaxis ? getSubplotTitle(curVal.yaxis, 'y', _) : 'Y 1',
            index: [inx],
          });
        } else {
          acc[existingComboIndex].index.push(inx);
        }
      }
      return acc;
    }, []);

    allCartesianAxisCombinations.forEach(
      d =>
        (subplotFolds[d.index[0]] = (
          <CartesianSubplotFold
            key={d.index[0]}
            traceIndexes={d.index}
            canDelete={false}
            xaxis={d.xaxis}
            yaxis={d.yaxis}
            name={`${d.xaxisName} | ${d.yaxisName}`}
          >
            {children}
          </CartesianSubplotFold>
        ))
    );

    // For each key in layout, find all traces that belong to this subplot.
    // E.g. if layout attr is 'ternary', find all traces that are of type
    // that has subplot ternary, if layout attr is 'ternary2', find traces
    // of right type that have attr 'subplot': 'ternary' in their data.

    /**
    Example: 
    {
      "data": [
        {
          "type": "scatterternary",
          "mode": "markers",
        },
        {
          "type": "scatterternary",
          "mode": "markers",
          "subplot": "ternary2"
        }
      ],
      "layout": {
        "ternary": {},
        "ternary2": {},
      },
    }
     */

    Object.keys(layout).forEach(layoutKey => {
      const traceIndexes = [];
      let subplotName;
      if (
        ['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(subplotType => {
          subplotName = getSubplotTitle(layoutKey, subplotType, _);
          const trIndex =
            SUBPLOT_TO_ATTR[subplotType].layout === layoutKey
              ? data.findIndex(trace => TRACE_TO_AXIS[subplotType].some(tt => tt === trace.type))
              : data.findIndex(trace => trace[SUBPLOT_TO_ATTR[subplotType].data] === layoutKey);
          if (trIndex !== -1) {
            traceIndexes.push(trIndex);
          }
          return layoutKey.startsWith(SUBPLOT_TO_ATTR[subplotType].layout);
        })
      ) {
        subplotFolds[traceIndexes[0]] = (
          <NonCartesianSubplotFold
            key={layoutKey}
            traceIndexes={traceIndexes}
            canDelete={false}
            subplot={layoutKey}
            name={subplotName}
          >
            {children}
          </NonCartesianSubplotFold>
        );
      }
    });

    let pieCounter = 0;
    let tableCounter = 0;
    data.forEach((d, i) => {
      if ((d.type === 'pie' && d.values) || d.type === 'table') {
        if (d.type === 'pie') {
          pieCounter++;
        } else if (d.type === 'table') {
          tableCounter++;
        }
        subplotFolds[i] = (
          <TraceFold
            key={i}
            traceIndexes={[i]}
            canDelete={false}
            name={
              d.type === 'pie'
                ? `${_('Pie')} ${pieCounter > 1 ? pieCounter : ''}`
                : `${_('Table')} ${tableCounter > 1 ? tableCounter : ''}`
            }
          >
            {children}
          </TraceFold>
        );
      }
    });
    return <TraceRequiredPanel>{subplotFolds}</TraceRequiredPanel>;
  }
}

SubplotAccordion.contextType = EditorControlsContext;

SubplotAccordion.propTypes = {
  children: PropTypes.node,
};

export default SubplotAccordion;

import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectTraceToPlot,
  connectCartesianSubplotToLayout,
  connectNonCartesianSubplotToLayout,
} from 'lib';
import {TRACE_TO_AXIS, AXIS_TO_ATTR} from 'lib/constants';

const TraceFold = connectTraceToPlot(PlotlyFold);
const NonCartesianSubplotFold = connectNonCartesianSubplotToLayout(PlotlyFold);
const CartesianSubplotFold = connectCartesianSubplotToLayout(PlotlyFold);

class SubplotAccordion extends Component {
  render() {
    const {data = [], layout = {}} = this.context;
    const {children, messageIfEmptyFold} = this.props;
    const subplotFolds = [];

    const allCartesianAxisCombinations = data.reduce((acc, curVal, inx) => {
      if (TRACE_TO_AXIS.cartesian.some(c => c === curVal.type)) {
        const xaxis = 'xaxis' + (curVal.xaxis ? curVal.xaxis.substring(1) : '');
        const yaxis = 'yaxis' + (curVal.yaxis ? curVal.yaxis.substring(1) : '');

        const existingComboIndex = acc.findIndex(
          t => t.xaxis === xaxis && t.yaxis === yaxis
        );
        if (existingComboIndex === -1) {
          acc.push({
            xaxis: xaxis,
            yaxis: yaxis,
            xaxisName: curVal.xaxis || 'x1',
            yaxisName: curVal.yaxis || 'y1',
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
            messageIfEmpty={messageIfEmptyFold}
            xaxis={d.xaxis}
            yaxis={d.yaxis}
            name={`${d.xaxisName} ${d.yaxisName}`}
          >
            {children}
          </CartesianSubplotFold>
        ))
    );

    Object.keys(layout).forEach(layoutKey => {
      const traceIndexes = [];
      if (
        ['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(traceType => {
          const trIndex =
            (traceType === 'gl3d' ? 'scene' : traceType) === layoutKey
              ? data.findIndex(trace =>
                  TRACE_TO_AXIS[traceType].some(tt => tt === trace.type)
                )
              : data.findIndex(
                  trace => trace[AXIS_TO_ATTR[traceType]] === layoutKey
                );
          if (trIndex !== -1) {
            traceIndexes.push(trIndex);
          }
          return layoutKey.startsWith(
            traceType === 'gl3d' ? 'scene' : traceType
          );
        })
      ) {
        subplotFolds[traceIndexes[0]] = (
          <NonCartesianSubplotFold
            key={layoutKey}
            traceIndexes={traceIndexes}
            canDelete={false}
            messageIfEmpty={messageIfEmptyFold}
            subplot={layoutKey}
            name={layoutKey}
          >
            {children}
          </NonCartesianSubplotFold>
        );
      }
    });

    data.forEach((d, i) => {
      if ((d.type === 'pie' && d.values) || d.type === 'table') {
        subplotFolds[i] = (
          <TraceFold
            key={i}
            traceIndexes={[i]}
            canDelete={false}
            messageIfEmpty={messageIfEmptyFold}
            name={`${d.type} ${i}`}
          >
            {children}
          </TraceFold>
        );
      }
    });

    return <TraceRequiredPanel>{subplotFolds}</TraceRequiredPanel>;
  }
}

SubplotAccordion.contextTypes = {
  fullData: PropTypes.array,
  data: PropTypes.array,
  layout: PropTypes.object,
  localize: PropTypes.func,
};

SubplotAccordion.propTypes = {
  children: PropTypes.node,
  messageIfEmptyFold: PropTypes.string,
};

export default SubplotAccordion;

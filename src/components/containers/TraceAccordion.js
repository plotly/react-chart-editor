import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, plotlyTraceToCustomTrace} from 'lib';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

const TraceFold = connectTraceToPlot(PlotlyFold);

class TraceAccordion extends Component {
  renderGroupedTraceFolds(groupedTraces) {
    if (this.props.useFullData) {
      const dataArrayPositionsByTraceType = {};
      const fullDataArrayPositionsByTraceType = {};

      Object.keys(groupedTraces).forEach(traceType => {
        const dataIndexes = [];
        const fullDataIndexes = [];

        this.context.fullData.forEach((trace, fullDataIndex) => {
          if (trace.type === traceType && trace._expandedIndex) {
            fullDataIndexes.push(trace._expandedIndex);
          }
          if (trace.type === traceType && !trace._expandedIndex) {
            fullDataIndexes.push(fullDataIndex);
          }
          if (trace.type === traceType) {
            dataIndexes.push(trace.index);
          }
        });

        dataArrayPositionsByTraceType[traceType] = dataIndexes;
        fullDataArrayPositionsByTraceType[traceType] = fullDataIndexes;
      });

      return Object.keys(groupedTraces).map((traceType, index) => {
        return (
          <TraceFold
            key={index}
            traceIndexes={dataArrayPositionsByTraceType[traceType]}
            name={traceType}
            fullDataArrayPosition={fullDataArrayPositionsByTraceType[traceType]}
          >
            {this.props.children}
          </TraceFold>
        );
      });
    }

    return Object.keys(groupedTraces).map((traceType, index) => {
      return (
        <TraceFold
          key={index}
          traceIndexes={groupedTraces[traceType]}
          name={traceType}
        >
          {this.props.children}
        </TraceFold>
      );
    });
  }

  renderIndividualTraceFolds(filteredTraces, filteredTracesFullDataPositions) {
    if (this.props.useFullData) {
      return filteredTraces.map((d, i) => {
        return (
          <TraceFold
            key={i}
            traceIndexes={[d.index]}
            canDelete={this.props.canAdd}
            messageIfEmpty={this.props.messageIfEmptyFold}
            fullDataArrayPosition={[filteredTracesFullDataPositions[i]]}
          >
            {this.props.children}
          </TraceFold>
        );
      });
    }

    return filteredTraces.map((d, i) => {
      return (
        <TraceFold
          key={i}
          traceIndexes={[i]}
          canDelete={this.props.canAdd}
          messageIfEmpty={this.props.messageIfEmptyFold}
        >
          {this.props.children}
        </TraceFold>
      );
    });
  }

  renderCanAddPanel(filteredTraces, filteredTracesFullDataPositions) {
    const _ = this.context.localize;

    const addAction = {
      label: _('Trace'),
      handler: ({onUpdate}) => {
        if (onUpdate) {
          onUpdate({
            type: EDITOR_ACTIONS.ADD_TRACE,
          });
        }
      },
    };

    return (
      <PlotlyPanel addAction={addAction}>
        {filteredTraces.length
          ? this.renderIndividualTraceFolds(
              filteredTraces,
              filteredTracesFullDataPositions
            )
          : null}
      </PlotlyPanel>
    );
  }

  render() {
    const {data = [], localize: _, fullData = []} = this.context;
    const {canAdd, canGroup, excludeFits, useFullData} = this.props;
    const base = useFullData ? fullData : data;

    // we don't want to include analysis transforms when we're in the create panel
    const filteredTracesFullDataPositions = [];
    const filteredTraces = base.filter((t, i) => {
      if (excludeFits) {
        return !(t.transforms && t.transforms.every(tr => tr.type === 'fit'));
      }
      filteredTracesFullDataPositions.push(i);
      return true;
    });

    const groupedTraces = filteredTraces.reduce(
      (allTraces, nextTrace, index) => {
        const traceType = plotlyTraceToCustomTrace(nextTrace);
        const adjustedIndex = useFullData ? nextTrace.index : index;
        if (!allTraces[traceType]) {
          allTraces[traceType] = [];
        }
        allTraces[traceType].push(adjustedIndex);
        return allTraces;
      },
      {}
    );

    if (canAdd) {
      return this.renderCanAddPanel(
        filteredTraces,
        filteredTracesFullDataPositions
      );
    }

    if (
      canGroup &&
      filteredTraces.length > 1 &&
      Object.keys(groupedTraces).length > 0
    ) {
      return (
        <TraceRequiredPanel noPadding>
          <Tabs>
            <TabList>
              <Tab>{_('Individually')}</Tab>
              <Tab>{_('By Type')}</Tab>
            </TabList>
            <TabPanel>
              <PlotlyPanel>
                {filteredTraces.length
                  ? this.renderIndividualTraceFolds(
                      filteredTraces,
                      filteredTracesFullDataPositions
                    )
                  : null}
              </PlotlyPanel>
            </TabPanel>
            <TabPanel>
              <PlotlyPanel>
                {Object.keys(groupedTraces).length
                  ? this.renderGroupedTraceFolds(groupedTraces)
                  : null}
              </PlotlyPanel>
            </TabPanel>
          </Tabs>
        </TraceRequiredPanel>
      );
    }

    return (
      <TraceRequiredPanel>
        {filteredTraces.length
          ? this.renderIndividualTraceFolds(
              filteredTraces,
              filteredTracesFullDataPositions
            )
          : null}
      </TraceRequiredPanel>
    );
  }
}

TraceAccordion.contextTypes = {
  fullData: PropTypes.array,
  data: PropTypes.array,
  localize: PropTypes.func,
};

TraceAccordion.propTypes = {
  canAdd: PropTypes.bool,
  canGroup: PropTypes.bool,
  children: PropTypes.node,
  excludeFits: PropTypes.bool,
  messageIfEmptyFold: PropTypes.string,
  useFullData: PropTypes.bool,
};

export default TraceAccordion;

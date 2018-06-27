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
  render() {
    const {data = [], localize: _} = this.context;
    const {canAdd, canGroup, children, messageIfEmptyFold, excludeFits} = this.props;

    // we don't want to include analysis transforms when we're in the create panel
    const filteredData = data.filter(t => {
      if (excludeFits) {
        return !(
          t.transforms &&
          t.transforms.every(tr => tr.type === 'fit')
        );
      }
      return true;
    });

    const individualTraces =
      filteredData.length &&
      filteredData.map((d, i) => {
        return (
          <TraceFold
            key={i}
            traceIndexes={[i]}
            canDelete={canAdd}
            messageIfEmpty={messageIfEmptyFold}
          >
            {children}
          </TraceFold>
        );
      });

    if (canAdd) {
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
          {individualTraces ? individualTraces : null}
        </PlotlyPanel>
      );
    }
    const tracesByGroup = filteredData.reduce((allTraces, nextTrace, index) => {
      const traceType = plotlyTraceToCustomTrace(nextTrace);
      if (!allTraces[traceType]) {
        allTraces[traceType] = [];
      }
      allTraces[traceType].push(index);
      return allTraces;
    }, {});

    const groupedTraces = Object.keys(tracesByGroup).map((traceType, index) => {
      return (
        <TraceFold
          key={index}
          traceIndexes={tracesByGroup[traceType]}
          name={traceType}
        >
          {this.props.children}
        </TraceFold>
      );
    });

    if (canGroup && filteredData.length > 1 && groupedTraces.length > 0) {
      return (
        <TraceRequiredPanel noPadding>
          <Tabs>
            <TabList>
              <Tab>{_('All Traces')}</Tab>
              <Tab>{_('Individual')}</Tab>
            </TabList>
            <TabPanel>
              <PlotlyPanel>{groupedTraces ? groupedTraces : null}</PlotlyPanel>
            </TabPanel>
            <TabPanel>
              <PlotlyPanel>
                {individualTraces ? individualTraces : null}
              </PlotlyPanel>
            </TabPanel>
          </Tabs>
        </TraceRequiredPanel>
      );
    }
    return (
      <TraceRequiredPanel>
        {individualTraces ? individualTraces : null}
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
};

export default TraceAccordion;

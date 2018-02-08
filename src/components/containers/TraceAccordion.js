import Fold from './Fold';
import TraceRequiredPanel from './TraceRequiredPanel';
import Panel from './Panel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, localize, plotlyTraceToCustomTrace} from 'lib';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  render() {
    const {data = [], fullData = []} = this.context;
    const {
      canAdd,
      canGroup,
      children,
      messageIfEmptyFold,
      localize: _,
    } = this.props;

    const individualTraces =
      data.length &&
      data.map((d, i) => {
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
        <Panel addAction={addAction}>
          {individualTraces ? individualTraces : null}
        </Panel>
      );
    }
    if (canGroup && data.length > 1) {
      const tracesByGroup = data.reduce((allTraces, next, index) => {
        const traceType = plotlyTraceToCustomTrace(
          fullData.filter(trace => trace.index === index)[0]
        );
        if (!allTraces[traceType]) {
          allTraces[traceType] = [];
        }
        allTraces[traceType].push(index);
        return allTraces;
      }, {});

      const groupedTraces = Object.keys(tracesByGroup).map(
        (traceType, index) => {
          return (
            <TraceFold
              key={index}
              traceIndexes={tracesByGroup[traceType]}
              name={traceType}
            >
              {this.props.children}
            </TraceFold>
          );
        }
      );
      return (
        <TraceRequiredPanel noPadding>
          <Tabs>
            <TabList>
              <Tab>{_('All Traces')}</Tab>
              <Tab>{_('Individual')}</Tab>
            </TabList>
            <TabPanel>
              <Panel>{groupedTraces ? groupedTraces : null}</Panel>
            </TabPanel>
            <TabPanel>
              <Panel>{individualTraces ? individualTraces : null}</Panel>
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
};

TraceAccordion.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  canGroup: PropTypes.bool,
  messageIfEmptyFold: PropTypes.string,
};

export default localize(TraceAccordion);

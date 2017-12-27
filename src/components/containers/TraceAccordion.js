import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from '../../lib/constants';
import {connectTraceToPlot, plotlyToCustom} from '../../lib';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

const TraceFold = connectTraceToPlot(Fold);

export default class TraceAccordion extends Component {
  constructor(props) {
    super(props);
    this.addTrace = this.addTrace.bind(this);
  }

  addTrace() {
    if (this.context.onUpdate) {
      this.context.onUpdate({
        type: EDITOR_ACTIONS.ADD_TRACE,
      });
    }
  }

  render() {
    const data = this.context.data || [];
    const fullData = this.context.fullData || [];
    const {canGroup, canAdd} = this.props;
    const individualPanel = data.map((d, i) => (
      <TraceFold key={i} traceIndex={i}>
        {this.props.children}
      </TraceFold>
    ));
    let content = individualPanel;

    if (canGroup && data.length > 1) {
      const groupedTraces = data.reduce((allTraces, next, index) => {
        const traceType = plotlyToCustom(
          fullData.filter(trace => trace.index === index)[0]
        );
        if (allTraces[traceType]) {
          allTraces[traceType].push(index);
        } else {
          allTraces[traceType] = [index];
        }
        return allTraces;
      }, {});

      const groupedPanel = Object.keys(groupedTraces).map(
        (traceType, index) => {
          return (
            <TraceFold
              key={index}
              traceIndex={groupedTraces[traceType]}
              name={traceType}
            >
              {this.props.children}
            </TraceFold>
          );
        }
      );

      content = (
        <Tabs>
          <TabList>
            <Tab>Grouped</Tab>
            <Tab>Individual</Tab>
          </TabList>
          <TabPanel key={0}>{groupedPanel}</TabPanel>
          <TabPanel key={1}>{individualPanel}</TabPanel>
        </Tabs>
      );
    }

    return (
      <div>
        {canAdd ? (
          <button className="panel__add-button" onClick={this.addTrace}>
            + Trace
          </button>
        ) : null}
        {content}
      </div>
    );
  }
}

TraceAccordion.contextTypes = {
  fullData: PropTypes.array,
  data: PropTypes.array,
  onUpdate: PropTypes.func,
};

TraceAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  canGroup: PropTypes.bool,
};

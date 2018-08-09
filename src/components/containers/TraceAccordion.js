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
  constructor(props, context) {
    super(props, context);
    this.setLocals(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    // we don't want to include analysis transforms when we're in the create panel
    const base = props.canGroup ? context.fullData : context.data;

    this.filteredTracesFullDataPositions = [];
    this.filteredTraces = base.filter((t, i) => {
      if (props.excludeFits) {
        return !(t.transforms && t.transforms.every(tr => tr.type === 'fit'));
      }
      this.filteredTracesFullDataPositions.push(i);
      return true;
    });
  }

  renderGroupedTraceFolds() {
    if (!this.filteredTraces.length || this.filteredTraces.length < 2) {
      return null;
    }

    const dataArrayPositionsByTraceType = {};
    const fullDataArrayPositionsByTraceType = {};

    this.filteredTraces.forEach((trace, index) => {
      const traceType = plotlyTraceToCustomTrace(trace);
      if (!dataArrayPositionsByTraceType[traceType]) {
        dataArrayPositionsByTraceType[traceType] = [];
      }

      if (!fullDataArrayPositionsByTraceType[traceType]) {
        fullDataArrayPositionsByTraceType[traceType] = [];
      }

      dataArrayPositionsByTraceType[traceType].push(trace.index);
      fullDataArrayPositionsByTraceType[traceType].push(
        this.filteredTracesFullDataPositions[index]
      );
    });

    return Object.keys(fullDataArrayPositionsByTraceType).map((type, index) => {
      return (
        <TraceFold
          key={index}
          traceIndexes={dataArrayPositionsByTraceType[type]}
          name={type}
          fullDataArrayPosition={fullDataArrayPositionsByTraceType[type]}
        >
          {this.props.children}
        </TraceFold>
      );
    });
  }

  renderUngroupedTraceFolds() {
    if (!this.filteredTraces.length) {
      return null;
    }

    return this.filteredTraces.map((d, i) => {
      return (
        <TraceFold
          key={i}
          traceIndexes={[d.index]}
          canDelete={this.props.canAdd}
          messageIfEmpty={this.props.messageIfEmptyFold}
          fullDataArrayPosition={[this.filteredTracesFullDataPositions[i]]}
        >
          {this.props.children}
        </TraceFold>
      );
    });
  }

  renderTraceFolds() {
    if (!this.filteredTraces.length) {
      return null;
    }

    return this.filteredTraces.map((d, i) => {
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

  render() {
    const {canAdd, canGroup} = this.props;
    const _ = this.context.localize;

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
          {this.renderTraceFolds()}
        </PlotlyPanel>
      );
    }

    if (canGroup) {
      if (this.filteredTraces.length === 1) {
        return (
          <TraceRequiredPanel>
            {this.renderUngroupedTraceFolds()}
          </TraceRequiredPanel>
        );
      }

      if (this.filteredTraces.length > 1) {
        return (
          <TraceRequiredPanel noPadding>
            <Tabs>
              <TabList>
                <Tab>{_('Individually')}</Tab>
                <Tab>{_('By Type')}</Tab>
              </TabList>
              <TabPanel>
                <PlotlyPanel>{this.renderUngroupedTraceFolds()}</PlotlyPanel>
              </TabPanel>
              <TabPanel>
                <PlotlyPanel>{this.renderGroupedTraceFolds()}</PlotlyPanel>
              </TabPanel>
            </Tabs>
          </TraceRequiredPanel>
        );
      }
    }

    return <TraceRequiredPanel>{this.renderTraceFolds()}</TraceRequiredPanel>;
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem, findFullTraceIndex} from '../lib';
import {EDITOR_ACTIONS} from '../constants';

export default class Trace extends Component {
  constructor(props) {
    super(props);

    this.deleteTrace = this.deleteTrace.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
  }

  getChildContext() {
    const {traceIndex} = this.props;
    const {data, fullData, plotly} = this.context;

    const trace = data[traceIndex] || {};
    const fullTraceIndex = findFullTraceIndex(fullData, traceIndex);
    const fullTrace = fullData[fullTraceIndex] || {};
    return {
      getValObject: plotly.PlotSchema.getTraceValObject.bind(null, fullTrace),
      updateContainer: this.updateContainer,
      container: trace,
      fullContainer: fullTrace,
    };
  }

  updateContainer(update) {
    this.context.onUpdate &&
      this.context.onUpdate({
        type: EDITOR_ACTIONS.UPDATE_TRACES,
        payload: {
          update,
          traceIndexes: [this.props.traceIndex],
        },
      });
  }

  deleteTrace() {
    this.context.onUpdate &&
      this.context.onUpdate({
        type: EDITOR_ACTIONS.DELETE_TRACE,
        payload: {traceIndexes: [this.props.traceIndex]},
      });
  }

  render() {
    return (
      <div>
        <div className={bem('trace-panel', 'top', ['active'])}>
          Trace {this.props.traceIndex}
          <a
            className={bem('trace-panel', 'delete')}
            href="#"
            onClick={this.deleteTrace}
          >
            ×
          </a>
        </div>
        <div className={bem('trace-panel', 'panel')}>{this.props.children}</div>
      </div>
    );
  }
}

Trace.propTypes = {
  traceIndex: PropTypes.number.isRequired,
};

Trace.contextTypes = {
  fullData: PropTypes.array,
  data: PropTypes.array,
  plotly: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

Trace.childContextTypes = {
  getValObject: PropTypes.func,
  updateContainer: PropTypes.func,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
};

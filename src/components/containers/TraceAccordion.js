import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from '../../lib/constants';
import {connectTraceToPlot} from '../../lib';

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
    return (
      <div>
        {this.props.canAdd ? (
          <button className="panel__add-button" onClick={this.addTrace}>
            + Trace
          </button>
        ) : null}
        {data.map((d, i) => (
          <TraceFold key={i} traceIndex={i}>
            {this.props.children}
          </TraceFold>
        ))}
      </div>
    );
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func,
};

TraceAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

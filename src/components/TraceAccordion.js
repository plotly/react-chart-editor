import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Trace from './Trace';
import {EDITOR_ACTIONS} from '../constants';

export default class TraceAccordion extends Component {
  constructor(props, context) {
    super(props);

    this.addTrace = this.addTrace.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
  }

  renderPanel(d, i) {
    return (
      <Trace key={i} traceIndex={i}>
        {this.props.children}
      </Trace>
    );
  }

  addTrace() {
    this.context.onUpdate &&
      this.context.onUpdate({
        type: EDITOR_ACTIONS.ADD_TRACE,
      });
  }

  render() {
    const data = this.context.data || [];
    return (
      <div className="tracePanel">
        {this.props.canAdd && (
          <a href="#" onClick={this.addTrace}>
            Add
          </a>
        )}
        {data.map(this.renderPanel)}
      </div>
    );
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func,
};

TraceAccordion.propTypes = {
  canAdd: PropTypes.bool,
};

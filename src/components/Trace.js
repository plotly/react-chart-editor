import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem, findFullTraceIndex} from '../lib';

export default class Trace extends Component {
  constructor(props) {
    super(props);
    this.deleteTrace = this.deleteTrace.bind(this);
  }

  getChildContext() {
    return {
      traceIndex: this.props.traceIndex,
      fullTraceIndex: findFullTraceIndex(
        this.context.fullData,
        this.props.traceIndex
      ),
    };
  }

  deleteTrace() {
    this.props.onUpdate &&
      this.props.onUpdate(null, [this.props.traceIndex], 'deleteTraces');
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
  onUpdate: PropTypes.func,
};

Trace.contextTypes = {
  fullData: PropTypes.array,
};

Trace.childContextTypes = {
  fullTraceIndex: PropTypes.number,
  traceIndex: PropTypes.number,
};

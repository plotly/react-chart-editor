import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";

class TracePanel extends Component {
  getChildContext() {
    return {
      traceIndex: this.props.index,
    };
  }

  render() {
    //let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    //{children.map(c => cloneElement(c, {index: this.props.index}))}
    return (
      <div>
        <div className="tracePanel-top tracePanel-top--active">
          Trace {this.props.index}
        </div>
        <div className="tracePanel-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
}

TracePanel.childContextTypes = {
  traceIndex: PropTypes.number,
};

class TraceAccordion extends Component {
  constructor(props, context) {
    super(props);
    this.data = context.data;
    this.renderPanel = this.renderPanel.bind(this);
  }

  renderPanel(d, i) {
    return (
      <TracePanel key={i} index={i}>
        {this.props.children}
      </TracePanel>
    );
  }

  render() {
    return (
      <div className="tracePanel">
        {this.data.map(this.renderPanel)}
      </div>
    );
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
};

export default TraceAccordion;

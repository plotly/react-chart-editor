import React, {
  Component,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import PropTypes from "prop-types";
import { bem } from "../common";

class TracePanel extends Component {
  getChildContext() {
    return {
      traceIndex: this.props.index,
    };
  }

  render() {
    return (
      <div>
        <div className={bem("trace-panel", "top", ["active"])}>
          Trace {this.props.index}
        </div>
        <div className={bem("trace-panel", "panel")}>{this.props.children}</div>
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
        {this.props.render()}
      </TracePanel>
    );
  }

  render() {
    return <div className="tracePanel">{this.data.map(this.renderPanel)}</div>;
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
};

export default TraceAccordion;

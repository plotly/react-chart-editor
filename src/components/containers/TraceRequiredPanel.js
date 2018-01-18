import React, {Component} from 'react';
import PanelEmpty from './PanelEmpty';
import {LayoutPanel} from '../../index';
import PropTypes from 'prop-types';

class TraceRequiredPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTraces: false,
    };
  }
  checkTraceExistence() {
    const {visible} = this.props;
    const {layout} = this.context;
    const {hasTraces} = this.state;

    if (visible) {
      /**
       * Check if there is any trace data
       */
      if (
        Object.keys(layout.xaxis).length === 0 ||
        Object.keys(layout.yaxis).length === 0
      ) {
        if (hasTraces) {
          this.setState({
            hasTraces: false,
          });
        }
      } else {
        if (!hasTraces) {
          this.setState({
            hasTraces: true,
          });
        }
      }
    }
  }

  componentDidUpdate() {
    this.checkTraceExistence();
  }
  componentDidMount() {
    this.checkTraceExistence();
  }

  render() {
    const {children, ...rest} = this.props;
    const {hasTraces} = this.state;

    if (this.props.visible) {
      return hasTraces ? (
        <LayoutPanel {...rest}>{children}</LayoutPanel>
      ) : (
        <PanelEmpty />
      );
    }
    return null;
  }
}

TraceRequiredPanel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

TraceRequiredPanel.defaultProps = {
  visible: true,
};

TraceRequiredPanel.contextTypes = {
  layout: PropTypes.object,
};

export default TraceRequiredPanel;

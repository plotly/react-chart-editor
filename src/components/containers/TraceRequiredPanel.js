import PanelEmpty from './PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {LayoutPanel} from './derived';
import {localize} from 'lib';

class TraceRequiredPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTraces: false,
    };
  }
  checkTraceExistence() {
    const {visible} = this.props;
    const {fullData} = this.context;
    const {hasTraces} = this.state;
    if (visible) {
      if (fullData.filter(trace => trace.visible).length === 0 && hasTraces) {
        this.setState({
          hasTraces: false,
        });
      }
      if (fullData.filter(trace => trace.visible).length > 0 && !hasTraces) {
        this.setState({
          hasTraces: true,
        });
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
    const {localize: _, children, ...rest} = this.props;
    const {hasTraces} = this.state;

    if (this.props.visible) {
      return hasTraces ? (
        <LayoutPanel {...rest}>{children}</LayoutPanel>
      ) : (
        <PanelEmpty
          heading={_("Looks like there aren't any traces defined yet.")}
          message={_("Go to the 'Create' tab to define traces.")}
        />
      );
    }
    return null;
  }
}

TraceRequiredPanel.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
  visible: PropTypes.bool,
};

TraceRequiredPanel.defaultProps = {
  visible: true,
};

TraceRequiredPanel.contextTypes = {
  fullData: PropTypes.array,
};

export default localize(TraceRequiredPanel);

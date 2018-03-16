import PanelEmpty from './PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {LayoutPanel} from './derived';
import {localize} from 'lib';

class TraceRequiredPanel extends Component {
  hasTrace() {
    return this.context.fullData.filter(trace => trace.visible).length > 0;
  }

  render() {
    const {localize: _, children, ...rest} = this.props;
    let showPanel = true;
    const emptyPanelMessage = {heading: '', message: ''};

    const noTraceMessage = {
      heading: _("Looks like there aren't any traces defined yet."),
      message: _("Go to the 'Create' tab to define traces."),
    };

    const conditions = [() => this.hasTrace()].concat(
      this.props.extraConditions ? this.props.extraConditions : []
    );

    const messages = [noTraceMessage].concat(
      this.props.extraEmptyPanelMessages
        ? this.props.extraEmptyPanelMessages
        : []
    );

    if (this.props.visible) {
      conditions.forEach((condition, index) => {
        if (!showPanel) {
          return;
        }
        if (!condition()) {
          showPanel = false;
          emptyPanelMessage.heading = messages[index].heading;
          emptyPanelMessage.message = messages[index].message;
        }
      });

      if (showPanel) {
        return <LayoutPanel {...rest}>{children}</LayoutPanel>;
      }

      return (
        <PanelEmpty
          heading={emptyPanelMessage.heading}
          message={emptyPanelMessage.message}
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
  extraConditions: PropTypes.array,
  extraEmptyPanelMessages: PropTypes.array,
};

TraceRequiredPanel.defaultProps = {
  visible: true,
};

TraceRequiredPanel.contextTypes = {
  fullData: PropTypes.array,
};

export default localize(TraceRequiredPanel);

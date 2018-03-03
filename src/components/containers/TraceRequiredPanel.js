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
    const emptyPanelMessage = {
      heading: _("Looks like there aren't any traces defined yet."),
      message: _("Go to the 'Create' tab to define traces."),
    };

    let showPanel = false;

    if (this.props.visible) {
      if (this.hasTrace()) {
        showPanel = true;
      }

      if (this.props.extraConditions) {
        this.props.extraConditions.forEach((condition, index) => {
          if (!condition()) {
            showPanel = false;
            emptyPanelMessage.heading = this.props.extraEmptyPanelMessages[
              index
            ].heading;
            emptyPanelMessage.message = this.props.extraEmptyPanelMessages[
              index
            ].message;
          }
        });
      }

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

import PanelEmpty from './PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {LayoutPanel} from './derived';

class TraceRequiredPanel extends Component {
  hasTrace() {
    return this.context.fullData.filter(trace => trace.visible).length > 0;
  }

  render() {
    const {localize: _} = this.context;
    const {children, heading, beforeMessage, afterMessage, ...rest} = this.props;

    if (!this.props.visible) {
      return null;
    }

    return this.hasTrace() ? (
      <LayoutPanel {...rest}>{children}</LayoutPanel>
    ) : (
      <PanelEmpty heading={heading || _("Looks like there aren't any traces defined yet.")}>
        {beforeMessage && <p>{beforeMessage}</p>}
        <p>
          {_('Go to the ')}
          <a onClick={() => this.context.setPanel('Structure', 'Traces')}>{_('Traces')}</a>
          {_(' panel under Structure to define traces.')}
        </p>
        {afterMessage && <p>{afterMessage}</p>}
      </PanelEmpty>
    );
  }
}

TraceRequiredPanel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  heading: PropTypes.string,
  beforeMessage: PropTypes.string,
  afterMessage: PropTypes.string,
};

TraceRequiredPanel.defaultProps = {
  visible: true,
};

TraceRequiredPanel.contextTypes = {
  fullData: PropTypes.array,
  localize: PropTypes.func,
  setPanel: PropTypes.func,
};

export default TraceRequiredPanel;

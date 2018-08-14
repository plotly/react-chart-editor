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
    const {children, ...rest} = this.props;
<<<<<<< HEAD
=======
    let showPanel = true;
    let heading = '';
>>>>>>> e9befe5... add GraphCreatePanel link to empty panel

    if (!this.props.visible) {
      return null;
    }

<<<<<<< HEAD
    return this.hasTrace() ? (
      <LayoutPanel {...rest}>{children}</LayoutPanel>
    ) : (
      <PanelEmpty
        heading={_("Looks like there aren't any traces defined yet.")}
      >
=======
    if (!this.hasTrace()) {
      showPanel = false;
      heading = _("Looks like there aren't any traces defined yet.");
    }

    return showPanel ? (
      <LayoutPanel {...rest}>{children}</LayoutPanel>
    ) : (
      <PanelEmpty heading={heading}>
>>>>>>> e9befe5... add GraphCreatePanel link to empty panel
        <p>
          {_('Go to the ')}
          <a onClick={() => this.context.setPanel('Graph', 'Create')}>
            {_('Create')}
          </a>
<<<<<<< HEAD
          {_(' panel to define traces.')}
=======
          {_(' tab to define traces.')}
>>>>>>> e9befe5... add GraphCreatePanel link to empty panel
        </p>
      </PanelEmpty>
    );
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
  fullData: PropTypes.array,
  localize: PropTypes.func,
  setPanel: PropTypes.func,
};

export default TraceRequiredPanel;

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ChartLineIcon} from 'plotly-icons';
import {bem, localize} from 'lib';

class PanelEmpty extends Component {
  render() {
    const {
      children,
      localize: _,
      heading = _("Looks like there aren't any traces defined yet."),
      message = _("Go to the 'Create' tab to define traces."),
      icon: Icon,
    } = this.props;

    return (
      <div className={bem('panel', 'empty')}>
        <div className="panel__empty__message">
          <div className="panel__empty__message__icon">
            {Icon ? <Icon /> : <ChartLineIcon />}
          </div>
          <div className="panel__empty__message__heading">{heading}</div>
          <div className="panel__empty__message__content">
            <p>{message}</p>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

PanelEmpty.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.any,
  localize: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default localize(PanelEmpty);

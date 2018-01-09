import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ChartLineIcon} from 'plotly-icons';
import {bem} from 'lib';

export default class PanelEmpty extends Component {
  render() {
    const {children, message, heading, icon: Icon} = this.props;

    return (
      <div className={bem('panel', 'empty')}>
        <div className="panel__empty__message">
          <div className="panel__empty__message__icon">
            {Icon ? <Icon /> : <ChartLineIcon />}
          </div>
          <div className="panel__empty__message__heading">{heading}</div>
          <div className="panel__empty__message__content">
            {message}
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
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

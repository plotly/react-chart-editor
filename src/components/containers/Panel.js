import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from 'lib';
import ChartLineIcon from 'mdi-react/ChartLineIcon';
class Panel extends Component {
  render() {
    const {visible, children} = this.props;

    if (visible) {
      return <div className={bem('panel')}>{children}</div>;
    }
    return null;
  }
}

export class PanelHeader extends Component {
  render() {
    const {children, action} = this.props;

    return (
      <div className={bem('panel', 'header')}>
        <div className={bem('panel', 'header__content')}>{children}</div>
        {action && (
          <div className={bem('panel', 'header__actions')}>{action}</div>
        )}
      </div>
    );
  }
}

export class PanelEmpty extends Component {
  render() {
    const {children, message, heading, icon} = this.props;

    return (
      <div className={bem('panel', 'empty')}>
        <div className="panel__empty__message">
          <div className="panel__empty__message__icon">
            {icon ? icon : <ChartLineIcon />}
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

Panel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

PanelHeader.propTypes = {
  children: PropTypes.node,
  action: PropTypes.any,
};

PanelEmpty.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.any,
  children: PropTypes.node,
  icon: PropTypes.node,
};

Panel.defaultProps = {
  visible: true,
};

export default Panel;

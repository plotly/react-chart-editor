import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from 'lib';

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

Panel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

PanelHeader.propTypes = {
  children: PropTypes.node,
  action: PropTypes.any,
};

Panel.defaultProps = {
  visible: true,
};

export default Panel;

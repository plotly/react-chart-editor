import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class FoldEmpty extends Component {
  render() {
    const {children, icon: Icon, messagePrimary, messageSecondary} = this.props;

    return (
      <div className="fold__content__empty">
        <div className="fold__content__empty__icon">
          {Icon ? <Icon /> : null}
        </div>
        <div className="fold__content__empty__message__primary">
          {messagePrimary ? messagePrimary : null}
        </div>
        <div className="fold__content__empty__message__secondary">
          {messageSecondary ? messageSecondary : null}
        </div>
        {children ? children : null}
      </div>
    );
  }
}

FoldEmpty.propTypes = {
  messagePrimary: PropTypes.string,
  messageSecondary: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

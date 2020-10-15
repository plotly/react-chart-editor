import PropTypes from 'prop-types';
import {Component} from 'react';

export default class FoldEmpty extends Component {
  render() {
    const {children, icon: Icon, messagePrimary, messageSecondary} = this.props;

    return (
      <div className="fold__content__empty">
        {Icon ? (
          <div className="fold__content__empty__icon">
            <Icon />
          </div>
        ) : null}
        {messagePrimary ? (
          <div className="fold__content__empty__message__primary">{messagePrimary}</div>
        ) : null}
        {messageSecondary ? (
          <div className="fold__content__empty__message__secondary">{messageSecondary}</div>
        ) : null}
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

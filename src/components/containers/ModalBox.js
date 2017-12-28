import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ModalBox extends Component {
  render() {
    const {backgroundDark, children, onClose} = this.props;
    const modalboxClass = classnames('modalbox', {
      'modalbox--dark': backgroundDark,
    });
    return (
      <div className={modalboxClass}>
        <div className="modalbox__cover" onClick={onClose} />
        <div>{children}</div>
      </div>
    );
  }
}

ModalBox.propTypes = {
  backgroundDark: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

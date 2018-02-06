import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CloseIcon} from 'plotly-icons';

class Modal extends Component {
  render() {
    const {children} = this.props;

    return (
      <div className="modal">
        <div className="modal__card">{children}</div>
      </div>
    );
  }
}

const ModalHeader = ({onClose, title}) => (
  <div className="modal__header">
    <div className="modal__header__title">{title}</div>
    <div className="modal__header__close">
      <CloseIcon />
    </div>
  </div>
);

const ModalContent = ({children}) => (
  <div className="modal__content">{children}</div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;

export {ModalHeader, ModalContent};

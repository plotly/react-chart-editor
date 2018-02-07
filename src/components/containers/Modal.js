import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CloseIcon} from 'plotly-icons';

const ModalHeader = ({title, handleClose}) => (
  <div className="modal__header">
    {title ? <div className="modal__header__title">{title}</div> : null}
    {handleClose ? (
      <div
        className="modal__header__close"
        onClick={handleClose ? () => handleClose() : null}
      >
        <CloseIcon />
      </div>
    ) : null}
  </div>
);

class Modal extends Component {
  componentDidUpdate() {
    const body = document.body;
    const {showing} = this.props;

    // Toggle scroll on document body if modal is open
    const hasClass = body.classList.contains('no-scroll');

    if (showing && !hasClass) {
      body.classList.add('no-scroll');
    }
    if (!showing && hasClass) {
      body.classList.remove('no-scroll');
    }
  }

  render() {
    const {children, handleClose, title, showing} = this.props;
    if (!showing) {
      return null;
    }
    return (
      <div className="modal">
        <div className="modal__card">
          <ModalHeader title={title} handleClose={handleClose} />
          {children}
        </div>
        <div className="modal__backdrop" onClick={() => handleClose()} />
      </div>
    );
  }
}

const ModalContent = ({children}) => (
  <div className="modal__content">{children}</div>
);

ModalHeader.propTypes = {
  title: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  showing: PropTypes.bool.isRequired,
  title: PropTypes.node,
};

export default Modal;

export {ModalHeader, ModalContent};

import {Component} from 'react';
import PropTypes from 'prop-types';
import {CloseIcon} from 'plotly-icons';

const ModalHeader = ({title, handleClose}) => (
  <div className="modal__header">
    {title ? <div className="modal__header__title">{title}</div> : null}
    {handleClose ? (
      <div className="modal__header__close" onClick={handleClose ? () => handleClose() : null}>
        <CloseIcon />
      </div>
    ) : null}
  </div>
);

const ModalContent = ({children}) => <div className="modal__content">{children}</div>;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    const escKeyCode = 27;
    if (event.keyCode === escKeyCode) {
      this.context.handleClose();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const {children, title} = this.props;
    let classes = 'modal';
    if (this.context.isAnimatingOut) {
      classes += ' modal--animate-out';
    }
    return (
      <div className={classes}>
        <div className="modal__card">
          <ModalHeader title={title} handleClose={() => this.context.handleClose()} />
          <ModalContent>{children}</ModalContent>
        </div>
        <div className="modal__backdrop" onClick={() => this.context.handleClose()} />
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
};

Modal.contextTypes = {
  handleClose: PropTypes.func,
  isAnimatingOut: PropTypes.bool,
};

export default Modal;

export {ModalHeader, ModalContent};

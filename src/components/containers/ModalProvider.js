import * as React from 'react';
import PropTypes from 'prop-types';

class ModalProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      componentProps: {},
      open: false,
      isAnimatingOut: false,
    };
  }

  componentDidUpdate() {
    const body = document.body;
    const {open} = this.state;

    // Toggle scroll on document body if modal is open
    const hasClass = body.classList.contains('no-scroll');

    if (open && !hasClass) {
      body.classList.add('no-scroll');
    }
    if (!open && hasClass) {
      body.classList.remove('no-scroll');
    }
  }

  openModal(component, componentProps) {
    const {localize: _} = this.context;
    if (!component) {
      throw Error(_('You need to provide a component for the modal to open!'));
    }
    const {open} = this.state;

    if (!open) {
      this.setState({
        component: component,
        componentProps: componentProps,
        open: true,
      });
    }
  }

  closeModal() {
    const {open} = this.state;
    if (open) {
      this.setState({
        open: false,
        component: null,
      });
    }
  }
  handleClose() {
    this.setState({isAnimatingOut: true});
    const animationDuration = 600;
    setTimeout(() => {
      this.setState({isAnimatingOut: false});
      this.closeModal();
    }, animationDuration);
  }

  getChildContext() {
    return {
      openModal: (c, p) => this.openModal(c, p),
      closeModal: () => this.closeModal(),
      handleClose: () => this.handleClose(),
      isAnimatingOut: this.state.isAnimatingOut,
    };
  }

  render() {
    const {component: Component, componentProps, isAnimatingOut} = this.state;
    return (
      <>
        {this.props.children}
        {this.state.open ? <Component isAnimatingOut={isAnimatingOut} {...componentProps} /> : null}
      </>
    );
  }
}

ModalProvider.propTypes = {
  children: PropTypes.node,
};
ModalProvider.contextTypes = {
  localize: PropTypes.func,
};
ModalProvider.childContextTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  handleClose: PropTypes.func,
  isAnimatingOut: PropTypes.bool,
};

export default ModalProvider;

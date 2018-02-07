import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

class ModalProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      open: false,
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

  openModal(component) {
    if (!component) {
      throw Error('You need to provide a component for the modal to open!');
    }

    const {open} = this.state;

    if (!open) {
      this.setState({
        component: component,
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

  getChildContext() {
    return {
      openModal: c => this.openModal(c),
      closeModal: () => this.closeModal(),
    };
  }

  render() {
    const {component: Component} = this.state;
    return (
      <Fragment>
        {this.props.children}
        {this.state.open ? Component : null}
      </Fragment>
    );
  }
}

ModalProvider.propTypes = {
  children: PropTypes.node,
};
ModalProvider.childContextTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ModalProvider;

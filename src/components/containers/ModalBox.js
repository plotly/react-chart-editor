import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ModalBox extends Component {
  render() {
    const modalboxClass = classnames('modalbox', {
      'modalbox--dark': this.props.backgroundDark,
    });
    return (
      <div className={modalboxClass}>
        <div className="modalbox__cover" onClick={this.props.onClose} />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

ModalBox.propTypes = {
  backgroundDark: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

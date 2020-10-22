import {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ModalBox extends Component {
  render() {
    const {backgroundDark, children, onClose, relative} = this.props;
    const modalboxClass = classnames('modalbox', {
      'modalbox--dark': backgroundDark,
      'modalbox--relative': relative,
    });
    return (
      <div className={modalboxClass}>
        <div className="modalbox__cover" onClick={onClose} />
        <div className="modalbox__content">{children}</div>
      </div>
    );
  }
}

ModalBox.propTypes = {
  backgroundDark: PropTypes.bool,
  relative: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

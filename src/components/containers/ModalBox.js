import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalBox extends Component {
  render() {
    let style;
    if (this.props.backgroundColor) {
      style = {backgroundColor: this.props.backgroundColor};
    }

    return (
      <div className="modalbox" style={style}>
        <div className="modalbox__cover" onClick={this.props.onClose} />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

ModalBox.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../../lib';

class Panel extends Component {
  render() {
    if (this.props.visible) {
      return <div className={bem('panel')}>{this.props.children}</div>;
    }
    return <div />;
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

Panel.defaultProps = {
  visible: true,
};

export default Panel;

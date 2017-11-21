import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from '../../lib';

export default class Fold extends Component {
  renderHeader() {
    const {deleteContainer} = this.context;
    const {canDelete} = this.props;
    const doDelete = canDelete && typeof deleteContainer === 'function';
    return (
      <div className={bem('fold', 'top', ['active'])}>
        {this.props.name}
        {doDelete ? (
          <a
            className={bem('fold', 'delete')}
            href="#"
            onClick={deleteContainer}
          >
            ×
          </a>
        ) : null}
      </div>
    );
  }

  render() {
    const modifiers = this.props.hideHeader ? ['noheader'] : null;
    return (
      <div>
        {this.props.hideHeader ? null : this.renderHeader()}
        <div className={bem('fold', modifiers)}>{this.props.children}</div>
      </div>
    );
  }
}

Fold.propTypes = {
  canDelete: PropTypes.bool,
  children: PropTypes.node,
  hideHeader: PropTypes.bool,
  name: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
};

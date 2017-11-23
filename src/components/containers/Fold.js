import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from '../../lib';

export default class Fold extends Component {
  renderHeader() {
    const {deleteContainer} = this.context;
    const doDelete = typeof deleteContainer === 'function';
    return (
      <div className="fold__top fold__top--active">
        {this.props.name}
        {doDelete ? (
          <i className="fold__delete icon-cancel" onClick={deleteContainer} />
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
  children: PropTypes.node,
  hideHeader: PropTypes.bool,
  name: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
};

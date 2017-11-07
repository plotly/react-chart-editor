import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../lib';

export default class Fold extends Component {
  render() {
    const {deleteContainer} = this.context;
    const {canDelete, name} = this.props;
    const doDelete = canDelete && typeof deleteContainer === 'function';
    return (
      <div>
        <div className={bem('accordion-panel', 'top', ['active'])}>
          {this.props.name}
          {doDelete ? (
            <a
              className={bem('accordion-panel', 'delete')}
              href="#"
              onClick={deleteContainer}
            >
              ×
            </a>
          ) : null}
        </div>
        <div className={bem('accordion-panel', 'panel')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Fold.propTypes = {
  canDelete: PropTypes.bool,
  name: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
};

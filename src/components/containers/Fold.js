import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';

export default class Fold extends Component {
  constructor() {
    super();
    this.state = {folded: false};
    this.toggleFold = this.toggleFold.bind(this);
  }

  toggleFold() {
    this.setState({folded: !this.state.folded});
  }

  render() {
    const {deleteContainer} = this.context;
    const doDelete = typeof deleteContainer === 'function';
    const headerClass = classnames('fold__top', {
      'fold__top--active': !this.state.folded,
    });
    const arrowClass = classnames('icon-angle-down', 'fold__top__arrow', {
      'fold__top__arrow--active': !this.state.folded,
    });
    const contentClass = classnames('fold__content', {
      'fold__content--noheader': this.props.hideHeader,
    });

    return (
      <div className="fold">
        {!this.props.hideHeader ? (
          <div className={headerClass} onClick={this.toggleFold}>
            <div className="fold__top__arrow-title">
              <i className={arrowClass} />
              <div className="fold__top__title">{this.props.name}</div>
            </div>
            {doDelete ? (
              <i
                className="fold__delete icon-cancel"
                onClick={deleteContainer}
              />
            ) : null}
          </div>
        ) : null}
        {!this.state.folded ? (
          <div className={contentClass}>{this.props.children}</div>
        ) : null}
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

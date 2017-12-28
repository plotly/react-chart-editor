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
    const {hideHeader, name, children} = this.props;
    const {folded} = this.state;
    const doDelete = typeof deleteContainer === 'function';

    const contentClass = classnames('fold__content', {
      'fold__content--noheader': hideHeader,
    });

    const headerClass = classnames('fold__top', {
      'fold__top--active': !folded,
    });

    const arrowClass = classnames('icon-angle-down', 'fold__top__arrow', {
      'fold__top__arrow--active': !folded,
    });

    const arrowIcon = <i className={arrowClass} />;

    const deleteButton = handleClick =>
      doDelete && (
        <i
          className="icon-cancel fold__top__delete js-fold__delete"
          onClick={handleClick}
        />
      );

    const foldHeader = !hideHeader && (
      <div className={headerClass} onClick={this.toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    const foldContent = !folded && (
      <div className={contentClass}>{children}</div>
    );

    return (
      <div className="fold">
        {foldHeader}
        {foldContent}
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

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import CloseIcon from 'mdi-react/CloseIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

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
    const arrowClass = classnames('fold__top__arrow', {
      'fold__top__arrow--active': !folded,
    });
    const deleteButton = handleClick =>
      doDelete && (
        <div
          className="fold__top__delete js-fold__delete"
          onClick={handleClick}
        >
          <CloseIcon />
        </div>
      );

    const ArrowIcon = (
      <div className={arrowClass}>
        <ChevronDownIcon />
      </div>
    );

    const FoldHeader = !hideHeader && (
      <div className={headerClass} onClick={this.toggleFold}>
        <div className="fold__top__arrow-title">
          {ArrowIcon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    const FoldContent = !folded && (
      <div className={contentClass}>{children}</div>
    );

    return (
      <div className="fold">
        {FoldHeader}
        {FoldContent}
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

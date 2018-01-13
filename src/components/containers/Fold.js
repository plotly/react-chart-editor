import FoldEmpty from './FoldEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {CloseIcon, AngleDownIcon} from 'plotly-icons';
import {localize} from 'lib';

class Fold extends Component {
  render() {
    const {deleteContainer, individualFoldStates, toggleFold} = this.context;
    const {
      canDelete,
      children,
      className,
      foldIndex,
      hideHeader,
      icon: Icon,
      isEmpty,
      name,
    } = this.props;

    const folded = individualFoldStates[foldIndex];

    const doDelete = typeof deleteContainer === 'function' && canDelete;

    const contentClass = classnames('fold__content', {
      'fold__content--noheader': hideHeader,
    });

    const headerClass = classnames('fold__top', {
      'fold__top--open': !folded,
    });

    const arrowClass = classnames('fold__top__arrow', {
      'fold__top__arrow--open': !folded,
    });

    const arrowIcon = (
      <div className={arrowClass}>
        <div className="fold__top__arrow__wrapper">
          <AngleDownIcon />
        </div>
      </div>
    );

    const deleteButton = handleClick =>
      doDelete ? (
        <div
          className="fold__top__delete js-fold__delete"
          onClick={handleClick}
        >
          <CloseIcon />
        </div>
      ) : null;

    const icon = Icon ? <Icon className="fold__top__icon" /> : null;

    const foldHeader = !hideHeader && (
      <div className={headerClass} onClick={() => toggleFold(foldIndex)}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          {icon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    let foldContent = null;
    if (!folded && !isEmpty) {
      foldContent = <div className={contentClass}>{children}</div>;
    }

    if (!folded && isEmpty) {
      foldContent = (
        <div className={contentClass}>
          <FoldEmpty
            icon={Icon}
            messagePrimary={isEmpty.messagePrimary}
            messageSecondary={isEmpty.messageSecondary}
          />
        </div>
      );
    }

    const classes = className ? ' ' + className : '';

    return (
      <div className={`fold${classes}`}>
        {foldHeader}
        {foldContent}
      </div>
    );
  }
}

Fold.displayName = 'Fold';

Fold.propTypes = {
  canDelete: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  foldIndex: PropTypes.number.isRequired,
  hideHeader: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isEmpty: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  localize: PropTypes.func,
  name: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
  individualFoldStates: PropTypes.array.isRequired,
  toggleFold: PropTypes.func.isRequired,
};

export default localize(Fold);

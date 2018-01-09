import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {CloseIcon, AngleDownIcon} from 'plotly-icons';

export default class Fold extends Component {
  constructor(props, context) {
    super(props, context);
    const {individualFoldStates} = context;
    if (!individualFoldStates) {
      this.state = {
        folded: false,
      };
    }
    this.toggleFold = this.toggleFold.bind(this);
  }

  toggleFold() {
    if (this.context.toggleFold) {
      this.context.toggleFold(this.props.foldIndex);
    } else {
      this.setState({
        folded: !this.state.folded,
      });
    }
  }

  render() {
    const {deleteContainer, individualFoldStates} = this.context;
    const {
      hideHeader,
      name,
      children,
      className,
      foldIndex,
      canDelete,
      icon: Icon,
    } = this.props;

    const folded = individualFoldStates
      ? individualFoldStates[foldIndex]
      : this.state.folded;

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
      <div className={headerClass} onClick={this.toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          {icon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    const foldContent = !folded ? (
      <div className={contentClass}>{children}</div>
    ) : null;

    const classes = className ? ' ' + className : '';

    return (
      <div className={`fold${classes}`}>
        {foldHeader}
        {foldContent}
      </div>
    );
  }
}

Fold.propTypes = {
  canDelete: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  foldIndex: PropTypes.number,
  hideHeader: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  name: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
  individualFoldStates: PropTypes.array,
  toggleFold: PropTypes.func,
};

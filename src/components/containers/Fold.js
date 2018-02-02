import FoldEmpty from './FoldEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {CloseIcon, AngleDownIcon} from 'plotly-icons';
import {unpackPlotProps, localize, containerConnectedContextTypes} from 'lib';

class Fold extends Component {
  constructor(props, context) {
    super(props, context);

    this.foldVisible = false;
    this.determineVisibility(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.determineVisibility(nextProps, nextContext);
  }

  determineVisibility(nextProps, nextContext) {
    this.foldVisible = false;

    React.Children.forEach(nextProps.children, child => {
      if (child.props.attr) {
        let plotProps;
        if (child.type.supplyPlotProps) {
          plotProps = child.type.supplyPlotProps(child.props, nextContext);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, nextContext, plotProps);
          }
        } else {
          plotProps = unpackPlotProps(child.props, nextContext);
        }

        if (plotProps.isVisible) {
          this.foldVisible = true;
          return;
        }
      }
    });
  }

  render() {
    if (!this.foldVisible && !this.props.messageIfEmpty) {
      return null;
    }
    const {deleteContainer} = this.context;
    const {
      canDelete,
      children,
      className,
      folded,
      toggleFold,
      hideHeader,
      icon: Icon,
      messageIfEmpty,
      name,
    } = this.props;

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
      <div className={headerClass} onClick={toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          {icon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    let foldContent = null;
    if (!folded) {
      if (this.foldVisible) {
        foldContent = <div className={contentClass}>{children}</div>;
      } else {
        foldContent = (
          <div className={contentClass}>
            <FoldEmpty icon={Icon} messagePrimary={messageIfEmpty} />
          </div>
        );
      }
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

Fold.plotly_editor_traits = {foldable: true};

Fold.propTypes = {
  canDelete: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  folded: PropTypes.bool.isRequired,
  toggleFold: PropTypes.func.isRequired,
  hideHeader: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  messageIfEmpty: PropTypes.string,
  localize: PropTypes.func,
  name: PropTypes.string,
};

Fold.contextTypes = Object.assign(
  {
    deleteContainer: PropTypes.func,
  },
  containerConnectedContextTypes
);

export default localize(Fold);

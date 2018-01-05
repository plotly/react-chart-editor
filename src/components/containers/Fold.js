import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {
  CloseIcon,
  AngleDownIcon,
  PlotScatterIcon,
  PlotLineIcon,
  PlotPieIcon,
  PlotAreaIcon,
  PlotBarIcon,
} from 'plotly-icons';

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
    const {hideHeader, name, type, children, className} = this.props;
    const {folded} = this.state;
    const doDelete = typeof deleteContainer === 'function';

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
      doDelete && (
        <div
          className="fold__top__delete js-fold__delete"
          onClick={handleClick}
        >
          <CloseIcon />
        </div>
      );

    const renderTypeIcon = type => {
      switch (type) {
        case 'scatter':
          return <PlotScatterIcon />;
        case 'line':
          return <PlotLineIcon />;
        case 'bar':
          return <PlotBarIcon />;
        case 'pie':
          return <PlotPieIcon />;
        case 'area':
          return <PlotAreaIcon />;
        default:
          return <PlotScatterIcon />;
      }
    };

    const plotTypeIcon = type && (
      <div className="fold__top__plot-icon">{renderTypeIcon(type)}</div>
    );

    const foldHeader = !hideHeader && (
      <div className={headerClass} onClick={this.toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          {plotTypeIcon}
          <div className="fold__top__title">{name}</div>
        </div>
        {deleteButton(deleteContainer)}
      </div>
    );

    const foldContent = !folded && (
      <div className={contentClass}>{children}</div>
    );

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
  children: PropTypes.node,
  hideHeader: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
};

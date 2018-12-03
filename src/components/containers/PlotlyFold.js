import FoldEmpty from './FoldEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {CloseIcon, AngleDownIcon} from 'plotly-icons';
import {unpackPlotProps, containerConnectedContextTypes, striptags} from 'lib';
import {recursiveMap} from '../../lib/recursiveMap';

export class Fold extends Component {
  constructor() {
    super();
    this.foldVisible = true;
  }

  provideValue() {
    return {
      foldInfo: this.props.foldInfo ? this.props.foldInfo : null,
    };
  }

  render() {
    if (!this.foldVisible && !this.props.messageIfEmpty) {
      return null;
    }
    // const {deleteContainer} = this.context;
    const {
      canDelete,
      children,
      className,
      folded,
      foldInfo,
      toggleFold,
      hideHeader,
      icon: Icon,
      messageIfEmpty,
      name,
      context: {deleteContainer},
    } = this.props;

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

    const icon = Icon ? <Icon className="fold__top__icon" /> : null;

    const deleteButton =
      canDelete && typeof deleteContainer === 'function' ? (
        <div
          className="fold__top__delete js-fold__delete"
          onClick={e => {
            e.stopPropagation();
            deleteContainer(foldInfo);
          }}
        >
          <CloseIcon />
        </div>
      ) : null;

    const foldHeader = !hideHeader && (
      <div className={headerClass} onClick={toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowIcon}
          {icon}
          <div className="fold__top__title">{striptags(name)}</div>
        </div>
        {deleteButton}
      </div>
    );

    let foldContent = null;
    if (!folded) {
      if (this.foldVisible) {
        foldContent = (
          <div className={contentClass}>
            {recursiveMap(children, {...this.props.context, ...this.provideValue()})}
          </div>
        );
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
  folded: PropTypes.bool,
  foldInfo: PropTypes.object,
  toggleFold: PropTypes.func,
  hideHeader: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  messageIfEmpty: PropTypes.string,
  name: PropTypes.string,
  context: PropTypes.any,
};

Fold.requireContext = {
  deleteContainer: PropTypes.func,
  ...containerConnectedContextTypes,
};

// Fold.childContextTypes = {
//   foldInfo: PropTypes.object,
// };

class PlotlyFold extends Fold {
  constructor(props) {
    super(props);

    this.foldVisible = false;
    this.determineVisibility(props);
  }

  componentWillReceiveProps(nextProps) {
    this.determineVisibility(nextProps);
  }

  determineVisibility(nextProps) {
    const {context} = nextProps;
    this.foldVisible = false;

    React.Children.forEach(nextProps.children, child => {
      if (!child || this.foldVisible) {
        return;
      }

      if (child.props.attr) {
        // attr components force fold open if they are visible
        const plotProps = unpackPlotProps(child.props, context);
        if (child.type.modifyPlotProps) {
          child.type.modifyPlotProps(child.props, context, plotProps);
        }

        this.foldVisible = this.foldVisible || plotProps.isVisible;
        return;
      }

      if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
        // non-attr components force visibility (unless they don't via traits)
        this.foldVisible = true;
        return;
      }
    });
  }
}

PlotlyFold.plotly_editor_traits = {
  foldable: true,
};

PlotlyFold.propTypes = {
  context: PropTypes.any,
};

PlotlyFold.requireContext = Object.assign(
  {
    deleteContainer: PropTypes.func,
  },
  containerConnectedContextTypes
);

export default PlotlyFold;

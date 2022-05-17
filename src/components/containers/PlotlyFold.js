import FoldEmpty from './FoldEmpty';
import PropTypes from 'prop-types';
import {Children, Component} from 'react';
import classnames from 'classnames';
import {CloseIcon, AngleDownIcon} from 'plotly-icons';
import {unpackPlotProps, containerConnectedContextTypes, striptags} from 'lib';

export class Fold extends Component {
  constructor() {
    super();
    this.foldVisible = true;
  }

  getChildContext() {
    return {
      foldInfo: this.props.foldInfo ? this.props.foldInfo : null,
    };
  }

  render() {
    if (!this.foldVisible && !this.props.messageIfEmpty) {
      return null;
    }
    const {deleteContainer, moveContainer} = this.context;
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
      canMoveUp,
      canMoveDown,
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

    const arrowDownIcon = (
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
          onClick={(e) => {
            e.stopPropagation();
            deleteContainer(foldInfo);
          }}
        >
          <CloseIcon />
        </div>
      ) : null;

    const movingControls = (canMoveDown || canMoveUp) && (
      <div className="fold__top__moving-controls">
        <span
          className={`fold__top__moving-controls--up${canMoveUp ? '' : '--disabled'}`}
          onClick={(e) => {
            // prevents fold toggle to happen when clicking on moving arrow controls
            e.stopPropagation();

            if (canMoveUp) {
              if (!moveContainer || typeof moveContainer !== 'function') {
                throw new Error('moveContainer must be a function');
              }
              moveContainer('up');
            }
          }}
        >
          <AngleDownIcon />
        </span>
        <span
          className={`fold__top__moving-controls--down${canMoveDown ? '' : '--disabled'}`}
          onClick={(e) => {
            // prevents fold toggle to happen when clicking on moving arrow controls
            e.stopPropagation();
            if (canMoveDown) {
              if (!moveContainer || typeof moveContainer !== 'function') {
                throw new Error('moveContainer must be a function');
              }
              moveContainer('down');
            }
          }}
        >
          <AngleDownIcon />
        </span>
      </div>
    );

    const foldHeader = !hideHeader && (
      <div className={headerClass} onClick={toggleFold}>
        <div className="fold__top__arrow-title">
          {arrowDownIcon}
          {icon}
          <div className="fold__top__title">{striptags(name)}</div>
        </div>
        {movingControls}
        {deleteButton}
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
  folded: PropTypes.bool,
  foldInfo: PropTypes.object,
  toggleFold: PropTypes.func,
  hideHeader: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  messageIfEmpty: PropTypes.string,
  name: PropTypes.string,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
};

Fold.contextTypes = {
  deleteContainer: PropTypes.func,
};

Fold.childContextTypes = {
  foldInfo: PropTypes.object,
};

class PlotlyFold extends Fold {
  constructor(props, context) {
    super(props, context);

    this.foldVisible = false;
    this.determineVisibility(props, context);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.determineVisibility(nextProps, nextContext);
  }

  determineVisibility(nextProps, nextContext) {
    this.foldVisible = false;

    Children.forEach(nextProps.children, (child) => {
      if (!child || this.foldVisible) {
        return;
      }

      if (child.props.attr) {
        // attr components force fold open if they are visible
        const plotProps = unpackPlotProps(child.props, nextContext);
        if (child.type.modifyPlotProps) {
          child.type.modifyPlotProps(child.props, nextContext, plotProps);
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

PlotlyFold.contextTypes = Object.assign(
  {
    deleteContainer: PropTypes.func,
    moveContainer: PropTypes.func,
  },
  containerConnectedContextTypes
);

export default PlotlyFold;

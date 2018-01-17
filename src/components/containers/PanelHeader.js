import Button from 'components/widgets/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {PlusIcon, ResizeUpIcon, ResizeDownIcon} from 'plotly-icons';
import {localize} from 'lib';

class PanelHeader extends Component {
  getActionButton() {
    const {action, localize: _, onAction} = this.props;
    const icon = <PlusIcon />;
    let className, label;

    if (action === 'addTrace') {
      label = _('Trace');
      className = 'js-add-trace-button';
    }

    if (action === 'addAnnotation') {
      label = _('Annotation');
      className = 'js-add-annotation-button';
    }

    return (
      <Button
        variant="primary"
        className={className}
        onClick={onAction}
        icon={icon}
        label={label}
      />
    );
  }

  render() {
    const {
      children,
      action,
      allowCollapse,
      toggleFolds,
      hasOpen,
      localize: _
    } = this.props;

    return !children && !action && !allowCollapse ? null : (
      <div className="panel__header">
        {children && children.length ? (
          <div className="panel__header__content">{children}</div>
        ) : null}
        <div className="panel__header__actions__container">
          {allowCollapse ? (
            <div className="panel__header__collapse" onClick={toggleFolds}>
              {hasOpen ? (
                <span>
                  <ResizeDownIcon />
                  {_('Collapse All')}
                </span>
              ) : (
                <span>
                  <ResizeUpIcon />
                  {_('Expand All')}
                </span>
              )}
            </div>
          ) : null}

          {action ? (
            <div className="panel__header__action">
              {this.getActionButton()}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

PanelHeader.propTypes = {
  action: PropTypes.string,
  allowCollapse: PropTypes.bool,
  children: PropTypes.node,
  hasOpen: PropTypes.bool,
  localize: PropTypes.func,
  onAction: PropTypes.func,
  toggleFolds: PropTypes.func,
};

export default localize(PanelHeader);

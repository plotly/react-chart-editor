import Button from 'components/widgets/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {PlusIcon, ResizeUpIcon, ResizeDownIcon} from 'plotly-icons';
import {localize} from 'lib';

class PanelHeader extends Component {
  render() {
    const {
      children,
      addAction,
      allowCollapse,
      toggleFolds,
      hasOpen,
      localize: _,
    } = this.props;

    const icon = <PlusIcon />;
    return !children && !addAction && !allowCollapse ? null : (
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

          {addAction ? (
            <div className="panel__header__action">
              <Button
                variant="primary"
                className="js-add-button"
                onClick={() => addAction.handler(this.context)}
                icon={icon}
                label={addAction.label}
              />{' '}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

PanelHeader.contextTypes = {
  layout: PropTypes.object,
  fullContainer: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

PanelHeader.propTypes = {
  addAction: PropTypes.object,
  allowCollapse: PropTypes.bool,
  children: PropTypes.node,
  hasOpen: PropTypes.bool,
  localize: PropTypes.func,
  toggleFolds: PropTypes.func,
};

export default localize(PanelHeader);

import Button from 'components/widgets/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {PlusIcon, ResizeUpIcon, ResizeDownIcon} from 'plotly-icons';
import {localize} from 'lib';
import ModalBox from './ModalBox';

class PanelHeader extends Component {
  constructor() {
    super();
    this.state = {addPanelOpen: false};

    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    this.setState({addPanelOpen: !this.state.addPanelOpen});
  }

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
                onClick={
                  Array.isArray(addAction.handler)
                    ? this.togglePanel
                    : () => addAction.handler(this.context)
                }
                icon={icon}
                label={addAction.label}
              />
              {this.state.addPanelOpen && (
                <ModalBox onClose={this.togglePanel} relative>
                  {addAction.handler.map(({label, handler}) => (
                    <p
                      key={label}
                      onClick={() => {
                        handler(this.context);
                        this.togglePanel();
                      }}
                    >
                      {label}
                    </p>
                  ))}
                </ModalBox>
              )}
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

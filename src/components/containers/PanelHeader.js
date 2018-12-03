import Button from 'components/widgets/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {PlusIcon, ResizeUpIcon, ResizeDownIcon} from 'plotly-icons';
import {EditorControlsContext} from '../../context';

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
    const {localize: _, layout, onUpdate} = this.context;
    const {children, addAction, allowCollapse, toggleFolds, hasOpen, context} = this.props;
    let contextHandleArgs = {};
    if (context && context.fullContainer && context.updateContainer) {
      contextHandleArgs = {
        fullContainer: context.fullContainer,
        updateContainer: context.updateContainer,
      };
    }

    const handleArgs = {
      layout,
      onUpdate,
      ...contextHandleArgs,
    };

    // dropdown is styled with same styles as react-select component - see _dropdown.scss
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
            <div className="panel__header__action dropdown-container">
              <Button
                variant="primary"
                className="js-add-button"
                onClick={
                  Array.isArray(addAction.handler)
                    ? this.togglePanel
                    : () => addAction.handler(handleArgs)
                }
                icon={icon}
                label={addAction.label}
              />
              {this.state.addPanelOpen && (
                <div className="Select">
                  <div className="Select-menu-outer">
                    <div className="Select-menu">
                      {addAction.handler.map(({label, handler}) => (
                        <div
                          className="Select-option"
                          key={label}
                          onClick={() => {
                            handler(handleArgs);
                            this.togglePanel();
                          }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

PanelHeader.contextType = EditorControlsContext;

PanelHeader.requireContext = {
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
};

PanelHeader.propTypes = {
  addAction: PropTypes.object,
  allowCollapse: PropTypes.bool,
  children: PropTypes.node,
  hasOpen: PropTypes.bool,
  toggleFolds: PropTypes.func,
  context: PropTypes.any,
};

export default PanelHeader;

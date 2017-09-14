import React, { PropTypes } from "react";

const ModeSwitchPanel = React.createClass({
  propTypes: {
    modesToButtonLabels: PropTypes.object.isRequired,
    modesToComponents: PropTypes.object.isRequired,
    modeTransitions: PropTypes.object.isRequired,
    defaultMode: PropTypes.string,
  },

  getInitialState() {
    const modes = Object.keys(this.props.modeTransitions);
    const initialMode = this.props.defaultMode || modes[0];

    return {
      // Initialize state with the default (initial) mode
      mode: initialMode,
    };
  },

  onClickChangeMode() {
    const { mode } = this.state;
    const newMode = this.props.modeTransitions[mode];

    this.setState({ mode: newMode });
  },

  render() {
    const { mode } = this.state;
    const { modesToButtonLabels, modesToComponents } = this.props;

    const ComponentByMode = modesToComponents[mode];
    const buttonLabel = modesToButtonLabels[mode];

    return (
      <div className="mode-switch-panel">
        <div className="mode-switch-panel__content">{ComponentByMode}</div>
        <div className="mode-switch-panel__toggle">
          <button
            className="btnbase btn--secondary"
            onClick={this.onClickChangeMode}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    );
  },
});

export default ModeSwitchPanel;

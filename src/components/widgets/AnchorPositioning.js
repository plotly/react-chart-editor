import React, { Component } from "react";
import PropTypes from "prop-types";
import hat from "hat";

/*
 * Anchor Positioning.
 * Positions: top left, top center, top right, middle left, middle center,
 * middle right, bottom left, bottom center, bottom right
 */

export default class AnchorPositioning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: hat(),
    };

    this.renderRadio = this.renderRadio.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newActiveOption = e.target.value;
    this.props.onOptionChange(newActiveOption);
  }

  renderRadio(value) {
    const label = value;
    const activeRadio = this.props.activeOption
      ? this.props.activeOption
      : "middle center";
    const defaultActive = activeRadio === value;

    return (
      <span className="anchor-item">
        <span key={label}>
          <label className="+inline-block radio-item">
            <input
              className="+inline-block radio-item__input"
              type="radio"
              checked={defaultActive}
              onChange={this.handleChange}
              ref={label}
              name={this.state.uid}
              value={value}
            />
            <div className="radio-item__content" />
          </label>
        </span>
      </span>
    );
  }

  render() {
    return (
      <div className="anchor">
        <div className="anchor-background">
          <div className="anchor-background-section">
            <div className="anchor-background-subsection" />
          </div>
          <div className="anchor-background-section +border-none">
            <div className="anchor-background-subsection" />
          </div>
        </div>
        <div className="anchor-text-background">
          {this.props.backgroundText}
        </div>
        <div className="anchor-container">
          <div className="anchor-line">
            {this.renderRadio("top left")}
            {this.renderRadio("top center")}
            {this.renderRadio("top right")}
          </div>
          <div className="anchor-line">
            {this.renderRadio("middle left")}
            {this.renderRadio("middle center")}
            {this.renderRadio("middle right")}
          </div>
          <div className="anchor-line">
            {this.renderRadio("bottom left")}
            {this.renderRadio("bottom center")}
            {this.renderRadio("bottom right")}
          </div>
        </div>
      </div>
    );
  }
}

AnchorPositioning.propTypes = {
  onOptionChange: PropTypes.func.isRequired,
  activeOption: PropTypes.string,
  backgroundText: PropTypes.string,
};

AnchorPositioning.defaultProps = {
  backgroundText: "Text...",
};

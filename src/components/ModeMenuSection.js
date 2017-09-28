import React, { Component } from "react";
import { bem } from "../common";

import ModeMenuItem from "./ModeMenuItem";

export default class ModeMenuSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.renderSubItem = this.renderSubItem.bind(this);
  }

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  onChangeSection(item) {
    this.props.onChangeSection(this.props.label + "-" + item);
  }

  renderSubItem(item, i) {
    const isActive =
      this.props.currentSection === this.props.label + "-" + item;

    return (
      <ModeMenuItem
        key={"subitem-" + i}
        active={isActive}
        onClick={() => this.onChangeSection(item)}
        label={item}
      />
    );
  }

  render() {
    return (
      <div
        className={bem("mode-menu-section", [
          this.state.expanded ? "is-expanded" : "",
        ])}
      >
        <div
          onClick={this.toggleExpanded}
          className={bem("mode-menu-section", "title")}
        >
          {this.props.label}
        </div>
        {this.state.expanded && this.props.sections.map(this.renderSubItem)}
      </div>
    );
  }
}

ModeMenuSection.defaultProps = {
  expanded: false,
};

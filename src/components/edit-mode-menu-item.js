import React, { Component } from "react";
import { klass } from "../common";

export default class EditModeMenuItem extends Component {
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
    this.props.onChangeSection(this.props.name + "-" + item);
  }

  renderSubItem(item, i) {
    const isActive = this.props.currentSection === this.props.name + "-" + item;

    return (
      <div
        key={"subitem-" + i}
        className={`editModeMenu-subItem ${isActive ? "is-active" : ""}`}
        onClick={() => this.onChangeSection(item)}
      >
        {item}
      </div>
    );
  }

  render() {
    return (
      <div
        className={`editModeMenu-item ${this.state.expanded
          ? "is-expanded"
          : ""}`}
      >
        <div className="editModeMenu-itemTitle" onClick={this.toggleExpanded}>
          {this.props.name}
        </div>
        {this.state.expanded && this.props.sections.map(this.renderSubItem)}
      </div>
    );
  }
}

EditModeMenuItem.defaultProps = {
  expanded: false,
};

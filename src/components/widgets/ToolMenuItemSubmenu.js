import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class ToolMenuItemSubmenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderInfoBox() {
    return (
      <div>
        {this.props.title ? (
          <div className="menu-item__submenu__title">{this.props.title}</div>
        ) : null}
        {this.props.mainText ? (
          <div className="menu-item__submenu__text">{this.props.mainText}</div>
        ) : null}
        {this.props.subText ? (
          <div className="menu-item__submenu__sub-text">
            {this.props.subText}
          </div>
        ) : null}
        <div>{this.props.children}</div>
      </div>
    );
  }

  render() {
    return (
      <span>
        <span onClick={this.toggleInfo}>
          <i className={this.props.iconClass} />
        </span>

        {this.state.isOpen ? (
          <div className="menu-item__submenu">
            <div
              className="menu-item__submenu__cover"
              onClick={this.toggleInfo}
            />
            <div>{this.renderInfoBox()}</div>
          </div>
        ) : null}
      </span>
    );
  }
}

ToolMenuItemSubmenu.propTypes = {
  title: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  iconClass: PropTypes.string.isRequired,
  children: PropTypes.node,
};

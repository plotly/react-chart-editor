import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ToolMenuItemSubmenu from "./ToolMenuItemSubmenu";

export default class ToolMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleInfo = this.toggleInfo.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }

  toggleInfo() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderErrorMessage() {
    const errorMessage = this.props.errorMessage;

    if (errorMessage) {
      return (
        <div className="menu-item__widget__layer menu-item__multiple">
          <span>{errorMessage}</span>
          <ToolMenuItemSubmenu
            title={"Multiple Values"}
            mainText={
              "This input has multiple values associated with it. Changing this setting will override these custom inputs."
            }
            subText={
              "Common Case: An 'All' tab might display this message because the X and Y tabs contain different settings."
            }
            iconClass={"icon-question menu-item__multiple__icon"}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    let childElement = this.props.children;

    const infoBox = classnames(["menu-item__multiple__info"], {
      "+visible": this.state.isOpen,
      "+hidden": !this.state.isOpen,
    });

    if (this.props.units) {
      childElement = (
        <span className="menu-item-unit__block">
          <span>{this.props.children}</span>
          <span className="menu-item-units">{this.props.units}</span>
        </span>
      );
    }

    return (
      <div className={this.props.className}>
        <div className="menu-item">
          <div className="menu-item__title">
            <div className="menu-item__title__text">{this.props.title}</div>
          </div>
          <div className="menu-item__widget">
            <div className="menu-item__widget__layer">{childElement}</div>
            {this.renderErrorMessage()}
          </div>
        </div>
      </div>
    );
  }
}

ToolMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  units: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
};

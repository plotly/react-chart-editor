import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class AccordionMenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this);
    this.renderMenuContent = this.renderMenuContent.bind(this);
  }

  handleRemoveMenu(event) {
    const { removeMenuHandler, id } = this.props;

    event.stopPropagation();

    if (typeof removeMenuHandler === "function") {
      removeMenuHandler(id);
    }
  }

  renderMenuContent() {
    const { isOpen, children, id, accordionMenuModifier } = this.props;

    const subMenuDisplay = classnames(
      "accordion-item__content",
      `js-accordion-menu-content-${id}`,
      accordionMenuModifier
    );

    if (!isOpen) {
      return (
        <div className={subMenuDisplay} style={{ display: "none" }}>
          {children}
        </div>
      );
    }

    return <div className={subMenuDisplay}>{children}</div>;
  }

  render() {
    const {
      isOpen,
      removeMenuHandler,
      titleColor,
      onToggle,
      iconClass,
      title,
      isRemovable,
    } = this.props;

    const subMenuOpen = classnames(
      ["accordion-item__top", "js-test-menu-item-click"],
      {
        "accordion-item__top--active": isOpen,
      }
    );

    const iconDirection = classnames("accordion-item__top__arrow", {
      "+rotate-90 ": !isOpen,
    });

    const topIcon = classnames("accordion-item__top__icon", {
      "accordion-item__top__icon_active": isOpen,
    });

    const titleClass = classnames(
      "js-test-title",
      "accordion-item__top__title",
      {
        "accordion-item__top__title_active": isOpen,
      }
    );

    const closeClass = classnames(
      "icon-close-thin",
      "accordion-item__top__close",
      "js-accordion-menu-item-close"
    );

    let closeIcon = null;
    if (isRemovable && typeof removeMenuHandler === "function") {
      closeIcon = <i className={closeClass} onClick={this.handleRemoveMenu} />;
    }

    const titleStyling = { color: titleColor || "" };

    return (
      <div className="accordion-item js-accordion-layer">
        <div className={subMenuOpen} onClick={onToggle}>
          <span className="+float-left">
            <div className={iconDirection}>
              <i className="icon-angle-down" />
            </div>

            {iconClass ? (
              <div className={topIcon}>
                <i className={iconClass} style={titleStyling} />
              </div>
            ) : null}

            <div className={titleClass}>{title}</div>
          </span>
          {closeIcon}
        </div>
        {this.renderMenuContent()}
      </div>
    );
  }
}

AccordionMenuItem.propTypes = {
  children: PropTypes.element.isRequired,
  iconClass: PropTypes.string,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  removeMenuHandler: PropTypes.func,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  accordionMenuModifier: PropTypes.string,
  isRemovable: PropTypes.bool,
};

module.exports = AccordionMenuItem;

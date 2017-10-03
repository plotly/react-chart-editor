import AccordionMenuItem from "./AccordionMenuItem";
import Dropdown from "./widgets/Dropdown";
import R from "ramda";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { dropdownOptionShape } from "@workspace/utils/customPropTypes";

export class SimpleAddMenu extends Component {
  render() {
    const { addNewMenuClass, disableAddMenu, addNewMenuHandler } = this.props;

    const className = classnames(
      "btnbase",
      "btn--primary",
      "js-test-add-new-layer",
      "+float-right",
      addNewMenuClass,
      { "--disabled": disableAddMenu }
    );
    const buttonText = this.props.addMenuText || "";

    return (
      <div className={className} onClick={addNewMenuHandler}>
        {"+ " + buttonText}
      </div>
    );
  }
}

/*
 * See the main AccordionMenu component PropTypes section for more information.
 */
SimpleAddMenu.propTypes = {
  addNewMenuClass: PropTypes.string,
  addNewMenuHandler: PropTypes.func,
  disableAddMenu: PropTypes.bool,
  addMenuText: PropTypes.string,
};

export class DropdownAddMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, options } = this.props.addNewMenuConfig;

    const simpleAddMenuPlaceholder = <SimpleAddMenu addMenuText={title} />;

    /*
         * Always display `+` (SimpleAddMenu) and show a
         * dropdown when you click on it.
         * We're always displaying the `+` by returning SimpleAddMenu in
         * the valueRenderer and the placeholder
         */
    return (
      <div className="+float-right js-dropdown-add-menu">
        <Dropdown
          className={`${this.props
            .addNewMenuClass} accordion-menu-dropdown-button`}
          style={{ width: null }}
          options={options}
          clearable={false}
          onChange={this.props.addNewMenuHandler}
          placeholder={simpleAddMenuPlaceholder}
          valueRenderer={() => simpleAddMenuPlaceholder}
        />
      </div>
    );
  }
}

/*
 * See the main AccordionMenu component PropTypes section for more information.
 */
DropdownAddMenu.propTypes = {
  addNewMenuConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(dropdownOptionShape).isRequired,
  }),
  addNewMenuClass: PropTypes.string,
  addNewMenuHandler: PropTypes.func,
};

function idOrIndex(id, index) {
  if (typeof id === "string") {
    return id;
  }

  return String(index);
}

/*
 * Each AccordionMenuItem is passed in as an object and its content
 * as an element
 * The expand and collapse buttons set the state of each submenu
 */
export default class AccordionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props);

    this.toggleAllHandler = this.toggleAll.bind(this);

    // Used to construct a collapse/expand handler for each sub-menu.
    const makeHandler = index => this.toggleSubMenu(index);
    this.toggleSubMenuHandlerConstructor = makeHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newSubmenuStates = this.initialState(newProps).subMenuStates;

    /*
         * Only update openess state when adding a new AccordionMenuItem
         * e.g for +Trace / +Filter / +Note
         */
    if (
      this.props.assignOpenState &&
      newProps.subMenus.length !== Object.keys(this.state.subMenuStates).length
    ) {
      this.setState({
        subMenuStates: newSubmenuStates,
      });
      return;
    }

    // Only update sub-menu states of those that are newly added.
    this.setState({
      subMenuStates: R.merge(newSubmenuStates, this.state.subMenuStates),
    });
  }

  initialState(props) {
    const subMenuStates = {};
    props.subMenus.forEach((subMenu, i) => {
      const id = idOrIndex(subMenu.id, i);
      subMenuStates[id] = subMenu.isOpen;
    });

    return { subMenuStates };
  }

  /**
     * Check if any sub-menu is open.
     * @return {Boolean} True if all sub-menus are closed.
     */
  anySubMenusOpen() {
    return R.any(R.identity, this.getMenuStates());
  }

  /**
     * Set all the sub-menus to a given state.
     * @param {Boolean} state the collapse state for all sub-menus
     */
  setMenuStates(state) {
    const subMenuStates = {};
    const setState = (menu, index) => {
      const id = idOrIndex(menu.id, index);
      subMenuStates[id] = state;
    };
    this.props.subMenus.forEach(setState);
    this.setState({ subMenuStates });
  }

  /**
     * Get all the sub-menu collapse states.
     * @return {Boolean[]} state: the collapse state for all sub-menus
     */
  getMenuStates() {
    const getState = id => this.state.subMenuStates[id];
    const menuStates = Object.keys(this.state.subMenuStates).map(getState);
    return menuStates;
  }

  /**
     * Given the state of all menus, expand or collapse all menus at once.
     */
  toggleAll() {
    /*
         * If any sub-menu is open, collapse all sub-menus
         * Else expand all sub-menus
         */

    if (this.anySubMenusOpen()) {
      this.setMenuStates(false);
    } else {
      this.setMenuStates(true);
    }
  }

  /**
     * Toggle an individual submenu
     * @param {Number} id: The sub-menu ref id.
     */
  toggleSubMenu(id) {
    this.setState({
      subMenuStates: R.merge(this.state.subMenuStates, {
        [id]: !this.state.subMenuStates[id],
      }),
    });
  }

  /**
     * Renders each sub-menu in the accordion menu.
     * @return {AccordionMenuItem[]} sub-menu DOM elements
     */
  renderSubmenuItems() {
    return this.props.subMenus.map((subMenuConfig, i) => {
      const { title, titleColor, iconClass, content } = subMenuConfig;

      const isRemovable = R.pathOr(
        R.has("removeMenuHandler", this.props),
        ["isRemovable"],
        subMenuConfig
      );

      const id = idOrIndex(subMenuConfig.id, i);

      return (
        <AccordionMenuItem
          title={title}
          titleColor={titleColor}
          iconClass={iconClass}
          key={id}
          id={id}
          isOpen={this.state.subMenuStates[id]}
          isRemovable={isRemovable}
          removeMenuHandler={this.props.removeMenuHandler}
          onToggle={() => this.toggleSubMenuHandlerConstructor(id)}
          accordionMenuModifier={this.props.accordionMenuModifier || null}
        >
          {content}
        </AccordionMenuItem>
      );
    });
  }

  render() {
    const { addNewMenuHandler, addNewMenuConfig, header } = this.props;

    /*
         * If the developer passes in a handler we are going to set up
         * an add new menu UI.
         */
    const doAddMenu = typeof addNewMenuHandler === "function";

    /*
         * if the developer doesn't pass in options we just call the handler
         * when the user clicks on a "+" button.
         */
    const doSimpleAddMenu = doAddMenu && !addNewMenuConfig;

    /*
         * if the developer passes in options we are going to set up a
         * standalone box with a dropdown and a "+" button.
         */
    const doDropdownAddMenu = doAddMenu && Boolean(addNewMenuConfig);

    /*
         * Only render the components when needed.
         */
    const simpleAddMenu = doSimpleAddMenu ? (
      <SimpleAddMenu
        addNewMenuClass={this.props.addNewMenuClass}
        addNewMenuHandler={this.props.addNewMenuHandler}
        disableAddMenu={this.props.disableAddMenu}
        addMenuText={this.props.addMenuText}
      />
    ) : null;

    const dropdownAddMenu = doDropdownAddMenu ? (
      <DropdownAddMenu
        addNewMenuClass={this.props.addNewMenuClass}
        addNewMenuHandler={this.props.addNewMenuHandler}
        addNewMenuConfig={this.props.addNewMenuConfig}
      />
    ) : null;

    let collapseButtonText;
    if (this.anySubMenusOpen()) {
      collapseButtonText = "Collapse All";
    } else {
      collapseButtonText = "Expand All";
    }

    const collapseButton =
      this.props.subMenus.length > 0 ? (
        <div
          className="accordion-menu-button +float-left js-test-collapse-text"
          onClick={this.toggleAllHandler}
        >
          {this.anySubMenusOpen() ? (
            <i className="icon-resize-down +soft-quarter-right" />
          ) : (
            <i className="icon-resize-expand +soft-quarter-right" />
          )}
          {collapseButtonText}
        </div>
      ) : null;

    const accordionClassName = classnames(
      "accordion-menu__button-area",
      "+clearfix"
    );

    return (
      <div className={this.props.parentClassName}>
        <div className={accordionClassName}>
          {collapseButton}
          {simpleAddMenu}
          {dropdownAddMenu}
        </div>
        {header}
        <div>
          {this.props.subMenus && this.props.subMenus.length > 0 ? (
            this.renderSubmenuItems()
          ) : (
            this.props.placeholder && this.props.placeholder()
          )}
        </div>
      </div>
    );
  }
}

AccordionMenu.defaultProps = {
  assignOpenState: false,
};

AccordionMenu.propTypes = {
  subMenus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      titleColor: PropTypes.string,
      isOpen: PropTypes.bool,
      iconClass: PropTypes.string,
      content: PropTypes.element,
      id: PropTypes.string,
      isRemovable: PropTypes.bool,
    })
  ),

  /*
     * If this handler is passed in as a prop the Accordion menu
     * will have a "+" button in the top right with a click handler
     * set to the this function.
     */
  addNewMenuHandler: PropTypes.func,

  // Make add layer button unclickable
  disableAddMenu: PropTypes.bool,

  /*
     * A class in which to style the "+" button (if it is shown)
     */
  addNewMenuClass: PropTypes.string,

  /*
     * Text to include in the "+" button (if it is shown)
     */
  addMenuText: PropTypes.string,

  /*
     * If this object is present the accordian menu will show a "create
     * new menu" box with a dropdown consisting of the options
     * given in the list instead of the simple "+" button. The
     * addNewMenuClass handler will be passed the value in the dropdown
     * once the user clicks the plus button.
     */
  addNewMenuConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(dropdownOptionShape).isRequired,
  }),

  /*
     * If this handler is passed in submenus will show an 'x'
     * which when called evokes this function with the id
     * of the submenu.
     */
  removeMenuHandler: PropTypes.func,

  /*
     * Optionally display a generic header item at the top of the AccordionMenu
    */

  header: PropTypes.element,

  parentClassName: PropTypes.string,

  /*
     * On first render get open state from parent Component
     */
  assignOpenState: PropTypes.bool,

  /*
     * Class to modify default look of accoridon menu
     */
  accordionMenuModifier: PropTypes.string,

  /*
     * Optional method to render a placeholder when no subMenus present
     */
  placeholder: PropTypes.func,
};

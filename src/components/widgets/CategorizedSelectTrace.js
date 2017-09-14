import {
  CHART_TYPE_ICON,
  CATEGORY_LAYOUT,
} from "@workspace/constants/workspace";
import { _ } from "@common/utils/i18n";
import { GET_ENCODING_SCHEMA } from "@workspace/constants/graphTable";
import { immutableTraceSelectOptionsShape } from "@workspace/utils/customPropTypes";
import { SELECT_PLOT_META } from "@workspace/constants/selectPlot";
import * as WorkspaceActions from "@workspace/actions/workspace";
import classnames from "classnames";
import R from "ramda";
import React, { Component } from "react";
import PropTypes from "prop-types";

export const ESC_KEYCODE = 27;

/*
 * Scrolling over the menu overlay must be 'faked' via hard-updating the
 * scroll-top property of EditModePanel.
 */
function smoothScroll(element, increment) {
  if (element.scrollAmount) {
    element.scrollAmount += increment;
  } else {
    element.scrollAmount = increment;
  }

  window.requestAnimationFrame(() => {
    const delta = Math.ceil(element.scrollAmount / 7);
    element.scrollTop += delta;
    element.scrollAmount -= delta;
    if (Math.abs(element.scrollAmount - 0) > Number.MIN_VALUE * 100) {
      smoothScroll(element, 0);
    } else {
      element.scrollAmount = 0;
    }
  });
}

/*
 * This component provides a table style dropdown with chart types
 * for each category of plots. It generates a map of lists as a skeleton
 * for the table of choices where the chart categories are sequenced as
 * described by CATEGORY_LAYOUT in workspace/constants/workspace.js
 */
class CategorizedSelectTrace extends Component {
  constructor(props) {
    super(props);

    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.closeWithEsc = this.closeWithEsc.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollOnOverlay = this.handleScrollOnOverlay.bind(this);
    this.renderIconContainer = this.renderIconContainer.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClose);
    window.addEventListener("keydown", this.closeWithEsc);

    // Handle scroll in capture mode not bubble mode.
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClose);
    window.removeEventListener("keydown", this.closeWithEsc);
    window.removeEventListener("scroll", this.handleScroll);

    if (this.scrollDelayHandle) {
      clearTimeout(this.scrollDelayHandle);
    }
  }

  getIconClassName(chartType, padding = true) {
    const iconClass = CHART_TYPE_ICON[chartType];

    return classnames({
      [iconClass]: Boolean(iconClass),
      "+soft-half-right": padding && Boolean(iconClass),
    });
  }

  getImgThumbnailSrc(chartType) {
    const IMG_DIR = "/static/webapp/images/plot-thumbs/";

    const imgSrc = IMG_DIR + SELECT_PLOT_META[chartType].imgThumb;

    return imgSrc;
  }

  categorizedTraceOptions() {
    /*
         * Generates a map of lists which represents the chart types seperated
         * into each chart category.
         */
    const categorize = (categorizedOptions, option) => {
      const category = GET_ENCODING_SCHEMA()[option.get("type")].meta.category;
      const categoryOptions = categorizedOptions[category] || [];

      categoryOptions.push(option.toJS());

      return R.assoc(category, categoryOptions, categorizedOptions);
    };

    return this.props.traceOptions.reduce(categorize, {});
  }

  selectedOption() {
    const { selectedTraceValue, traceOptions } = this.props;
    const selectedOptionPredicate = option => {
      return option.get("value") === selectedTraceValue;
    };

    return traceOptions.find(selectedOptionPredicate).toJS();
  }

  handleSelectOption(selectOptionCallback) {
    selectOptionCallback();
    this.props.onMenuToggle(false);
  }

  handleClose() {
    this.props.onMenuToggle(false);
  }

  handleToggle(event) {
    event.stopPropagation();
    this.props.onMenuToggle();
  }

  closeWithEsc(event) {
    if (event.keyCode === ESC_KEYCODE) {
      this.handleClose();
    }
  }

  // Must reposition chart select menu when the user scrolls.
  handleScroll() {
    if (this.scrollDelayHandle) {
      clearTimeout(this.scrollDelayHandle);
    }

    if (this.props.isOpen) {
      this.scrollDelayHandle = setTimeout(() => {
        this.scrollDelayHandle = null;
        this.handleRepositionOverlay();
      }, 10);
    }
  }

  /*
     * Since scrolling over the overlay does scoll the element, no scroll event
     * is fired and propgated. To allow the editModePanel to scroll,
     * mousewheel events are used to simulate smooth scrolling.
     */
  handleScrollOnOverlay(event) {
    const editModePanel = document.querySelector("#js-edit-mode-panel");
    smoothScroll(editModePanel, event.deltaY);
  }

  computeOverlayPosition() {
    const styles = {};
    if (this.refs.input) {
      const position = this.refs.input.getBoundingClientRect();
      styles.top = position.bottom;
      styles.left = position.left;
    }
    return styles;
  }

  handleRepositionOverlay() {
    const overlayStyles = this.computeOverlayPosition();
    const overlay = document.querySelector("#js-chart-select-overlay");

    /*
         * In order to quickly update the position of the overlay
         * the style property of the overlay is hard-updated (not via setState).
         * This avoids the problems of the overlay only moving to the correct
         * position after scrolling.
         */
    overlay.style.left = `${overlayStyles.left}px`;
    overlay.style.top = `${overlayStyles.top}px`;
  }

  renderSelectInput() {
    const { label, type } = this.selectedOption();
    const inputClassName = classnames(
      "categorized-select-trace__input",
      "dropdown-container",
      "arrowless-categorized-select-trace__input",
      "js-categorized-select-trace__input"
    );

    /*
         * React select classes and DOM structure are reused to force
         * the dropdown overlay to behave like other dropdown menus
         * in the workspace.
         * data-chart-type is used by Splinter to match against types
         * as labels are purely a front-end construction.
         */
    return (
      <div ref="input" onClick={this.handleToggle} className={inputClassName}>
        <div className="Select has-value">
          <div className="Select-control">
            <div className="Select-value">
              <span className="Select-value-label">
                <i className={this.getIconClassName(type)} />
                {label}
              </span>
            </div>
            <span className="Select-arrow-zone">
              <span className="Select-arrow" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderFooterMessage() {
    if (!this.props.footerMessage) {
      return null;
    }

    const footerClassName = classnames(
      "categorized-select-trace__overlay__footer",
      "+weight-light"
    );

    return (
      <div className={footerClassName}>
        <span>{_(this.props.footerMessage)}</span>
      </div>
    );
  }

  renderIconContainer(chartType) {
    const { dispatch } = this.props;
    let plotMeta = SELECT_PLOT_META[chartType] || {};
    let tipDirection = "right";
    let [feedLink, helpLink, exampleLink] = [null, null, null];

    if (["scattermapbox", "choropleth", "scattergeo"].includes(chartType)) {
      tipDirection = "left";
    }

    if (plotMeta.feedQuery) {
      feedLink = (
        <a
          href={"https://plot.ly/feed/?q=" + plotMeta.feedQuery}
          target="_blank"
          className={"hint--" + tipDirection}
          aria-label="Charts like this by Plotly users"
        >
          <i className="icon-search" aria-hidden="true" />
        </a>
      );
    }

    if (plotMeta.helpDoc) {
      helpLink = (
        <a
          href={plotMeta.helpDoc}
          target="_blank"
          className={"hint--" + tipDirection}
          aria-label="View a tutorial on this chart type"
        >
          <i className="icon-book-2" aria-hidden="true" />
        </a>
      );
    }

    if (plotMeta.examplePlot) {
      /* eslint-disable no-script-url */
      exampleLink = (
        <a
          href="javascript:;"
          onClick={() =>
            setTimeout(() => {
              dispatch(
                WorkspaceActions.loadFigure(plotMeta.examplePlot, chartType)
              );
            }, 0)}
          className={"hint--" + tipDirection}
          aria-label="See a basic example"
        >
          <i className="icon-plot" aria-hidden="true" />
        </a>
      );
      /* eslint-enable no-script-url */
    }

    return (
      <div className="categorized-select-trace__icon__container js-icon-container">
        {feedLink}
        {helpLink}
        {exampleLink}
      </div>
    );
  }

  renderOptions(columnDefinition) {
    const categorizedOptions = this.categorizedTraceOptions();

    const { traceSelectHandler, selectedTraceValue } = this.props;
    const options = categorizedOptions[columnDefinition.category];

    return R.map(option => {
      const { type, label, disabled, isAccessible } = option;
      const isSelected = selectedTraceValue === type;

      const baseClass = "categorized-select-trace__overlay__option";
      const testSelector = "js-categorized-select-trace-option";
      const optionClassName = classnames(baseClass, testSelector, {
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--selected`]: isSelected,
      });

      let handleSelect = () => {};

      if (!disabled) {
        handleSelect = evt => {
          const select = traceSelectHandler.bind(null, type);
          return this.handleSelectOption(select);
        };
      }

      return (
        <div
          onClick={handleSelect}
          className={optionClassName}
          key={type}
          data-chart-type={type}
        >
          <div className="categorized-select-trace__image__container">
            <img src={this.getImgThumbnailSrc(type)} />
          </div>
          {this.renderIconContainer(type)}
          {label}
        </div>
      );
    }, options);
  }

  renderColumns() {
    return R.map(columnDefinition => {
      const optionElements = this.renderOptions(columnDefinition);

      return (
        <div
          ref={columnDefinition.category}
          key={columnDefinition.category}
          className="categorized-select-trace__overlay__column"
        >
          <div className="categorized-select-trace__overlay__title">
            {_(columnDefinition.label)}
          </div>
          <div className="categorized-select-trace__overlay__options">
            {optionElements}
          </div>
        </div>
      );
    }, CATEGORY_LAYOUT);
  }

  renderSelectOverlay() {
    if (!this.props.isOpen) {
      return null;
    }

    function handleStopPropagation(event) {
      event.stopPropagation();
    }

    /*
         * Using categorization of options, turn each list for each
         * category to render columns for each category.
         */
    const columns = this.renderColumns();

    return (
      <div
        id="js-chart-select-overlay"
        className="categorized-select-trace__overlay"
        onClick={handleStopPropagation}
        onWheel={this.handleScrollOnOverlay}
        style={this.computeOverlayPosition()}
      >
        <div className="categorized-select-trace__overlay__option__container">
          {columns}
        </div>
        {this.renderFooterMessage()}
      </div>
    );
  }

  render() {
    const { dispatch } = this.props;

    const controlClassName = classnames(
      "categorized-select-trace",
      "js-categorized-select-trace"
    );

    return (
      <div className={controlClassName}>
        {this.renderSelectInput()}
        {this.renderSelectOverlay()}
      </div>
    );
  }
}

CategorizedSelectTrace.propTypes = {
  traceSelectHandler: PropTypes.func.isRequired,
  selectedTraceValue: PropTypes.string.isRequired,
  traceOptions: immutableTraceSelectOptionsShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  footerMessage: PropTypes.string,
};

export default CategorizedSelectTrace;

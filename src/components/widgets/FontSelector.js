import Dropdown from "./Dropdown";
import ProBadge from "./ProBadge";
import R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import getFeatureValue from "@common/utils/features";
import tieredDecorator from "@workspace/utils/tieredDecorator";
import { MIXED_VALUES } from "@workspace/constants/workspace";
import { currentUserOrNull } from "@workspace/utils/customPropTypes";
import {
  tierFontFamilies,
  hasInaccessibleFeature,
} from "@workspace/utils/checkFigureFeatureAccess";

/*
 * TODO: expand to accept custom fonts #5718
 */

const FontSelector = React.createClass({
  propTypes: {
    activeOption: PropTypes.string,
    onChange: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  },

  contextTypes: {
    currentUser: currentUserOrNull.isDefined,
  },

  // Prettify the font labels
  prettifyFontLabel(fontLabel) {
    // Take the first font-family and remove all the quotes
    if (fontLabel) {
      return R.replace(/"/g, "", fontLabel.split(",")[0]);
    }

    // if there is no font label return empty
    return "";
  },

  /**
   * Determine if the font is accessible
   * @param {String} font label specifying the font family
   * @returns {bool} if the font is accessible or not
   */
  isAccessible(font) {
    const user = this.context.currentUser;
    const feature_set = user ? user.feature_set_id : null;
    const { featureName, validations } = tierFontFamilies;

    const allowedFonts = getFeatureValue(feature_set, featureName);

    return !hasInaccessibleFeature(font, allowedFonts, validations);
  },

  // Set the initial state
  getInitialState() {
    const activeOption = this.props.activeOption || "Open Sans";
    const fontList = [
      {
        label: "Arial",
        value: "Arial",
        key: "Arial",
      },
      {
        label: "Balto",
        value: "Balto",
        key: "Balto",
      },
      {
        label: "Courier New",
        value: "Courier New",
        key: "Courier New",
      },
      {
        label: "Droid Sans",
        value: "Droid Sans",
        key: "Droid Sans",
      },
      {
        label: "Droid Serif",
        value: "Droid Serif",
        key: "Droid Serif",
      },
      {
        label: "Droid Sans Mono",
        value: "Droid Sans Mono",
        key: "Droid Sans Mono",
      },
      {
        label: "Gravitas One",
        value: "Gravitas One",
        key: "Gravitas One",
      },
      {
        label: "Liberation Sans",
        value: "Liberation Sans",
        key: "Liberation Sans",
      },
      {
        label: "Old Standard TT",
        value: "Old Standard TT",
        key: "Old Standard TT",
      },
      {
        label: "Open Sans",
        value: '"Open Sans", verdana, arial, sans-serif',
        key: "Open Sans",
      },
      {
        label: "Overpass",
        value: "Overpass",
        key: "Overpass",
      },
      {
        label: "PT Sans Narrow",
        value: "PT Sans Narrow",
        key: "PT Sans Narrow",
      },
      {
        label: "Raleway",
        value: "Raleway",
        key: "Raleway",
      },
      {
        label: "Roboto",
        value: "Roboto",
        key: "Roboto",
      },
      {
        label: "Times New Roman",
        value: "Times New Roman",
        key: "Times New Roman",
      },
    ];

    this.addFontOptionIfNotAvailable(activeOption, fontList);

    return { activeOption, fontList };
  },

  // if the font-string isn't available then add it to our list of options.
  addFontOptionIfNotAvailable(fontStringValue, fontList) {
    if (!fontList.find(o => o.value === fontStringValue)) {
      fontList.unshift({
        label: this.prettifyFontLabel(fontStringValue),
        value: fontStringValue,
        key: fontStringValue,
      });
    }
  },

  componentWillReceiveProps(nextProps) {
    // Skip addFontOption operation if value passed in is MIXED_VALUE
    if (nextProps.activeOption === MIXED_VALUES) {
      // set the active option empty if it is MIXED_VALUES
      this.setState({
        activeOption: "",
      });

      return;
    }

    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption) {
      this.addFontOptionIfNotAvailable(
        nextProps.activeOption,
        this.state.fontList
      );
      this.setState({
        activeOption: nextProps.activeOption,
      });
    }
  },

  onSelect(chosenFont) {
    const newActiveFont = chosenFont;
    const { onChange } = this.props;

    this.setState({
      activeOption: newActiveFont,
    });

    onChange(newActiveFont);
  },

  getBasicFontOptions() {
    return this.state.fontList;
  },

  renderOption({ label }) {
    const fontStyle = {
      fontFamily: label,
    };

    return (
      <li className="block-group">
        <div className="block grid-30">
          <ProBadge hide={this.isAccessible(label)} className="--dropdown" />
        </div>
        <div className="block grid-70 font-size-xs">
          <span style={fontStyle}>{label}</span>
        </div>
      </li>
    );
  },

  renderValue({ label }) {
    const hidePropBadge = this.isAccessible(label);

    let labelClass = "";
    if (!hidePropBadge) {
      labelClass = "Select-font-with-pro-badge";
    }

    const fontStyle = {
      fontFamily: label,
    };

    return (
      <div className={"Select-value-with-arrow"}>
        <span style={fontStyle} className={labelClass}>
          {label}
        </span>
        <ProBadge hide={hidePropBadge} className="--font-dropdown" />
      </div>
    );
  },

  render() {
    const { dispatch } = this.props;
    const { featureName } = tierFontFamilies;

    const tieredOnSelect = tieredDecorator(
      this.onSelect,
      this.isAccessible,
      featureName,
      dispatch,
      this.prettifyFontLabel
    );

    return (
      <span className="font-dropdown widget-dropdown">
        <Dropdown
          ref="dropdown"
          value={this.state.activeOption}
          options={this.getBasicFontOptions()}
          onChange={tieredOnSelect}
          clearable={false}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          placeholder={this.state.activeOption}
          minWidth={"100%"}
        />
      </span>
    );
  },
});

module.exports = FontSelector;

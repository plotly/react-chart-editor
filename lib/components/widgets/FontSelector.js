"use strict";

var _Dropdown = require("./Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _ProBadge = require("./ProBadge");

var _ProBadge2 = _interopRequireDefault(_ProBadge);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _features = require("@common/utils/features");

var _features2 = _interopRequireDefault(_features);

var _tieredDecorator = require("@workspace/utils/tieredDecorator");

var _tieredDecorator2 = _interopRequireDefault(_tieredDecorator);

var _workspace = require("@workspace/constants/workspace");

var _customPropTypes = require("@workspace/utils/customPropTypes");

var _checkFigureFeatureAccess = require("@workspace/utils/checkFigureFeatureAccess");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * TODO: expand to accept custom fonts #5718
 */

var FontSelector = _react2.default.createClass({
  displayName: "FontSelector",

  propTypes: {
    activeOption: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    dispatch: _propTypes2.default.func.isRequired
  },

  contextTypes: {
    currentUser: _customPropTypes.currentUserOrNull.isDefined
  },

  // Prettify the font labels
  prettifyFontLabel: function prettifyFontLabel(fontLabel) {
    // Take the first font-family and remove all the quotes
    if (fontLabel) {
      return _ramda2.default.replace(/"/g, "", fontLabel.split(",")[0]);
    }

    // if there is no font label return empty
    return "";
  },


  /**
   * Determine if the font is accessible
   * @param {String} font label specifying the font family
   * @returns {bool} if the font is accessible or not
   */
  isAccessible: function isAccessible(font) {
    var user = this.context.currentUser;
    var feature_set = user ? user.feature_set_id : null;
    var featureName = _checkFigureFeatureAccess.tierFontFamilies.featureName,
        validations = _checkFigureFeatureAccess.tierFontFamilies.validations;


    var allowedFonts = (0, _features2.default)(feature_set, featureName);

    return !(0, _checkFigureFeatureAccess.hasInaccessibleFeature)(font, allowedFonts, validations);
  },


  // Set the initial state
  getInitialState: function getInitialState() {
    var activeOption = this.props.activeOption || "Open Sans";
    var fontList = [{
      label: "Arial",
      value: "Arial",
      key: "Arial"
    }, {
      label: "Balto",
      value: "Balto",
      key: "Balto"
    }, {
      label: "Courier New",
      value: "Courier New",
      key: "Courier New"
    }, {
      label: "Droid Sans",
      value: "Droid Sans",
      key: "Droid Sans"
    }, {
      label: "Droid Serif",
      value: "Droid Serif",
      key: "Droid Serif"
    }, {
      label: "Droid Sans Mono",
      value: "Droid Sans Mono",
      key: "Droid Sans Mono"
    }, {
      label: "Gravitas One",
      value: "Gravitas One",
      key: "Gravitas One"
    }, {
      label: "Liberation Sans",
      value: "Liberation Sans",
      key: "Liberation Sans"
    }, {
      label: "Old Standard TT",
      value: "Old Standard TT",
      key: "Old Standard TT"
    }, {
      label: "Open Sans",
      value: '"Open Sans", verdana, arial, sans-serif',
      key: "Open Sans"
    }, {
      label: "Overpass",
      value: "Overpass",
      key: "Overpass"
    }, {
      label: "PT Sans Narrow",
      value: "PT Sans Narrow",
      key: "PT Sans Narrow"
    }, {
      label: "Raleway",
      value: "Raleway",
      key: "Raleway"
    }, {
      label: "Roboto",
      value: "Roboto",
      key: "Roboto"
    }, {
      label: "Times New Roman",
      value: "Times New Roman",
      key: "Times New Roman"
    }];

    this.addFontOptionIfNotAvailable(activeOption, fontList);

    return { activeOption: activeOption, fontList: fontList };
  },


  // if the font-string isn't available then add it to our list of options.
  addFontOptionIfNotAvailable: function addFontOptionIfNotAvailable(fontStringValue, fontList) {
    if (!fontList.find(function (o) {
      return o.value === fontStringValue;
    })) {
      fontList.unshift({
        label: this.prettifyFontLabel(fontStringValue),
        value: fontStringValue,
        key: fontStringValue
      });
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // Skip addFontOption operation if value passed in is MIXED_VALUE
    if (nextProps.activeOption === _workspace.MIXED_VALUES) {
      // set the active option empty if it is MIXED_VALUES
      this.setState({
        activeOption: ""
      });

      return;
    }

    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption) {
      this.addFontOptionIfNotAvailable(nextProps.activeOption, this.state.fontList);
      this.setState({
        activeOption: nextProps.activeOption
      });
    }
  },
  onSelect: function onSelect(chosenFont) {
    var newActiveFont = chosenFont;
    var onChange = this.props.onChange;


    this.setState({
      activeOption: newActiveFont
    });

    onChange(newActiveFont);
  },
  getBasicFontOptions: function getBasicFontOptions() {
    return this.state.fontList;
  },
  renderOption: function renderOption(_ref) {
    var label = _ref.label;

    var fontStyle = {
      fontFamily: label
    };

    return _react2.default.createElement(
      "li",
      { className: "block-group" },
      _react2.default.createElement(
        "div",
        { className: "block grid-30" },
        _react2.default.createElement(_ProBadge2.default, { hide: this.isAccessible(label), className: "--dropdown" })
      ),
      _react2.default.createElement(
        "div",
        { className: "block grid-70 font-size-xs" },
        _react2.default.createElement(
          "span",
          { style: fontStyle },
          label
        )
      )
    );
  },
  renderValue: function renderValue(_ref2) {
    var label = _ref2.label;

    var hidePropBadge = this.isAccessible(label);

    var labelClass = "";
    if (!hidePropBadge) {
      labelClass = "Select-font-with-pro-badge";
    }

    var fontStyle = {
      fontFamily: label
    };

    return _react2.default.createElement(
      "div",
      { className: "Select-value-with-arrow" },
      _react2.default.createElement(
        "span",
        { style: fontStyle, className: labelClass },
        label
      ),
      _react2.default.createElement(_ProBadge2.default, { hide: hidePropBadge, className: "--font-dropdown" })
    );
  },
  render: function render() {
    var dispatch = this.props.dispatch;
    var featureName = _checkFigureFeatureAccess.tierFontFamilies.featureName;


    var tieredOnSelect = (0, _tieredDecorator2.default)(this.onSelect, this.isAccessible, featureName, dispatch, this.prettifyFontLabel);

    return _react2.default.createElement(
      "span",
      { className: "font-dropdown widget-dropdown" },
      _react2.default.createElement(_Dropdown2.default, {
        ref: "dropdown",
        value: this.state.activeOption,
        options: this.getBasicFontOptions(),
        onChange: tieredOnSelect,
        clearable: false,
        optionRenderer: this.renderOption,
        valueRenderer: this.renderValue,
        placeholder: this.state.activeOption,
        minWidth: "100%"
      })
    );
  }
});

module.exports = FontSelector;
//# sourceMappingURL=FontSelector.js.map
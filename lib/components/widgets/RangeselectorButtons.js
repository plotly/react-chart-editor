"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ramda = require("ramda");

var _AccordionMenu = require("./AccordionMenu");

var _AccordionMenu2 = _interopRequireDefault(_AccordionMenu);

var _connectWorkspacePlot = require("@workspace/utils/connectWorkspacePlot");

var _connectWorkspacePlot2 = _interopRequireDefault(_connectWorkspacePlot);

var _Generic = require("@workspace/components/panels/EditModeMenu/Style/GenericStyleComponents/Generic");

var _Generic2 = _interopRequireDefault(_Generic);

var _i18n = require("@common/utils/i18n");

var _workspace = require("@workspace/constants/workspace");

var _workspace2 = require("@workspace/actions/workspace");

var _Reusable = require("@workspace/schemas/Reusable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This component is used to create rangeselector buttons:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     https://plot.ly/javascript/reference/#layout-xaxis-rangeselector
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * We're rebuilding the buttons array because of this bug on Plotly.js:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     https://github.com/plotly/plotly.js/issues/777
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * We are able to make this work because Plotly.js is more lenient here:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     https://github.com/plotly/plotly.js/issues/749
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// eslint-disable-next-line


var RangeselectorButtons = function (_Component) {
  _inherits(RangeselectorButtons, _Component);

  function RangeselectorButtons(props) {
    _classCallCheck(this, RangeselectorButtons);

    var _this = _possibleConstructorReturn(this, (RangeselectorButtons.__proto__ || Object.getPrototypeOf(RangeselectorButtons)).call(this, props));

    _this.removeButton = _this.removeButton.bind(_this);
    _this.newButton = _this.newButton.bind(_this);
    return _this;
  }

  _createClass(RangeselectorButtons, [{
    key: "removeButton",
    value: function removeButton(userButtonIndex) {
      var _props = this.props,
          axisTarget = _props.axisTarget,
          buttons = _props.buttons,
          dispatch = _props.dispatch;

      var userButtonsArray = (0, _ramda.tail)(buttons);
      var reset = { step: "all", label: "reset" };

      userButtonsArray.splice(userButtonIndex, 1);
      userButtonsArray.unshift(reset);

      var relayoutObject = userButtonsArray.length === 1 ? _defineProperty({}, axisTarget + ".rangeselector.buttons", []) : _defineProperty({}, axisTarget + ".rangeselector.buttons", userButtonsArray);

      dispatch((0, _workspace2.relayout)(relayoutObject));
    }
  }, {
    key: "newButton",
    value: function newButton() {
      var _props2 = this.props,
          axisTarget = _props2.axisTarget,
          buttons = _props2.buttons,
          dispatch = _props2.dispatch;

      var newButtons = [].concat(_toConsumableArray(buttons), [{ label: "#" + buttons.length }]);
      var reset = { step: "all", label: "reset" };

      var relayoutObject = buttons.length === 0 ? _defineProperty({}, axisTarget + ".rangeselector.buttons", [reset, { label: "#1" }]) : _defineProperty({}, axisTarget + ".rangeselector.buttons", newButtons);

      dispatch((0, _workspace2.relayout)(relayoutObject));
    }
  }, {
    key: "buildSpec",
    value: function buildSpec(index) {
      var axisTarget = this.props.axisTarget;

      var prefix = "layout." + axisTarget + ".rangeselector.buttons[" + index + "]";
      return {
        controls: [{
          label: "Label",
          type: _workspace.CONTROL_TYPES.TEXT_INPUT,
          immediate: true,
          attr: prefix + ".label"
        }, {
          label: "Step",
          type: _workspace.CONTROL_TYPES.DROPDOWN_SELECTOR,
          attr: prefix + ".step",
          options: [{ label: "Month", value: "month" }, { label: "Year", value: "year" }, { label: "Day", value: "day" }, { label: "Hour", value: "hour" }, { label: "Minute", value: "minute" }, { label: "Second", value: "second" }, { label: "All", value: "all" }]
        }, {
          label: "Count",
          type: _workspace.CONTROL_TYPES.NUMERIC_INPUT,
          attr: prefix + ".count"
        }, {
          label: "Stepmode",
          type: _workspace.CONTROL_TYPES.DROPDOWN_SELECTOR,
          attr: prefix + ".stepmode",
          options: [{ label: "Backward", value: "backward" }, { label: "To Date", value: "todate" }]
        }]
      };
    }
  }, {
    key: "renderButtonPanel",
    value: function renderButtonPanel(button, i) {
      var buttonPanel = _react2.default.createElement(_Generic2.default, {
        dispatch: this.props.dispatch,
        componentSpec: [this.buildSpec(i + 1)]
      });

      return {
        content: buttonPanel,
        title: button.label,
        isOpen: true
      };
    }
  }, {
    key: "renderGeneralSpec",
    value: function renderGeneralSpec() {
      var prefix = "layout." + this.props.axisTarget + ".rangeselector";
      var visibility = {
        attr: prefix + ".visible",
        value: true
      };

      var generalControls = [{
        title: "Visibility",
        controls: [{
          label: null,
          type: _workspace.CONTROL_TYPES.RADIO,
          attr: prefix + ".visible",
          options: [{ label: "Show", value: true }, { label: "Hide", value: false }]
        }]
      }, {
        title: "Style",
        controls: [{
          /*
                       * Cannot change the color of the 'reset' button:
                       *     https://github.com/plotly/plotly.js/issues/790
                       */
          label: "Background",
          type: _workspace.CONTROL_TYPES.COLOR,
          attr: prefix + ".bgcolor"
        }, {
          label: "Border Width",
          type: _workspace.CONTROL_TYPES.NUMERIC_INPUT,
          attr: prefix + ".borderwidth"
        }, {
          label: "Border Color",
          type: _workspace.CONTROL_TYPES.COLOR,
          attr: prefix + ".bordercolor"
        }],
        visibility: visibility
      }, {
        title: "Text",
        controls: (0, _Reusable.textControls)(prefix + ".font"),
        visibility: visibility
      }, {
        title: "Position",
        controls: [{
          label: "Horizontal",
          type: _workspace.CONTROL_TYPES.NUMERIC_INPUT,
          step: 0.1,
          attr: prefix + ".x"
        }, {
          label: "Vertical",
          type: _workspace.CONTROL_TYPES.NUMERIC_INPUT,
          step: 0.1,
          attr: prefix + ".y"
        }],
        visibility: visibility
      }];

      return _react2.default.createElement(
        "div",
        { style: { marginTop: "20px" } },
        _react2.default.createElement(_Generic2.default, {
          dispatch: this.props.dispatch,
          componentSpec: generalControls
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          axisTarget = _props3.axisTarget,
          buttons = _props3.buttons,
          value = _props3.value;

      if (axisTarget === "xaxis") {
        var allUserButtons = (0, _ramda.tail)(value.buttons);
        var buttonPanels = allUserButtons.map(this.renderButtonPanel.bind(this));
        var generalStylingControls = buttons.length > 0 ? this.renderGeneralSpec() : null;

        return _react2.default.createElement(
          "div",
          { className: "+clearfix" },
          _react2.default.createElement(_AccordionMenu2.default, {
            subMenus: buttonPanels,
            addMenuText: (0, _i18n._)("Button"),
            removeMenuHandler: this.removeButton,
            addNewMenuHandler: this.newButton
          }),
          generalStylingControls
        );
      }
      throw new Error("This styling option is unavalable for " + axisTarget + " axis");
    }
  }]);

  return RangeselectorButtons;
}(_react.Component);

RangeselectorButtons.propTypes = {
  axisTarget: _propTypes2.default.string.isRequired,
  buttons: _propTypes2.default.array.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.object
};

function mapPlotToProps(plot, _ref5) {
  var axisTarget = _ref5.axisTarget;

  var buttonsPath = ["_fullLayout", axisTarget, "rangeselector", "buttons"];
  return { buttons: plot.pathOr([], buttonsPath) };
}

exports.default = (0, _connectWorkspacePlot2.default)(mapPlotToProps)(RangeselectorButtons);
module.exports = exports["default"];
//# sourceMappingURL=RangeselectorButtons.js.map
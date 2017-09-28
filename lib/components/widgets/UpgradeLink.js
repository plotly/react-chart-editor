"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _environment = require("@common/utils/environment");

var _environment2 = _interopRequireDefault(_environment);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _subscription = require("@settings/constants/subscription");

var _modal = require("@common/constants/modal");

var _i18n = require("@common/utils/i18n");

var _ramda = require("ramda");

var _modal2 = require("@common/actions/modal");

var _requireAuthActionWrapper = require("@common/actions/requireAuthActionWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpgradeLink = function (_Component) {
  _inherits(UpgradeLink, _Component);

  function UpgradeLink() {
    _classCallCheck(this, UpgradeLink);

    return _possibleConstructorReturn(this, (UpgradeLink.__proto__ || Object.getPrototypeOf(UpgradeLink)).apply(this, arguments));
  }

  _createClass(UpgradeLink, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          featureSetId = _props.featureSetId,
          trackingProperties = _props.trackingProperties,
          onSuccessfulUpgradeAction = _props.onSuccessfulUpgradeAction;


      var PLANS = _environment2.default.get("PLANS");
      var plan = (0, _ramda.find)((0, _ramda.propEq)("featureSetId", featureSetId), PLANS);

      var updatedTrackingProperties = (0, _ramda.merge)(trackingProperties, {
        plan: plan.featureSetId,
        isSettingsApp: false
      });

      var handleUpgradeLink = function handleUpgradeLink() {
        return dispatch((0, _requireAuthActionWrapper.requireAuthActionWrapper)((0, _modal2.openModal)(_modal.MODAL_TYPES.SUBSCRIPTION, {
          plan: plan,
          initialBillingFrequency: _subscription.DEFAULTS.BILLING_FREQUENCY,
          trackingProperties: updatedTrackingProperties,
          onSuccessfulUpgradeAction: onSuccessfulUpgradeAction
        })));
      };

      var className = (0, _classnames2.default)("+upgrade-cta", "+uppercase", "+weight-semibold", "+font-size-m");
      /* eslint-disable no-script-url */
      return _react2.default.createElement(
        "a",
        {
          href: "javascript:;",
          className: className,
          onClick: handleUpgradeLink,
          ref: "upgrade"
        },
        (0, _i18n._)("Upgrade")
      );
      /* eslint-enable no-script-url */
    }
  }]);

  return UpgradeLink;
}(_react.Component);

exports.default = UpgradeLink;


UpgradeLink.defaultProps = {
  featureSetId: _subscription.DEFAULTS.FEATURE_SET_ID
};

UpgradeLink.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  featureSetId: _propTypes2.default.string,
  trackingProperties: _propTypes2.default.object.isRequired,
  onSuccessfulUpgradeAction: _propTypes2.default.func
};
module.exports = exports["default"];
//# sourceMappingURL=UpgradeLink.js.map
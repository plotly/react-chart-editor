'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ProBadge = require('@workspace/components/widgets/ProBadge');

var _ProBadge2 = _interopRequireDefault(_ProBadge);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UpgradeLink = require('@workspace/components/widgets/UpgradeLink');

var _UpgradeLink2 = _interopRequireDefault(_UpgradeLink);

var _i18n = require('@common/utils/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProFeatureDialogue = function ProFeatureDialogue(_ref) {
    var trackingProperties = _ref.trackingProperties,
        dispatch = _ref.dispatch;

    return _react2.default.createElement(
        'div',
        { className: 'js-notification-text' },
        _react2.default.createElement(
            'div',
            { className: 'pro-feature-dialogue__title' },
            (0, _i18n._)('We noticed you\'re using Pro features...')
        ),
        _react2.default.createElement(
            'div',
            { className: 'pro-feature-dialogue__text' },
            (0, _i18n._)('Pro features are marked with a'),
            _react2.default.createElement(_ProBadge2.default, { className: '--inline-margin' }),
            (0, _i18n._)('badge')
        ),
        _react2.default.createElement(
            'div',
            { className: 'pro-feature-dialogue__text' },
            (0, _i18n._)('You can create charts using these, however you will ' + 'not be able to save your charts unless you '),
            _react2.default.createElement(_UpgradeLink2.default, {
                trackingProperties: trackingProperties,
                dispatch: dispatch
            }),
            (0, _i18n._)(' or use the free options.')
        )
    );
};

ProFeatureDialogue.propTypes = {
    trackingProperties: _propTypes2.default.object.isRequired,
    dispatch: _propTypes2.default.func.isRequired
};

exports.default = ProFeatureDialogue;
module.exports = exports['default'];
//# sourceMappingURL=ProFeatureDialogue.js.map
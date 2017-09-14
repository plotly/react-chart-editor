'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = require('@common/utils/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Just pulling some styling constants out of our render method.
var baseConfirmBoxClassName = (0, _classnames2.default)('js-confirm-box', '+text-center'); /**
                                                                                            * ConfirmBox A generic div offering a 'confirm' and 'cancel' button with some
                                                                                            * text that can be passed in with props.
                                                                                            *
                                                                                            * The main content is wrapped in another div to add additional modal-styling
                                                                                            * options. Layout should be set via `className` and `wrapperClassName`.
                                                                                            *
                                                                                            * @module
                                                                                            */

var baseConfirmBoxWrapperClassName = (0, _classnames2.default)('js-confirm-box__wrapper');
var headerClassName = (0, _classnames2.default)('js-confirm-box__header', 'confirmbox__title');
var cancelBtnClassName = (0, _classnames2.default)('js-confirm-box__cancel', 'btnbase', 'btn--default', '+push-half-sides');
var baseConfirmBtnClassName = (0, _classnames2.default)('js-confirm-box__confirm', 'btnbase', 'btn--primary', '+push-half-sides');
var alternativeBtnClassName = (0, _classnames2.default)('js-confirm-box__alternative', 'btnbase', 'btn--primary', '+push-half-sides');

var propTypes = {

    // Required props
    message: _react.PropTypes.string.isRequired,
    onConfirm: _react.PropTypes.func.isRequired,
    onCancel: _react.PropTypes.func.isRequired,

    // Optional text
    cancelText: _react.PropTypes.string,
    confirmText: _react.PropTypes.string,
    headerText: _react.PropTypes.string,
    alternativeText: _react.PropTypes.string,

    /*
     * Optional classes & styling. You can use className and wrapperClassName
     * to create PopStore-ready modals or custom, embedded modals.
     */
    className: _react.PropTypes.string,
    wrapperClassName: _react.PropTypes.string,

    // Optional functionality
    dangerous: _react.PropTypes.bool,
    dangerouslySetMessageInnerHtml: _react.PropTypes.bool,
    hideCancel: _react.PropTypes.bool,
    onAlternative: _react.PropTypes.func,
    showAlternative: _react.PropTypes.bool

};

var defaultProps = {

    // Optional text
    cancelText: (0, _i18n._)('Cancel'),
    confirmText: (0, _i18n._)('Confirm'),
    headerText: (0, _i18n._)('Confirm?'),
    alternativeText: (0, _i18n._)('Alternative'),

    // Optional functionality
    dangerous: false,
    dangerouslySetMessageInnerHtml: false,
    hideCancel: false,
    showAlternative: false

};

var ConfirmBox = function ConfirmBox(props) {
    var alternativeText = props.alternativeText,
        cancelText = props.cancelText,
        className = props.className,
        dangerouslySetMessageInnerHtml = props.dangerouslySetMessageInnerHtml,
        confirmText = props.confirmText,
        dangerous = props.dangerous,
        headerText = props.headerText,
        hideCancel = props.hideCancel,
        message = props.message,
        onAlternative = props.onAlternative,
        onCancel = props.onCancel,
        onConfirm = props.onConfirm,
        showAlternative = props.showAlternative,
        wrapperClassName = props.wrapperClassName;


    if (showAlternative && !onAlternative) {
        throw new Error('Missing onAlternative function.');
    }

    var confirmBoxClassName = (0, _classnames2.default)(baseConfirmBoxClassName, className);
    var confirmBoxWrapperClassName = (0, _classnames2.default)(baseConfirmBoxWrapperClassName, wrapperClassName);
    var confirmBtnClassName = (0, _classnames2.default)(baseConfirmBtnClassName, { 'btn--danger': dangerous });

    var msg = void 0;
    if (dangerouslySetMessageInnerHtml) {
        var innerHTML = { __html: message };
        msg = _react2.default.createElement('p', {
            className: 'confirmbox__message',
            dangerouslySetInnerHTML: innerHTML
        });
    } else {
        msg = _react2.default.createElement(
            'p',
            { className: 'confirmbox__message' },
            message
        );
    }

    var cancelBtn = _react2.default.createElement(
        'button',
        { className: cancelBtnClassName, onClick: onCancel },
        cancelText
    );

    var confirmBtn = _react2.default.createElement(
        'button',
        { className: confirmBtnClassName, onClick: onConfirm },
        confirmText
    );

    var alternativeBtn = _react2.default.createElement(
        'button',
        { className: alternativeBtnClassName, onClick: onAlternative },
        alternativeText
    );

    return _react2.default.createElement(
        'div',
        { className: confirmBoxWrapperClassName },
        _react2.default.createElement(
            'div',
            { className: confirmBoxClassName },
            _react2.default.createElement(
                'h2',
                { className: headerClassName },
                headerText
            ),
            msg,
            _react2.default.createElement(
                'span',
                null,
                hideCancel ? null : cancelBtn,
                showAlternative ? alternativeBtn : null,
                confirmBtn
            )
        )
    );
};

ConfirmBox.propTypes = propTypes;

ConfirmBox.defaultProps = defaultProps;

exports.default = ConfirmBox;
module.exports = exports['default'];
//# sourceMappingURL=ConfirmBox.js.map
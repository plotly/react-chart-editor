'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalContent = exports.ModalHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plotlyIcons = require('plotly-icons');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalHeader = function ModalHeader(_ref) {
  var title = _ref.title,
      handleClose = _ref.handleClose;
  return _react2.default.createElement(
    'div',
    { className: 'modal__header' },
    title ? _react2.default.createElement(
      'div',
      { className: 'modal__header__title' },
      title
    ) : null,
    handleClose ? _react2.default.createElement(
      'div',
      { className: 'modal__header__close', onClick: handleClose ? function () {
          return handleClose();
        } : null },
      _react2.default.createElement(_plotlyIcons.CloseIcon, null)
    ) : null
  );
};

var ModalContent = function ModalContent(_ref2) {
  var children = _ref2.children;
  return _react2.default.createElement(
    'div',
    { className: 'modal__content' },
    children
  );
};

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.escFunction = _this.escFunction.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'escFunction',
    value: function escFunction(event) {
      var escKeyCode = 27;
      if (event.keyCode === escKeyCode) {
        this.context.handleClose();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.escFunction, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.escFunction, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          title = _props.title;

      var classes = 'modal';
      if (this.context.isAnimatingOut) {
        classes += ' modal--animate-out';
      }
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'modal__card' },
          _react2.default.createElement(ModalHeader, { title: title, handleClose: function handleClose() {
              return _this2.context.handleClose();
            } }),
          _react2.default.createElement(
            ModalContent,
            null,
            children
          )
        ),
        _react2.default.createElement('div', { className: 'modal__backdrop', onClick: function onClick() {
            return _this2.context.handleClose();
          } })
      );
    }
  }]);

  return Modal;
}(_react.Component);

ModalHeader.propTypes = {
  title: _propTypes2.default.node,
  handleClose: _propTypes2.default.func.isRequired
};

ModalContent.propTypes = {
  children: _propTypes2.default.node.isRequired
};

Modal.propTypes = {
  children: _propTypes2.default.node.isRequired,
  title: _propTypes2.default.node
};

Modal.contextType = _context.ModalProviderContext;

exports.default = Modal;
exports.ModalHeader = ModalHeader;
exports.ModalContent = ModalContent;
//# sourceMappingURL=Modal.js.map
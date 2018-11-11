'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalProvider = function (_React$Component) {
  _inherits(ModalProvider, _React$Component);

  function ModalProvider(props) {
    _classCallCheck(this, ModalProvider);

    var _this = _possibleConstructorReturn(this, (ModalProvider.__proto__ || Object.getPrototypeOf(ModalProvider)).call(this, props));

    _this.state = {
      component: null,
      componentProps: {},
      open: false,
      isAnimatingOut: false
    };
    return _this;
  }

  _createClass(ModalProvider, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var body = document.body;
      var open = this.state.open;

      // Toggle scroll on document body if modal is open

      var hasClass = body.classList.contains('no-scroll');

      if (open && !hasClass) {
        body.classList.add('no-scroll');
      }
      if (!open && hasClass) {
        body.classList.remove('no-scroll');
      }
    }
  }, {
    key: 'openModal',
    value: function openModal(component, componentProps) {
      var _ = this.context.localize;

      if (!component) {
        throw Error(_('You need to provide a component for the modal to open!'));
      }
      var open = this.state.open;


      if (!open) {
        this.setState({
          component: component,
          componentProps: componentProps,
          open: true
        });
      }
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      var open = this.state.open;

      if (open) {
        this.setState({
          open: false,
          component: null
        });
      }
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      var _this2 = this;

      this.setState({ isAnimatingOut: true });
      var animationDuration = 600;
      setTimeout(function () {
        _this2.setState({ isAnimatingOut: false });
        _this2.closeModal();
      }, animationDuration);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this3 = this;

      return {
        openModal: function openModal(c, p) {
          return _this3.openModal(c, p);
        },
        closeModal: function closeModal() {
          return _this3.closeModal();
        },
        handleClose: function handleClose() {
          return _this3.handleClose();
        },
        isAnimatingOut: this.state.isAnimatingOut
      };
    }
  }, {
    key: 'provideValue',
    value: function provideValue() {
      var _this4 = this;

      return {
        openModal: function openModal(c, p) {
          return _this4.openModal(c, p);
        },
        closeModal: function closeModal() {
          return _this4.closeModal();
        },
        handleClose: function handleClose() {
          return _this4.handleClose();
        },
        isAnimatingOut: this.state.isAnimatingOut
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          Component = _state.component,
          componentProps = _state.componentProps,
          isAnimatingOut = _state.isAnimatingOut;

      return _react2.default.createElement(
        _context.ModalProviderContext.Provider,
        { value: this.provideValue() },
        _react2.default.createElement(
          _react.Fragment,
          null,
          this.props.children,
          this.state.open ? _react2.default.createElement(Component, _extends({ isAnimatingOut: isAnimatingOut }, componentProps)) : null
        )
      );
    }
  }]);

  return ModalProvider;
}(_react2.default.Component);

ModalProvider.propTypes = {
  children: _propTypes2.default.node
};
ModalProvider.contextTypes = {
  localize: _propTypes2.default.func
};
ModalProvider.childContextTypes = {
  openModal: _propTypes2.default.func,
  closeModal: _propTypes2.default.func,
  handleClose: _propTypes2.default.func,
  isAnimatingOut: _propTypes2.default.bool
};

exports.default = ModalProvider;
//# sourceMappingURL=ModalProvider.js.map
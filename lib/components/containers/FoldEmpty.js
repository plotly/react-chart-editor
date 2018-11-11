'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoldEmpty = function (_Component) {
  _inherits(FoldEmpty, _Component);

  function FoldEmpty() {
    _classCallCheck(this, FoldEmpty);

    return _possibleConstructorReturn(this, (FoldEmpty.__proto__ || Object.getPrototypeOf(FoldEmpty)).apply(this, arguments));
  }

  _createClass(FoldEmpty, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          Icon = _props.icon,
          messagePrimary = _props.messagePrimary,
          messageSecondary = _props.messageSecondary;


      return _react2.default.createElement(
        'div',
        { className: 'fold__content__empty' },
        Icon ? _react2.default.createElement(
          'div',
          { className: 'fold__content__empty__icon' },
          _react2.default.createElement(Icon, null)
        ) : null,
        messagePrimary ? _react2.default.createElement(
          'div',
          { className: 'fold__content__empty__message__primary' },
          messagePrimary
        ) : null,
        messageSecondary ? _react2.default.createElement(
          'div',
          { className: 'fold__content__empty__message__secondary' },
          messageSecondary
        ) : null,
        children ? children : null
      );
    }
  }]);

  return FoldEmpty;
}(_react.Component);

exports.default = FoldEmpty;


FoldEmpty.propTypes = {
  messagePrimary: _propTypes2.default.string,
  messageSecondary: _propTypes2.default.string,
  children: _propTypes2.default.node,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
};
//# sourceMappingURL=FoldEmpty.js.map
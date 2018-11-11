'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalBox = function (_Component) {
  _inherits(ModalBox, _Component);

  function ModalBox() {
    _classCallCheck(this, ModalBox);

    return _possibleConstructorReturn(this, (ModalBox.__proto__ || Object.getPrototypeOf(ModalBox)).apply(this, arguments));
  }

  _createClass(ModalBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          backgroundDark = _props.backgroundDark,
          children = _props.children,
          onClose = _props.onClose,
          relative = _props.relative;

      var modalboxClass = (0, _classnames2.default)('modalbox', {
        'modalbox--dark': backgroundDark,
        'modalbox--relative': relative
      });
      return _react2.default.createElement(
        'div',
        { className: modalboxClass },
        _react2.default.createElement('div', { className: 'modalbox__cover', onClick: onClose }),
        _react2.default.createElement(
          'div',
          { className: 'modalbox__content' },
          children
        )
      );
    }
  }]);

  return ModalBox;
}(_react.Component);

exports.default = ModalBox;


ModalBox.propTypes = {
  backgroundDark: _propTypes2.default.bool,
  relative: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  onClose: _propTypes2.default.func
};
//# sourceMappingURL=ModalBox.js.map
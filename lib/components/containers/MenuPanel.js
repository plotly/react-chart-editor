'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ModalBox = require('./ModalBox');

var _ModalBox2 = _interopRequireDefault(_ModalBox);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _plotlyIcons = require('plotly-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuPanel = function (_Component) {
  _inherits(MenuPanel, _Component);

  function MenuPanel() {
    _classCallCheck(this, MenuPanel);

    var _this = _possibleConstructorReturn(this, (MenuPanel.__proto__ || Object.getPrototypeOf(MenuPanel)).call(this));

    _this.state = { isOpen: false };

    _this.togglePanel = _this.togglePanel.bind(_this);
    return _this;
  }

  _createClass(MenuPanel, [{
    key: 'getIcon',
    value: function getIcon() {
      var _props = this.props,
          question = _props.question,
          Icon = _props.icon;

      if (question) {
        return {
          icon: _react2.default.createElement(_plotlyIcons.QuestionIcon, { className: 'menupanel__icon' }),
          spanClass: 'menupanel__icon-span menupanel__icon-span--question'
        };
      }
      if (Icon) {
        return {
          icon: _react2.default.createElement(Icon, { className: 'menupanel__icon' }),
          spanClass: 'menupanel__icon-span'
        };
      }
      return {
        icon: _react2.default.createElement(_plotlyIcons.CogIcon, { className: 'menupanel__icon' }),
        spanClass: 'menupanel__icon-span menupanel__icon-span--cog'
      };
    }
  }, {
    key: 'togglePanel',
    value: function togglePanel() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          show = _props2.show,
          ownline = _props2.ownline,
          label = _props2.label,
          children = _props2.children;

      var isOpen = show || this.state.isOpen;

      var containerClass = (0, _classnames2.default)('menupanel', {
        'menupanel--ownline': ownline
      });

      var _getIcon = this.getIcon(),
          icon = _getIcon.icon,
          spanClass = _getIcon.spanClass;

      return _react2.default.createElement(
        'div',
        { className: containerClass },
        _react2.default.createElement(
          'div',
          { className: spanClass },
          _react2.default.createElement(
            'div',
            { className: 'menupanel__label' },
            label
          ),
          _react2.default.createElement(
            'div',
            { className: 'menupanel__icon__wrapper', onClick: this.togglePanel },
            icon
          )
        ),
        isOpen && _react2.default.createElement(
          _ModalBox2.default,
          { onClose: this.togglePanel },
          children
        )
      );
    }
  }]);

  return MenuPanel;
}(_react.Component);

exports.default = MenuPanel;


MenuPanel.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  label: _propTypes2.default.string,
  ownline: _propTypes2.default.bool,
  question: _propTypes2.default.bool,
  show: _propTypes2.default.bool
};
//# sourceMappingURL=MenuPanel.js.map
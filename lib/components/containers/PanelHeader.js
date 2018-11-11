'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('../widgets/Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _plotlyIcons = require('plotly-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelHeader = function (_Component) {
  _inherits(PanelHeader, _Component);

  function PanelHeader() {
    _classCallCheck(this, PanelHeader);

    var _this = _possibleConstructorReturn(this, (PanelHeader.__proto__ || Object.getPrototypeOf(PanelHeader)).call(this));

    _this.state = { addPanelOpen: false };

    _this.togglePanel = _this.togglePanel.bind(_this);
    return _this;
  }

  _createClass(PanelHeader, [{
    key: 'togglePanel',
    value: function togglePanel() {
      this.setState({ addPanelOpen: !this.state.addPanelOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _ = this.context.localize;
      var _props = this.props,
          children = _props.children,
          addAction = _props.addAction,
          allowCollapse = _props.allowCollapse,
          toggleFolds = _props.toggleFolds,
          hasOpen = _props.hasOpen;

      // dropdown is styled with same styles as react-select component - see _dropdown.scss

      var icon = _react2.default.createElement(_plotlyIcons.PlusIcon, null);
      return !children && !addAction && !allowCollapse ? null : _react2.default.createElement(
        'div',
        { className: 'panel__header' },
        children && children.length ? _react2.default.createElement(
          'div',
          { className: 'panel__header__content' },
          children
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'panel__header__actions__container' },
          allowCollapse ? _react2.default.createElement(
            'div',
            { className: 'panel__header__collapse', onClick: toggleFolds },
            hasOpen ? _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_plotlyIcons.ResizeDownIcon, null),
              _('Collapse All')
            ) : _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_plotlyIcons.ResizeUpIcon, null),
              _('Expand All')
            )
          ) : null,
          addAction ? _react2.default.createElement(
            'div',
            { className: 'panel__header__action dropdown-container' },
            _react2.default.createElement(_Button2.default, {
              variant: 'primary',
              className: 'js-add-button',
              onClick: Array.isArray(addAction.handler) ? this.togglePanel : function () {
                return addAction.handler(_this2.context);
              },
              icon: icon,
              label: addAction.label
            }),
            this.state.addPanelOpen && _react2.default.createElement(
              'div',
              { className: 'Select' },
              _react2.default.createElement(
                'div',
                { className: 'Select-menu-outer' },
                _react2.default.createElement(
                  'div',
                  { className: 'Select-menu' },
                  addAction.handler.map(function (_ref) {
                    var label = _ref.label,
                        handler = _ref.handler;
                    return _react2.default.createElement(
                      'div',
                      {
                        className: 'Select-option',
                        key: label,
                        onClick: function onClick() {
                          handler(_this2.context);
                          _this2.togglePanel();
                        }
                      },
                      label
                    );
                  })
                )
              )
            )
          ) : null
        )
      );
    }
  }]);

  return PanelHeader;
}(_react.Component);

PanelHeader.contextTypes = {
  layout: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func,
  localize: _propTypes2.default.func
};

PanelHeader.propTypes = {
  addAction: _propTypes2.default.object,
  allowCollapse: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  hasOpen: _propTypes2.default.bool,
  toggleFolds: _propTypes2.default.func
};

exports.default = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map
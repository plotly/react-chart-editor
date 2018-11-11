'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectUpdateMenuToLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectUpdateMenuToLayout(WrappedComponent) {
  var UpdateMenuConnectedComponent = function (_Component) {
    _inherits(UpdateMenuConnectedComponent, _Component);

    function UpdateMenuConnectedComponent(props, context) {
      _classCallCheck(this, UpdateMenuConnectedComponent);

      var _this = _possibleConstructorReturn(this, (UpdateMenuConnectedComponent.__proto__ || Object.getPrototypeOf(UpdateMenuConnectedComponent)).call(this, props, context));

      _this.updateUpdateMenu = _this.updateUpdateMenu.bind(_this);
      _this.setLocals(props, context);
      return _this;
    }

    _createClass(UpdateMenuConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        var updateMenuIndex = props.updateMenuIndex;
        var container = context.container,
            fullContainer = context.fullContainer;


        var updatemenus = container.updatemenus || [];
        var fullUpdateMenus = fullContainer.updatemenus || [];
        this.container = updatemenus[updateMenuIndex];
        this.fullContainer = fullUpdateMenus[updateMenuIndex];
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this2.context.getValObject ? null : _this2.context.getValObject('updatemenus[].' + attr);
          },
          updateContainer: this.updateUpdateMenu,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        var _this3 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this3.context.getValObject ? null : _this3.context.getValObject('updatemenus[].' + attr);
          },
          updateContainer: this.updateUpdateMenu,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'updateUpdateMenu',
      value: function updateUpdateMenu(update) {
        var newUpdate = {};
        var updateMenuIndex = this.props.updateMenuIndex;

        for (var key in update) {
          var newkey = 'updatemenus[' + updateMenuIndex + '].' + key;
          newUpdate[newkey] = update[key];
        }
        this.context.updateContainer(newUpdate);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return UpdateMenuConnectedComponent;
  }(_react.Component);

  UpdateMenuConnectedComponent.displayName = 'UpdateMenuConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  UpdateMenuConnectedComponent.propTypes = {
    updateMenuIndex: _propTypes2.default.number.isRequired
  };

  UpdateMenuConnectedComponent.contextTypes = {
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    onUpdate: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    getValObject: _propTypes2.default.func
  };

  UpdateMenuConnectedComponent.childContextTypes = {
    updateContainer: _propTypes2.default.func,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    getValObject: _propTypes2.default.func
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  UpdateMenuConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return UpdateMenuConnectedComponent;
}
//# sourceMappingURL=connectUpdateMenuToLayout.js.map
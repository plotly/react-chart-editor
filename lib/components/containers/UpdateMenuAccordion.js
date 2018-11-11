'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _TraceRequiredPanel = require('./TraceRequiredPanel');

var _TraceRequiredPanel2 = _interopRequireDefault(_TraceRequiredPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateMenuFold = (0, _lib.connectUpdateMenuToLayout)(_PlotlyFold2.default);

var UpdateMenuAccordion = function (_Component) {
  _inherits(UpdateMenuAccordion, _Component);

  function UpdateMenuAccordion() {
    _classCallCheck(this, UpdateMenuAccordion);

    return _possibleConstructorReturn(this, (UpdateMenuAccordion.__proto__ || Object.getPrototypeOf(UpdateMenuAccordion)).apply(this, arguments));
  }

  _createClass(UpdateMenuAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$fullLayout$u = _context.fullLayout.updatemenus,
          updatemenus = _context$fullLayout$u === undefined ? [] : _context$fullLayout$u,
          _ = _context.localize;
      var children = this.props.children;


      var content = updatemenus.length > 0 && updatemenus.map(function (upd, i) {
        var localizedType = {
          dropdown: _('Dropdown'),
          buttons: _('Buttons')
        };
        var menuType = localizedType[upd.type] || localizedType.dropdown;
        var activeBtn = upd.buttons.filter(function (b) {
          return b._index === upd.active;
        })[0];
        var foldName = menuType + (activeBtn ? ': ' + activeBtn.label : '');

        return _react2.default.createElement(
          UpdateMenuFold,
          { key: i, updateMenuIndex: i, name: foldName },
          children
        );
      });

      return _react2.default.createElement(
        _TraceRequiredPanel2.default,
        null,
        content ? content : null
      );
    }
  }]);

  return UpdateMenuAccordion;
}(_react.Component);

UpdateMenuAccordion.contextType = _context2.EditorControlsContext;

UpdateMenuAccordion.propTypes = {
  children: _propTypes2.default.node
};

exports.default = UpdateMenuAccordion;
//# sourceMappingURL=UpdateMenuAccordion.js.map
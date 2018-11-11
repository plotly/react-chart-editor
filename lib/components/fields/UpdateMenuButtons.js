'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _lib = require('../../lib');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateMenuButtons = function (_Component) {
  _inherits(UpdateMenuButtons, _Component);

  function UpdateMenuButtons(props, context) {
    _classCallCheck(this, UpdateMenuButtons);

    var _this = _possibleConstructorReturn(this, (UpdateMenuButtons.__proto__ || Object.getPrototypeOf(UpdateMenuButtons)).call(this, props, context));

    _this.state = {
      currentButtonIndex: 0
    };
    return _this;
  }

  _createClass(UpdateMenuButtons, [{
    key: 'renderDropdown',
    value: function renderDropdown() {
      var _this2 = this;

      var _ = this.context.localize;
      var options = this.props.fullValue.map(function (button, index) {
        return { label: _('Button') + (' ' + (index + 1)), value: index };
      });
      return _react2.default.createElement(_index.Dropdown, {
        attr: 'buttons',
        label: _('Button'),
        options: options,
        updatePlot: function updatePlot(index) {
          return _this2.setState({ currentButtonIndex: index });
        },
        clearable: false,
        fullValue: this.state.currentButtonIndex
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Field2.default,
        null,
        this.renderDropdown(),
        _react2.default.createElement(_index.TextEditor, { attr: 'buttons[' + this.state.currentButtonIndex + '].label', richTextOnly: true })
      );
    }
  }]);

  return UpdateMenuButtons;
}(_react.Component);

UpdateMenuButtons.propTypes = {
  attr: _propTypes2.default.string,
  fullValue: _propTypes2.default.array,
  updatePlot: _propTypes2.default.func
};

UpdateMenuButtons.contextType = _context.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(UpdateMenuButtons);
//# sourceMappingURL=UpdateMenuButtons.js.map
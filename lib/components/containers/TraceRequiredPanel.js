'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PanelEmpty = require('./PanelEmpty');

var _PanelEmpty2 = _interopRequireDefault(_PanelEmpty);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _derived = require('./derived');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceRequiredPanel = function (_Component) {
  _inherits(TraceRequiredPanel, _Component);

  function TraceRequiredPanel() {
    _classCallCheck(this, TraceRequiredPanel);

    return _possibleConstructorReturn(this, (TraceRequiredPanel.__proto__ || Object.getPrototypeOf(TraceRequiredPanel)).apply(this, arguments));
  }

  _createClass(TraceRequiredPanel, [{
    key: 'hasTrace',
    value: function hasTrace() {
      return this.context.fullData.filter(function (trace) {
        return trace.visible;
      }).length > 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _ = this.context.localize;

      var _props = this.props,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['children']);

      if (!this.props.visible) {
        return null;
      }

      return this.hasTrace() ? _react2.default.createElement(
        _derived.LayoutPanel,
        rest,
        children
      ) : _react2.default.createElement(
        _context.ModalProviderContext.Consumer,
        null,
        function (_ref) {
          var setPanel = _ref.setPanel;
          return _react2.default.createElement(
            _PanelEmpty2.default,
            { heading: _("Looks like there aren't any traces defined yet.") },
            _react2.default.createElement(
              'p',
              null,
              _('Go to the '),
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return setPanel('Structure', 'Traces');
                  } },
                _('Traces')
              ),
              _(' panel under Structure to define traces.')
            )
          );
        }
      );
    }
  }]);

  return TraceRequiredPanel;
}(_react.Component);

TraceRequiredPanel.propTypes = {
  children: _propTypes2.default.node,
  visible: _propTypes2.default.bool
};

TraceRequiredPanel.defaultProps = {
  visible: true
};

TraceRequiredPanel.contextType = _context.EditorControlsContext;

exports.default = TraceRequiredPanel;
//# sourceMappingURL=TraceRequiredPanel.js.map
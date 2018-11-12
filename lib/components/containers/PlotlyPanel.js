'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PanelHeader = require('./PanelHeader');

var _PanelHeader2 = _interopRequireDefault(_PanelHeader);

var _PanelEmpty = require('./PanelEmpty');

var _PanelEmpty2 = _interopRequireDefault(_PanelEmpty);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _lib = require('../../lib');

var _plotlyIcons = require('plotly-icons');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelErrorImpl = function (_Component) {
  _inherits(PanelErrorImpl, _Component);

  function PanelErrorImpl() {
    _classCallCheck(this, PanelErrorImpl);

    return _possibleConstructorReturn(this, (PanelErrorImpl.__proto__ || Object.getPrototypeOf(PanelErrorImpl)).apply(this, arguments));
  }

  _createClass(PanelErrorImpl, [{
    key: 'render',
    value: function render() {
      var _ = this.context.localize;


      return _react2.default.createElement(
        _PanelEmpty2.default,
        { icon: _plotlyIcons.EmbedIconIcon, heading: _('Well this is embarrassing.') },
        _react2.default.createElement(
          'p',
          null,
          _('This panel could not be displayed due to an error.')
        )
      );
    }
  }]);

  return PanelErrorImpl;
}(_react.Component);

PanelErrorImpl.contextType = _context.EditorControlsContext;

var PanelError = PanelErrorImpl;

var Panel = exports.Panel = function (_Component2) {
  _inherits(Panel, _Component2);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this2 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this2.state = {
      individualFoldStates: [],
      hasError: false
    };
    _this2.toggleFolds = _this2.toggleFolds.bind(_this2);
    _this2.toggleFold = _this2.toggleFold.bind(_this2);
    return _this2;
  }

  _createClass(Panel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        deleteContainer: this.props.deleteAction ? this.props.deleteAction : null
      };
    }
  }, {
    key: 'provideValue',
    value: function provideValue() {
      return {
        deleteContainer: this.props.deleteAction ? this.props.deleteAction : null
      };
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch() {
      this.setState({ hasError: true });
    }
  }, {
    key: 'toggleFolds',
    value: function toggleFolds() {
      var individualFoldStates = this.state.individualFoldStates;

      var hasOpen = individualFoldStates.length > 0 && individualFoldStates.some(function (s) {
        return s !== true;
      });
      this.setState({
        individualFoldStates: individualFoldStates.map(function () {
          return hasOpen;
        })
      });
    }
  }, {
    key: 'toggleFold',
    value: function toggleFold(index) {
      this.setState((0, _immutabilityHelper2.default)(this.state, { individualFoldStates: { $toggle: [index] } }));
    }
  }, {
    key: 'calculateFolds',
    value: function calculateFolds() {
      // to get proper number of child folds and initialize component state
      var numFolds = 0;

      _react2.default.Children.forEach(this.props.children, function (child) {
        if ((child && child.type && child.type.plotly_editor_traits || {}).foldable) {
          numFolds++;
        }
      });

      if (this.state.individualFoldStates.length !== numFolds) {
        var newFoldStates = new Array(numFolds).fill(false);
        this.setState({
          individualFoldStates: this.props.addAction ? newFoldStates.map(function (e, i) {
            return i !== numFolds - 1;
          }) : newFoldStates
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.calculateFolds();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateFolds();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          individualFoldStates = _state.individualFoldStates,
          hasError = _state.hasError;


      if (hasError) {
        return _react2.default.createElement(
          _context.PlotlyPanelContext.Provider,
          { value: this.provideValue() },
          _react2.default.createElement(PanelError, null)
        );
      }

      var newChildren = _react2.default.Children.map(this.props.children, function (child, index) {
        if ((child && child.type && child.type.plotly_editor_traits || {}).foldable) {
          return (0, _react.cloneElement)(child, {
            key: index,
            folded: individualFoldStates[index] || false,
            toggleFold: function toggleFold() {
              return _this3.toggleFold(index);
            }
          });
        }
        return child;
      });

      return _react2.default.createElement(
        _context.PlotlyPanelContext.Provider,
        { value: this.provideValue() },
        _react2.default.createElement(
          'div',
          { className: 'panel' + (this.props.noPadding ? ' panel--no-padding' : '') },
          _react2.default.createElement(_PanelHeader2.default, {
            addAction: this.props.addAction,
            allowCollapse: this.props.showExpandCollapse && individualFoldStates.length > 1,
            toggleFolds: this.toggleFolds,
            hasOpen: individualFoldStates.some(function (s) {
              return s === false;
            })
          }),
          _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('panel', 'content') },
            newChildren
          )
        )
      );
    }
  }]);

  return Panel;
}(_react.Component);

Panel.propTypes = {
  addAction: _propTypes2.default.object,
  children: _propTypes2.default.node,
  deleteAction: _propTypes2.default.func,
  noPadding: _propTypes2.default.bool,
  showExpandCollapse: _propTypes2.default.bool
};

Panel.defaultProps = {
  showExpandCollapse: true
};

Panel.contextTypes = {
  localize: _propTypes2.default.func
};

Panel.childContextTypes = {
  deleteContainer: _propTypes2.default.func
};

var PlotlyPanel = function (_Panel) {
  _inherits(PlotlyPanel, _Panel);

  function PlotlyPanel() {
    _classCallCheck(this, PlotlyPanel);

    return _possibleConstructorReturn(this, (PlotlyPanel.__proto__ || Object.getPrototypeOf(PlotlyPanel)).apply(this, arguments));
  }

  return PlotlyPanel;
}(Panel);

PlotlyPanel.plotly_editor_traits = {
  no_visibility_forcing: true
};

exports.default = PlotlyPanel;
//# sourceMappingURL=PlotlyPanel.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fold = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FoldEmpty = require('./FoldEmpty');

var _FoldEmpty2 = _interopRequireDefault(_FoldEmpty);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _plotlyIcons = require('plotly-icons');

var _lib = require('../../lib');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fold = exports.Fold = function (_Component) {
  _inherits(Fold, _Component);

  function Fold() {
    _classCallCheck(this, Fold);

    var _this = _possibleConstructorReturn(this, (Fold.__proto__ || Object.getPrototypeOf(Fold)).call(this));

    _this.foldVisible = true;
    return _this;
  }

  _createClass(Fold, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        foldInfo: this.props.foldInfo ? this.props.foldInfo : null
      };
    }
  }, {
    key: 'provideValue',
    value: function provideValue() {
      return {
        foldInfo: this.props.foldInfo ? this.props.foldInfo : null
      };
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.foldVisible && !this.props.messageIfEmpty) {
        return _react2.default.createElement(_context.PlotlyFoldContext.Provider, { value: this.getChildContext() });
      }
      var deleteContainer = this.context.deleteContainer;
      var _props = this.props,
          canDelete = _props.canDelete,
          children = _props.children,
          className = _props.className,
          folded = _props.folded,
          foldInfo = _props.foldInfo,
          toggleFold = _props.toggleFold,
          hideHeader = _props.hideHeader,
          Icon = _props.icon,
          messageIfEmpty = _props.messageIfEmpty,
          name = _props.name;


      var contentClass = (0, _classnames2.default)('fold__content', {
        'fold__content--noheader': hideHeader
      });

      var headerClass = (0, _classnames2.default)('fold__top', {
        'fold__top--open': !folded
      });

      var arrowClass = (0, _classnames2.default)('fold__top__arrow', {
        'fold__top__arrow--open': !folded
      });

      var arrowIcon = _react2.default.createElement(
        'div',
        { className: arrowClass },
        _react2.default.createElement(
          'div',
          { className: 'fold__top__arrow__wrapper' },
          _react2.default.createElement(_plotlyIcons.AngleDownIcon, null)
        )
      );

      var icon = Icon ? _react2.default.createElement(Icon, { className: 'fold__top__icon' }) : null;

      var deleteButton = canDelete && typeof deleteContainer === 'function' ? _react2.default.createElement(
        'div',
        {
          className: 'fold__top__delete js-fold__delete',
          onClick: function onClick(e) {
            e.stopPropagation();
            deleteContainer(foldInfo);
          }
        },
        _react2.default.createElement(_plotlyIcons.CloseIcon, null)
      ) : null;

      var foldHeader = !hideHeader && _react2.default.createElement(
        'div',
        { className: headerClass, onClick: toggleFold },
        _react2.default.createElement(
          'div',
          { className: 'fold__top__arrow-title' },
          arrowIcon,
          icon,
          _react2.default.createElement(
            'div',
            { className: 'fold__top__title' },
            (0, _lib.striptags)(name)
          )
        ),
        deleteButton
      );

      var foldContent = null;
      if (!folded) {
        if (this.foldVisible) {
          foldContent = _react2.default.createElement(
            'div',
            { className: contentClass },
            children
          );
        } else {
          foldContent = _react2.default.createElement(
            'div',
            { className: contentClass },
            _react2.default.createElement(_FoldEmpty2.default, { icon: Icon, messagePrimary: messageIfEmpty })
          );
        }
      }

      var classes = className ? ' ' + className : '';

      return _react2.default.createElement(
        _context.PlotlyFoldContext.Provider,
        { value: this.provideValue() },
        _react2.default.createElement(
          'div',
          { className: 'fold' + classes },
          foldHeader,
          foldContent
        )
      );
    }
  }]);

  return Fold;
}(_react.Component);

Fold.plotly_editor_traits = { foldable: true };

Fold.propTypes = {
  canDelete: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  folded: _propTypes2.default.bool,
  foldInfo: _propTypes2.default.object,
  toggleFold: _propTypes2.default.func,
  hideHeader: _propTypes2.default.bool,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  messageIfEmpty: _propTypes2.default.string,
  name: _propTypes2.default.string
};

Fold.contextTypes = {
  deleteContainer: _propTypes2.default.func
};

Fold.childContextTypes = {
  foldInfo: _propTypes2.default.object
};

var PlotlyFold = function (_Fold) {
  _inherits(PlotlyFold, _Fold);

  function PlotlyFold(props, context) {
    _classCallCheck(this, PlotlyFold);

    var _this2 = _possibleConstructorReturn(this, (PlotlyFold.__proto__ || Object.getPrototypeOf(PlotlyFold)).call(this, props, context));

    _this2.foldVisible = false;
    _this2.determineVisibility(props, context);
    return _this2;
  }

  _createClass(PlotlyFold, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.determineVisibility(nextProps, nextContext);
    }
  }, {
    key: 'determineVisibility',
    value: function determineVisibility(nextProps, nextContext) {
      var _this3 = this;

      this.foldVisible = false;

      _react2.default.Children.forEach(nextProps.children, function (child) {
        if (!child || _this3.foldVisible) {
          return;
        }

        if (child.props.attr) {
          // attr components force fold open if they are visible
          var plotProps = (0, _lib.unpackPlotProps)(child.props, nextContext);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, nextContext, plotProps);
          }

          _this3.foldVisible = _this3.foldVisible || plotProps.isVisible;
          return;
        }

        if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
          // non-attr components force visibility (unless they don't via traits)
          _this3.foldVisible = true;
          return;
        }
      });
    }
  }]);

  return PlotlyFold;
}(Fold);

PlotlyFold.plotly_editor_traits = {
  foldable: true
};

PlotlyFold.contextTypes = Object.assign({
  deleteContainer: _propTypes2.default.func
}, _lib.containerConnectedContextTypes);

exports.default = PlotlyFold;
//# sourceMappingURL=PlotlyFold.js.map
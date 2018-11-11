'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceTypeSelectorButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plotlyIcons = require('plotly-icons');

var _Modal = require('../containers/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _context3 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderActionItems = function renderActionItems(actionItems, item) {
  return actionItems ? actionItems(item).map(function (action, i) {
    return !action.onClick ? null : _react2.default.createElement(
      'a',
      {
        className: 'trace-item__actions__item',
        key: i,
        'aria-label': action.label,
        'data-microtip-position': 'top-left',
        role: 'tooltip',
        onClick: action.onClick,
        target: '_blank'
      },
      action.icon
    );
  }) : null;
};

var Item = function Item(_ref) {
  var item = _ref.item,
      active = _ref.active,
      handleClick = _ref.handleClick,
      actions = _ref.actions,
      showActions = _ref.showActions,
      complex = _ref.complex;
  var label = item.label,
      value = item.value,
      icon = item.icon;

  var SimpleIcon = (0, _lib.renderTraceIcon)(icon ? icon : value);
  var ComplexIcon = (0, _lib.renderTraceIcon)(icon ? icon : value, 'TraceType');

  return _react2.default.createElement(
    'div',
    { className: 'trace-item' + (active ? ' trace-item--active' : ''), onClick: handleClick },
    _react2.default.createElement(
      'div',
      { className: 'trace-item__actions' },
      actions && showActions ? renderActionItems(actions, item) : null
    ),
    _react2.default.createElement(
      'div',
      { className: 'trace-item__image' },
      !complex && _react2.default.createElement(
        'div',
        { className: 'trace-item__image__svg' },
        _react2.default.createElement(SimpleIcon, null)
      ),
      complex && _react2.default.createElement(
        'div',
        { className: 'trace-item__image__wrapper' },
        _react2.default.createElement(ComplexIcon, null)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'trace-item__label' },
      label
    )
  );
};

Item.propTypes = {
  item: _propTypes2.default.object,
  active: _propTypes2.default.bool,
  complex: _propTypes2.default.bool,
  handleClick: _propTypes2.default.func,
  actions: _propTypes2.default.func,
  showActions: _propTypes2.default.bool
};
Item.contextType = _context3.EditorControlsContext;

var TraceTypeSelector = function (_Component) {
  _inherits(TraceTypeSelector, _Component);

  function TraceTypeSelector(props) {
    _classCallCheck(this, TraceTypeSelector);

    var _this = _possibleConstructorReturn(this, (TraceTypeSelector.__proto__ || Object.getPrototypeOf(TraceTypeSelector)).call(this, props));

    _this.selectAndClose = _this.selectAndClose.bind(_this);
    _this.actions = _this.actions.bind(_this);
    _this.renderCategories = _this.renderCategories.bind(_this);
    _this.renderGrid = _this.renderGrid.bind(_this);
    _this.renderSingleBlock = _this.renderSingleBlock.bind(_this);
    return _this;
  }

  _createClass(TraceTypeSelector, [{
    key: 'selectAndClose',
    value: function selectAndClose(value) {
      var _props = this.props,
          updateContainer = _props.updateContainer,
          glByDefault = _props.glByDefault,
          type = _props.fullContainer.type;

      var computedValue = (0, _lib.traceTypeToPlotlyInitFigure)(value);
      if ((type && type.endsWith('gl') || !_constants.TRACES_WITH_GL.includes(type) && glByDefault) && _constants.TRACES_WITH_GL.includes(computedValue.type) && !computedValue.type.endsWith('gl')) {
        computedValue.type += 'gl';
      }
      updateContainer(computedValue);
      this.context.handleClose();
    }
  }, {
    key: 'actions',
    value: function actions(_ref2) {
      var _this2 = this;

      var value = _ref2.value;
      var _context = this.context,
          _ = _context.localize,
          chartHelp = _context.chartHelp;


      var onClick = function onClick(e, func) {
        e.stopPropagation();
        func();
        _this2.context.handleClose();
      };

      return [{
        label: _('Charts like this by Plotly users.'),
        onClick: chartHelp[value] && chartHelp[value].feedQuery && function (e) {
          return onClick(e, function () {
            return window.open('https://plot.ly/feed/?q=' + (chartHelp[value] ? chartHelp[value].feedQuery : value), '_blank');
          });
        },
        icon: _react2.default.createElement(_plotlyIcons.SearchIcon, null)
      }, {
        label: _('View tutorials on this chart type.'),
        onClick: chartHelp[value] && chartHelp[value].helpDoc && function (e) {
          return onClick(e, function () {
            return window.open(chartHelp[value].helpDoc, '_blank');
          });
        },
        icon: _react2.default.createElement(_plotlyIcons.ThumnailViewIcon, null)
      }, {
        label: _('See a basic example.'),
        onClick: chartHelp[value] && chartHelp[value].examplePlot && function (e) {
          return onClick(e, chartHelp[value].examplePlot);
        },
        icon: _react2.default.createElement(_plotlyIcons.GraphIcon, null)
      }];
    }
  }, {
    key: 'renderCategories',
    value: function renderCategories() {
      var _this3 = this;

      var fullValue = this.props.fullValue;
      var _context2 = this.context,
          mapBoxAccess = _context2.mapBoxAccess,
          _ = _context2.localize,
          chartHelp = _context2.chartHelp;
      var _props$traceTypesConf = this.props.traceTypesConfig,
          traces = _props$traceTypesConf.traces,
          categories = _props$traceTypesConf.categories,
          complex = _props$traceTypesConf.complex;


      return categories(_).map(function (category, i) {
        var items = traces(_).filter(function (_ref3) {
          var value = _ref3.category.value;
          return value === category.value;
        }).filter(function (i) {
          return i.value !== 'scattergl' && i.value !== 'scatterpolargl';
        });

        if (!mapBoxAccess) {
          items = items.filter(function (i) {
            return i.value !== 'scattermapbox';
          });
        }

        var MAX_ITEMS = 4;

        var columnClasses = items.length > MAX_ITEMS && !category.maxColumns || category.maxColumns && category.maxColumns > 1 ? 'trace-grid__column trace-grid__column--double' : 'trace-grid__column';

        return _react2.default.createElement(
          'div',
          { className: columnClasses, key: i },
          _react2.default.createElement(
            'div',
            { className: 'trace-grid__column__header' },
            category.label
          ),
          _react2.default.createElement(
            'div',
            { className: 'trace-grid__column__items' },
            items.map(function (item) {
              return _react2.default.createElement(Item, {
                complex: complex,
                key: item.value,
                active: fullValue === item.value,
                item: item,
                actions: _this3.actions,
                handleClick: function handleClick() {
                  return _this3.selectAndClose(item.value);
                },
                showActions: Boolean(chartHelp)
              });
            })
          )
        );
      });
    }
  }, {
    key: 'renderGrid',
    value: function renderGrid() {
      return _react2.default.createElement(
        'div',
        { className: 'trace-grid' },
        this.renderCategories()
      );
    }
  }, {
    key: 'renderSingleBlock',
    value: function renderSingleBlock() {
      var _this4 = this;

      var fullValue = this.props.fullValue;
      var _ = this.context.localize;
      var _props$traceTypesConf2 = this.props.traceTypesConfig,
          traces = _props$traceTypesConf2.traces,
          complex = _props$traceTypesConf2.complex;


      return _react2.default.createElement(
        'div',
        { className: 'trace-grid-single-block' },
        traces(_).map(function (item) {
          return _react2.default.createElement(Item, {
            key: item.value,
            complex: complex,
            active: fullValue === item.value,
            item: item,
            actions: _this4.actions,
            showActions: false,
            handleClick: function handleClick() {
              return _this4.selectAndClose(item.value);
            },
            style: { display: 'inline-block' }
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _ = this.context.localize;
      var categories = this.props.traceTypesConfig.categories;


      return _react2.default.createElement(
        _Modal2.default,
        { title: _('Select Trace Type') },
        categories ? this.renderGrid() : this.renderSingleBlock()
      );
    }
  }]);

  return TraceTypeSelector;
}(_react.Component);

TraceTypeSelector.propTypes = {
  updateContainer: _propTypes2.default.func,
  fullValue: _propTypes2.default.string,
  fullContainer: _propTypes2.default.object,
  glByDefault: _propTypes2.default.bool,
  traceTypesConfig: _propTypes2.default.object
};
TraceTypeSelector.contextTypes = {
  handleClose: _propTypes2.default.func,
  localize: _propTypes2.default.func,
  mapBoxAccess: _propTypes2.default.bool,
  chartHelp: _propTypes2.default.object
};

var TraceTypeSelectorButton = exports.TraceTypeSelectorButton = function (_Component2) {
  _inherits(TraceTypeSelectorButton, _Component2);

  function TraceTypeSelectorButton() {
    _classCallCheck(this, TraceTypeSelectorButton);

    return _possibleConstructorReturn(this, (TraceTypeSelectorButton.__proto__ || Object.getPrototypeOf(TraceTypeSelectorButton)).apply(this, arguments));
  }

  _createClass(TraceTypeSelectorButton, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          handleClick = _props2.handleClick,
          container = _props2.container,
          traces = _props2.traceTypesConfig.traces;
      var _ = this.context.localize;


      var inferredType = (0, _lib.plotlyTraceToCustomTrace)(container);

      var _traces$find = traces(_).find(function (type) {
        return type.value === inferredType;
      }),
          label = _traces$find.label,
          icon = _traces$find.icon,
          value = _traces$find.value;

      var Icon = (0, _lib.renderTraceIcon)(icon ? icon : value);

      return _react2.default.createElement(
        'div',
        { className: 'trace-type-select-button', onClick: handleClick ? handleClick : null },
        _react2.default.createElement(
          'div',
          { className: 'trace-type-select-button__icon' },
          _react2.default.createElement(Icon, null)
        ),
        label
      );
    }
  }]);

  return TraceTypeSelectorButton;
}(_react.Component);

TraceTypeSelectorButton.propTypes = {
  handleClick: _propTypes2.default.func.isRequired,
  container: _propTypes2.default.object,
  traceTypesConfig: _propTypes2.default.object.isRequired
};
TraceTypeSelectorButton.contextType = _context3.EditorControlsContext;

exports.default = TraceTypeSelector;
//# sourceMappingURL=TraceTypeSelector.js.map
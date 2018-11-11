'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../lib/constants');

var _Button = require('../widgets/Button');

var _Button2 = _interopRequireDefault(_Button);

var _plotlyIcons = require('plotly-icons');

var _lib = require('../../lib');

var _2 = require('./..');

var _context3 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedAxisCreator = function (_Component) {
  _inherits(UnconnectedAxisCreator, _Component);

  function UnconnectedAxisCreator() {
    _classCallCheck(this, UnconnectedAxisCreator);

    return _possibleConstructorReturn(this, (UnconnectedAxisCreator.__proto__ || Object.getPrototypeOf(UnconnectedAxisCreator)).apply(this, arguments));
  }

  _createClass(UnconnectedAxisCreator, [{
    key: 'canAddAxis',
    value: function canAddAxis() {
      var _this2 = this;

      var currentAxisId = this.props.fullContainer[this.props.attr];
      var currentTraceIndex = this.props.fullContainer.index;
      return this.context.fullData.some(function (d) {
        return d.index !== currentTraceIndex && d[_this2.props.attr] === currentAxisId;
      });
    }
  }, {
    key: 'addAndUpdateAxis',
    value: function addAndUpdateAxis() {
      var _update;

      var _props = this.props,
          attr = _props.attr,
          updateContainer = _props.updateContainer;
      var _context = this.context,
          onUpdate = _context.onUpdate,
          subplots = _context.fullLayout._subplots;

      var lastAxisNumber = Number(subplots[attr][subplots[attr].length - 1].charAt(1)) || 1;

      updateContainer(_defineProperty({}, attr, attr.charAt(0) + (lastAxisNumber + 1)));

      var side = null;
      if (attr === 'yaxis') {
        side = 'right';
      } else if (attr === 'xaxis') {
        side = 'top';
      }

      onUpdate({
        type: _constants.EDITOR_ACTIONS.UPDATE_LAYOUT,
        payload: {
          update: (_update = {}, _defineProperty(_update, attr + (lastAxisNumber + 1) + '.side', side), _defineProperty(_update, attr + (lastAxisNumber + 1) + '.overlaying', !(attr === 'yaxis' || attr === 'xaxis') ? null : subplots[attr][subplots[attr].length - 1]), _update)
        }
      });
    }
  }, {
    key: 'updateAxis',
    value: function updateAxis(update) {
      var _this3 = this;

      var currentAxisId = this.props.fullContainer[this.props.attr];
      var axesToBeGarbageCollected = [];

      // When we select another axis, make sure no unused axes are left
      if (currentAxisId !== update && !this.context.fullData.some(function (trace) {
        return trace[_this3.props.attr] === currentAxisId && trace.index !== _this3.props.fullContainer.index;
      })) {
        axesToBeGarbageCollected.push(currentAxisId);
      }

      this.context.onUpdate({
        type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
        payload: {
          axesToBeGarbageCollected: axesToBeGarbageCollected,
          update: _defineProperty({}, this.props.attr, update),
          traceIndexes: [this.props.fullContainer.index]
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var icon = _react2.default.createElement(_plotlyIcons.PlusIcon, null);
      var extraComponent = this.canAddAxis() ? _react2.default.createElement(_Button2.default, { variant: 'no-text', icon: icon, onClick: function onClick() {
          return _this4.addAndUpdateAxis();
        } }) : _react2.default.createElement(_Button2.default, { variant: 'no-text--disabled', icon: icon, onClick: function onClick() {} });

      return _react2.default.createElement(_Dropdown2.default, {
        label: this.props.label,
        attr: this.props.attr,
        clearable: false,
        options: this.props.options,
        updatePlot: function updatePlot(u) {
          return _this4.updateAxis(u);
        },
        extraComponent: extraComponent
      });
    }
  }]);

  return UnconnectedAxisCreator;
}(_react.Component);

UnconnectedAxisCreator.propTypes = {
  attr: _propTypes2.default.string,
  label: _propTypes2.default.string,
  options: _propTypes2.default.array,
  container: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object,
  updateContainer: _propTypes2.default.func
};

UnconnectedAxisCreator.contextType = _context3.EditorControlsContext;

var AxisCreator = (0, _lib.connectToContainer)(UnconnectedAxisCreator);

var UnconnectedAxesCreator = function (_Component2) {
  _inherits(UnconnectedAxesCreator, _Component2);

  function UnconnectedAxesCreator() {
    _classCallCheck(this, UnconnectedAxesCreator);

    return _possibleConstructorReturn(this, (UnconnectedAxesCreator.__proto__ || Object.getPrototypeOf(UnconnectedAxesCreator)).apply(this, arguments));
  }

  _createClass(UnconnectedAxesCreator, [{
    key: 'render',
    value: function render() {
      var axisType = (0, _lib.traceTypeToAxisType)(this.props.container.type);
      var isFirstTraceOfAxisType = this.context.data.filter(function (d) {
        return (0, _lib.traceTypeToAxisType)(d.type) === axisType;
      }).length === 1;

      if (isFirstTraceOfAxisType) {
        return null;
      }

      var _context2 = this.context,
          fullLayout = _context2.fullLayout,
          _ = _context2.localize;

      var controls = [];

      function getOptions(axisType) {
        return fullLayout._subplots[axisType].map(function (axisId) {
          return {
            label: (0, _lib.getAxisTitle)(fullLayout[(0, _lib.axisIdToAxisName)(axisId)]),
            value: axisId
          };
        });
      }

      if (axisType === 'cartesian') {
        ['xaxis', 'yaxis'].forEach(function (type, index) {
          controls.push(_react2.default.createElement(AxisCreator, {
            key: index,
            attr: type,
            label: type.charAt(0).toUpperCase() + _(' Axis'),
            options: getOptions(type)
          }));
        });
      }

      return _react2.default.createElement(
        _2.PlotlySection,
        { name: _('Axes to Use') },
        controls,
        _react2.default.createElement(
          _context3.ModalProviderContext.Consumer,
          null,
          function (_ref) {
            var setPanel = _ref.setPanel;
            return _react2.default.createElement(
              _Info2.default,
              null,
              _('You can style and position your axes in the '),
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return setPanel('Structure', 'Subplots');
                  } },
                _('Subplots')
              ),
              _(' panel.')
            );
          }
        )
      );
    }
  }]);

  return UnconnectedAxesCreator;
}(_react.Component);

UnconnectedAxesCreator.propTypes = {
  container: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object
};

UnconnectedAxesCreator.contextType = _context3.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(UnconnectedAxesCreator, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var data = context.data;
    var fullContainer = plotProps.fullContainer;


    plotProps.isVisible = data.length > 1 && data[fullContainer.index] && (0, _lib.traceTypeToAxisType)(data[fullContainer.index].type) === 'cartesian';
  }
});
//# sourceMappingURL=AxesCreator.js.map
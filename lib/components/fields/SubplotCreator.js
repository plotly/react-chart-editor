'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../../lib/constants');

var _Button = require('../widgets/Button');

var _Button2 = _interopRequireDefault(_Button);

var _plotlyIcons = require('plotly-icons');

var _lib = require('../../lib');

var _2 = require('./..');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedSingleSubplotCreator = function (_Component) {
  _inherits(UnconnectedSingleSubplotCreator, _Component);

  function UnconnectedSingleSubplotCreator() {
    _classCallCheck(this, UnconnectedSingleSubplotCreator);

    return _possibleConstructorReturn(this, (UnconnectedSingleSubplotCreator.__proto__ || Object.getPrototypeOf(UnconnectedSingleSubplotCreator)).apply(this, arguments));
  }

  _createClass(UnconnectedSingleSubplotCreator, [{
    key: 'canAddSubplot',
    value: function canAddSubplot() {
      var _this2 = this;

      var currentAxisId = this.props.fullContainer[this.props.attr];
      var currentTraceIndex = this.props.fullContainer.index;
      return this.context.fullData.some(function (d) {
        return d.index !== currentTraceIndex && d[_this2.props.attr] === currentAxisId;
      });
    }
  }, {
    key: 'addAndUpdateSubplot',
    value: function addAndUpdateSubplot() {
      var _props = this.props,
          attr = _props.attr,
          layoutAttr = _props.layoutAttr,
          updateContainer = _props.updateContainer;
      var subplots = this.context.fullLayout._subplots;

      var lastSubplotNumber = Number(subplots[layoutAttr][subplots[layoutAttr].length - 1].split(_constants.SUBPLOT_TO_ATTR[layoutAttr].layout)[1]) || 1;

      updateContainer(_defineProperty({}, attr, _constants.SUBPLOT_TO_ATTR[layoutAttr].layout + (lastSubplotNumber + 1)));
    }
  }, {
    key: 'updateSubplot',
    value: function updateSubplot(update) {
      var _this3 = this;

      var currentSubplotId = this.props.fullContainer[_constants.SUBPLOT_TO_ATTR[this.props.layoutAttr].data];
      var subplotToBeGarbageCollected = null;

      // When we select another subplot, make sure no unused axes are left
      if (currentSubplotId !== update && !this.context.fullData.some(function (trace) {
        return trace[_constants.SUBPLOT_TO_ATTR[_this3.props.layoutAttr].data] === currentSubplotId && trace.index !== _this3.props.fullContainer.index;
      })) {
        subplotToBeGarbageCollected = currentSubplotId;
      }

      this.context.onUpdate({
        type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
        payload: {
          subplotToBeGarbageCollected: subplotToBeGarbageCollected,
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
      var extraComponent = this.canAddSubplot() ? _react2.default.createElement(_Button2.default, { variant: 'no-text', icon: icon, onClick: function onClick() {
          return _this4.addAndUpdateSubplot();
        } }) : _react2.default.createElement(_Button2.default, { variant: 'no-text--disabled', icon: icon, onClick: function onClick() {} });

      return _react2.default.createElement(_Dropdown2.default, {
        label: this.props.label,
        attr: this.props.attr,
        clearable: false,
        options: this.props.options,
        updatePlot: function updatePlot(u) {
          return _this4.updateSubplot(u);
        },
        extraComponent: extraComponent
      });
    }
  }]);

  return UnconnectedSingleSubplotCreator;
}(_react.Component);

UnconnectedSingleSubplotCreator.propTypes = {
  attr: _propTypes2.default.string,
  layoutAttr: _propTypes2.default.string,
  label: _propTypes2.default.string,
  options: _propTypes2.default.array,
  container: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object,
  updateContainer: _propTypes2.default.func
};

UnconnectedSingleSubplotCreator.contextType = _context2.EditorControlsContext;

var SingleSubplotCreator = (0, _lib.connectToContainer)(UnconnectedSingleSubplotCreator);

var UnconnectedSubplotCreator = function (_Component2) {
  _inherits(UnconnectedSubplotCreator, _Component2);

  function UnconnectedSubplotCreator() {
    _classCallCheck(this, UnconnectedSubplotCreator);

    return _possibleConstructorReturn(this, (UnconnectedSubplotCreator.__proto__ || Object.getPrototypeOf(UnconnectedSubplotCreator)).apply(this, arguments));
  }

  _createClass(UnconnectedSubplotCreator, [{
    key: 'render',
    value: function render() {
      var subplotType = (0, _lib.traceTypeToAxisType)(this.props.container.type);
      if (!['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(function (t) {
        return t === subplotType;
      })) {
        return null;
      }

      var isFirstTraceOfAxisType = this.context.data.filter(function (d) {
        return (0, _lib.traceTypeToAxisType)(d.type) === subplotType;
      }).length === 1;
      if (isFirstTraceOfAxisType) {
        return null;
      }

      var _context = this.context,
          fullLayout = _context.fullLayout,
          _ = _context.localize;


      function getOptions(subplotType) {
        return fullLayout._subplots[subplotType].map(function (subplotId) {
          return {
            label: (0, _lib.getSubplotTitle)(subplotId, subplotType, _),
            value: subplotId
          };
        });
      }

      return _react2.default.createElement(
        _2.PlotlySection,
        { name: _('Subplots to Use') },
        _react2.default.createElement(SingleSubplotCreator, {
          attr: _constants.SUBPLOT_TO_ATTR[subplotType].data,
          layoutAttr: subplotType,
          label: _constants.SUBPLOT_TO_ATTR[subplotType].layout,
          options: getOptions(subplotType)
        }),
        _react2.default.createElement(
          _context2.ModalProviderContext,
          null,
          function (_ref) {
            var setPanel = _ref.setPanel;
            return _react2.default.createElement(
              _Info2.default,
              null,
              _('You can style and position your subplots in the '),
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

  return UnconnectedSubplotCreator;
}(_react.Component);

UnconnectedSubplotCreator.propTypes = {
  container: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object
};

UnconnectedSubplotCreator.contextType = _context2.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(UnconnectedSubplotCreator, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var data = context.data;
    var fullContainer = plotProps.fullContainer;


    plotProps.isVisible = data.length > 1 && data[fullContainer.index] && ['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(function (t) {
      return t === (0, _lib.traceTypeToAxisType)(data[fullContainer.index].type);
    });
  }
});
//# sourceMappingURL=SubplotCreator.js.map
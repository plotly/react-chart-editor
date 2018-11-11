'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../../lib');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Dropdown = require('./Dropdown');

var _DataSelector = require('./DataSelector');

var _DataSelector2 = _interopRequireDefault(_DataSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationmodeVisible = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (!plotProps.fullValue) {
      plotProps.isVisible = true;
      plotProps.fullValue = plotProps.container.locationmode;
      return;
    }
  }
});

var UnconnectedLocation = function (_Component) {
  _inherits(UnconnectedLocation, _Component);

  function UnconnectedLocation() {
    _classCallCheck(this, UnconnectedLocation);

    return _possibleConstructorReturn(this, (UnconnectedLocation.__proto__ || Object.getPrototypeOf(UnconnectedLocation)).apply(this, arguments));
  }

  _createClass(UnconnectedLocation, [{
    key: 'render',
    value: function render() {
      var _ = this.context.localize;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_DataSelector2.default, { label: _('Locations'), attr: 'locations' }),
        _react2.default.createElement(LocationmodeVisible, {
          label: _('Location Format'),
          attr: 'locationmode',
          clearable: false,
          options: [{ label: _('Country Names'), value: 'country names' }, { label: _('Country Abbreviations (ISO-3)'), value: 'ISO-3' }, {
            label: _('USA State Abbreviations (e.g. NY)'),
            value: 'USA-states'
          }]
        })
      );
    }
  }]);

  return UnconnectedLocation;
}(_react.Component);

UnconnectedLocation.propTypes = _extends({
  attr: _propTypes2.default.string
}, _Field2.default.propTypes);

UnconnectedLocation.contextTypes = {
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func
};

var Location = (0, _lib.connectToContainer)(UnconnectedLocation);

var UnconnectedLocationSelector = function (_Component2) {
  _inherits(UnconnectedLocationSelector, _Component2);

  function UnconnectedLocationSelector(props, context) {
    _classCallCheck(this, UnconnectedLocationSelector);

    var _this2 = _possibleConstructorReturn(this, (UnconnectedLocationSelector.__proto__ || Object.getPrototypeOf(UnconnectedLocationSelector)).call(this, props, context));

    _this2.state = {
      mode: props.container.locations ? 'location' : 'latlon'
    };

    _this2.setMode = _this2.setMode.bind(_this2);
    return _this2;
  }

  _createClass(UnconnectedLocationSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        mode: this.props.container.locations ? 'location' : 'latlon'
      });
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.setState({ mode: mode });
      this.props.updateContainer(mode === 'latlon' ? {
        locations: null,
        locationmode: null,
        locationssrc: null,
        locationmodesrc: null
      } : { lat: null, lon: null, latsrc: null, lonsrc: null });
    }
  }, {
    key: 'render',
    value: function render() {
      var mode = this.state.mode;
      var _context = this.context,
          _ = _context.localize,
          type = _context.container.type;


      return type === 'scattergeo' ? _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { attr: this.props.attr }),
          _react2.default.createElement(_Radio2.default, {
            options: [{ value: 'latlon', label: _('Lat/Lon') }, { value: 'location', label: _('Location') }],
            fullValue: mode,
            updatePlot: this.setMode,
            attr: this.props.attr
          })
        ),
        mode === 'latlon' ? _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(_DataSelector2.default, { label: _('Latitude'), attr: 'lat' }),
          _react2.default.createElement(_DataSelector2.default, { label: _('Longitude'), attr: 'lon' })
        ) : _react2.default.createElement(Location, { attr: 'type' })
      ) : type === 'choropleth' ? _react2.default.createElement(Location, { attr: 'type' }) : _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_DataSelector2.default, { label: _('Latitude'), attr: 'lat' }),
        _react2.default.createElement(_DataSelector2.default, { label: _('Longitude'), attr: 'lon' })
      );
    }
  }]);

  return UnconnectedLocationSelector;
}(_react.Component);

UnconnectedLocationSelector.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func,
  attr: _propTypes2.default.string
}, _Field2.default.propTypes);

UnconnectedLocationSelector.contextTypes = {
  container: _propTypes2.default.object,
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func
};

exports.default = (0, _lib.connectToContainer)(UnconnectedLocationSelector);
//# sourceMappingURL=LocationSelector.js.map
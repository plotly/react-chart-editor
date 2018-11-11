'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = exports.Section = function (_Component) {
  _inherits(Section, _Component);

  function Section() {
    _classCallCheck(this, Section);

    var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this));

    _this.sectionVisible = true;
    return _this;
  }

  _createClass(Section, [{
    key: 'render',
    value: function render() {
      if (!this.sectionVisible) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'section' },
        this.props.name ? _react2.default.createElement(
          'div',
          { className: 'section__heading' },
          _react2.default.createElement(
            'div',
            { className: 'section__heading__text' },
            this.props.name
          )
        ) : null,
        this.props.children
      );
    }
  }]);

  return Section;
}(_react.Component);

Section.plotly_editor_traits = { no_visibility_forcing: false };
Section.propTypes = {
  children: _propTypes2.default.node,
  name: _propTypes2.default.string,
  attr: _propTypes2.default.string
};

var PlotlySection = function (_Section) {
  _inherits(PlotlySection, _Section);

  function PlotlySection(props, context) {
    _classCallCheck(this, PlotlySection);

    var _this2 = _possibleConstructorReturn(this, (PlotlySection.__proto__ || Object.getPrototypeOf(PlotlySection)).call(this, props, context));

    _this2.determineVisibility(props, context);
    return _this2;
  }

  _createClass(PlotlySection, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.determineVisibility(nextProps, nextContext);
    }
  }, {
    key: 'determineVisibility',
    value: function determineVisibility(nextProps, nextContext) {
      var _this3 = this;

      var _unpackPlotProps = (0, _lib.unpackPlotProps)(nextProps, nextContext),
          isVisible = _unpackPlotProps.isVisible;

      this.sectionVisible = Boolean(isVisible);

      _react2.default.Children.forEach(nextProps.children, function (child) {
        if (!child || _this3.sectionVisible) {
          return;
        }

        if (child.props.attr) {
          var plotProps = (0, _lib.unpackPlotProps)(child.props, nextContext);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, nextContext, plotProps);
          }
          _this3.sectionVisible = _this3.sectionVisible || plotProps.isVisible;
          return;
        }

        if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
          // non-attr components force visibility (unless they don't via traits)
          _this3.sectionVisible = true;
          return;
        }
      });
    }
  }]);

  return PlotlySection;
}(Section);

exports.default = PlotlySection;


PlotlySection.plotly_editor_traits = { no_visibility_forcing: true };
PlotlySection.contextTypes = _lib.containerConnectedContextTypes;
//# sourceMappingURL=PlotlySection.js.map
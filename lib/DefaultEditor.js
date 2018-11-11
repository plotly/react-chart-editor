'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('./components');

var _default_panels = require('./default_panels');

var _StyleColorbarsPanel = require('./default_panels/StyleColorbarsPanel');

var _Logo = require('./components/widgets/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _constants = require('./lib/constants');

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultEditor = function (_Component) {
  _inherits(DefaultEditor, _Component);

  function DefaultEditor(props, context) {
    _classCallCheck(this, DefaultEditor);

    var _this = _possibleConstructorReturn(this, (DefaultEditor.__proto__ || Object.getPrototypeOf(DefaultEditor)).call(this, props, context));

    _this.hasTransforms = _this.hasTransforms.bind(_this);
    _this.hasAxes = _this.hasAxes.bind(_this);
    _this.hasMenus = _this.hasMenus.bind(_this);
    _this.hasSliders = _this.hasSliders.bind(_this);
    _this.hasColorbars = _this.hasColorbars.bind(_this);
    return _this;
  }

  _createClass(DefaultEditor, [{
    key: 'hasTransforms',
    value: function hasTransforms() {
      return this.context.fullData.some(function (d) {
        return _constants.TRANSFORMABLE_TRACES.includes(d.type);
      });
    }
  }, {
    key: 'hasAxes',
    value: function hasAxes() {
      var _this2 = this;

      return Object.keys(this.context.fullLayout._subplots).filter(function (type) {
        return !['cartesian', 'mapbox'].includes(type) && _this2.context.fullLayout._subplots[type].length > 0;
      }).length > 0;
    }
  }, {
    key: 'hasMenus',
    value: function hasMenus() {
      var _context$fullLayout$u = this.context.fullLayout.updatemenus,
          updatemenus = _context$fullLayout$u === undefined ? [] : _context$fullLayout$u;


      return updatemenus.length > 0;
    }
  }, {
    key: 'hasSliders',
    value: function hasSliders() {
      var _context$layout$slide = this.context.layout.sliders,
          sliders = _context$layout$slide === undefined ? [] : _context$layout$slide;


      return sliders.length > 0;
    }
  }, {
    key: 'hasColorbars',
    value: function hasColorbars() {
      return this.context.fullData.some(function (d) {
        return (0, _StyleColorbarsPanel.traceHasColorbar)({}, d);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _ = this.context.localize;
      var logo = this.props.logoSrc && _react2.default.createElement(_Logo2.default, { src: this.props.logoSrc });

      return _react2.default.createElement(
        _components.PanelMenuWrapper,
        { menuPanelOrder: this.props.menuPanelOrder },
        logo ? logo : null,
        _react2.default.createElement(_default_panels.GraphCreatePanel, { group: _('Structure'), name: _('Traces') }),
        _react2.default.createElement(_default_panels.GraphSubplotsPanel, { group: _('Structure'), name: _('Subplots') }),
        this.hasTransforms() && _react2.default.createElement(_default_panels.GraphTransformsPanel, { group: _('Structure'), name: _('Transforms') }),
        _react2.default.createElement(_default_panels.StyleLayoutPanel, { group: _('Style'), name: _('General') }),
        _react2.default.createElement(_default_panels.StyleTracesPanel, { group: _('Style'), name: _('Traces') }),
        this.hasAxes() && _react2.default.createElement(_default_panels.StyleAxesPanel, { group: _('Style'), name: _('Axes') }),
        _react2.default.createElement(_default_panels.StyleLegendPanel, { group: _('Style'), name: _('Legend') }),
        this.hasColorbars() && _react2.default.createElement(_default_panels.StyleColorbarsPanel, { group: _('Style'), name: _('Color Bars') }),
        _react2.default.createElement(_default_panels.StyleNotesPanel, { group: _('Style'), name: _('Annotation') }),
        _react2.default.createElement(_default_panels.StyleShapesPanel, { group: _('Style'), name: _('Shapes') }),
        _react2.default.createElement(_default_panels.StyleImagesPanel, { group: _('Style'), name: _('Images') }),
        this.hasSliders() && _react2.default.createElement(_default_panels.StyleSlidersPanel, { group: _('Style'), name: _('Sliders') }),
        this.hasMenus() && _react2.default.createElement(_default_panels.StyleUpdateMenusPanel, { group: _('Style'), name: _('Menus') }),
        this.props.children ? this.props.children : null
      );
    }
  }]);

  return DefaultEditor;
}(_react.Component);

DefaultEditor.propTypes = {
  children: _propTypes2.default.node,
  logoSrc: _propTypes2.default.string,
  menuPanelOrder: _propTypes2.default.array
};

DefaultEditor.contextType = _context.EditorControlsContext;

exports.default = DefaultEditor;
//# sourceMappingURL=DefaultEditor.js.map
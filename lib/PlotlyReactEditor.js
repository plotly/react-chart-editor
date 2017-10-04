"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("./lib/constants");

var _constants2 = _interopRequireDefault(_constants);

var _common = require("./lib/common");

var _i18n = require("./i18n");

var _i18n2 = _interopRequireDefault(_i18n);

var _components = require("./components");

var _components2 = _interopRequireDefault(_components);

var _DefaultEditor = require("./DefaultEditor");

var _DefaultEditor2 = _interopRequireDefault(_DefaultEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyReactEditor = function (_Component) {
  _inherits(PlotlyReactEditor, _Component);

  function PlotlyReactEditor() {
    _classCallCheck(this, PlotlyReactEditor);

    return _possibleConstructorReturn(this, (PlotlyReactEditor.__proto__ || Object.getPrototypeOf(PlotlyReactEditor)).apply(this, arguments));
  }

  _createClass(PlotlyReactEditor, [{
    key: "getChildContext",
    value: function getChildContext() {
      var gd = this.props.graphDiv || {};
      var dataSourceNames = Object.keys(this.props.dataSources || {});
      return {
        locale: this.props.locale,
        dictionaries: _i18n2.default,
        data: gd.data,
        fullData: gd._fullData,
        layout: gd.layout,
        fullLayout: gd._fullLayout,
        handleUpdate: this.updateProp.bind(this),
        dataSources: this.props.dataSources,
        dataSourceNames: dataSourceNames
      };
    }
  }, {
    key: "updateProp",
    value: function updateProp(attr, value) {
      this.props.onUpdate && this.props.onUpdate(this.props.graphDiv, attr, value);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: (0, _common.bem)() },
        this.props.graphDiv && (this.props.children ? this.props.children : _react2.default.createElement(_DefaultEditor2.default, null))
      );
    }
  }]);

  return PlotlyReactEditor;
}(_react.Component);

PlotlyReactEditor.defaultProps = {
  locale: "en"
};

PlotlyReactEditor.childContextTypes = {
  locale: _propTypes2.default.string,
  dictionaries: _propTypes2.default.object,
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array,
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  handleUpdate: _propTypes2.default.func
};

Object.assign(PlotlyReactEditor, _components2.default);

exports.default = PlotlyReactEditor;
module.exports = exports["default"];
//# sourceMappingURL=PlotlyReactEditor.js.map
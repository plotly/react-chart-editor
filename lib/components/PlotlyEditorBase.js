"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Base = require("./Base");

var _Base2 = _interopRequireDefault(_Base);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyEditorBase = function (_Component) {
  _inherits(PlotlyEditorBase, _Component);

  function PlotlyEditorBase(props, context) {
    _classCallCheck(this, PlotlyEditorBase);

    var _this = _possibleConstructorReturn(this, (PlotlyEditorBase.__proto__ || Object.getPrototypeOf(PlotlyEditorBase)).call(this, props, context));

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;
    return _this;
  }

  return PlotlyEditorBase;
}(_react.Component);

// It's not enough for Base to specify which context it accepts. This component
// must manually pull Base's defined context types into its own.


PlotlyEditorBase.contextTypes = Object.assign({
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array
}, _Base2.default.contextTypes);

exports.default = PlotlyEditorBase;
module.exports = exports["default"];
//# sourceMappingURL=PlotlyEditorBase.js.map
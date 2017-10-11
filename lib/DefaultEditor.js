"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require("./lib");

var _TraceAccordion = require("./components/TraceAccordion");

var _TraceAccordion2 = _interopRequireDefault(_TraceAccordion);

var _Panel = require("./components/Panel");

var _Panel2 = _interopRequireDefault(_Panel);

var _Select = require("./components/Select");

var _Select2 = _interopRequireDefault(_Select);

var _Numeric = require("./components/Numeric");

var _Numeric2 = _interopRequireDefault(_Numeric);

var _Color = require("./components/Color");

var _Color2 = _interopRequireDefault(_Color);

var _Section = require("./components/Section");

var _Section2 = _interopRequireDefault(_Section);

var _Flaglist = require("./components/Flaglist");

var _Flaglist2 = _interopRequireDefault(_Flaglist);

var _Radio = require("./components/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _PanelMenuWrapper = require("./components/PanelMenuWrapper");

var _PanelMenuWrapper2 = _interopRequireDefault(_PanelMenuWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These are the built-in panels for the editor. If the editor has children specified,
// those panels will override these.
var DefaultEditor = function (_Component) {
  _inherits(DefaultEditor, _Component);

  function DefaultEditor(props, context) {
    _classCallCheck(this, DefaultEditor);

    var _this = _possibleConstructorReturn(this, (DefaultEditor.__proto__ || Object.getPrototypeOf(DefaultEditor)).call(this, props, context));

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;
    return _this;
  }

  _createClass(DefaultEditor, [{
    key: "render",
    value: function render() {
      var _ = this.props.localize;

      return _react2.default.createElement(
        _PanelMenuWrapper2.default,
        null,
        _react2.default.createElement(
          _Panel2.default,
          { section: "Graph", name: "Create" },
          _react2.default.createElement(
            _TraceAccordion2.default,
            null,
            _react2.default.createElement(
              _Section2.default,
              { heading: _("Trace") },
              _react2.default.createElement(_Numeric2.default, {
                label: _("Opacity"),
                min: 0,
                max: 1,
                step: 0.1,
                attr: "opacity"
              })
            )
          )
        ),
        _react2.default.createElement(
          _Panel2.default,
          { section: "Style", name: "Traces" },
          _react2.default.createElement(_TraceAccordion2.default, null)
        )
      );
    }
  }]);

  return DefaultEditor;
}(_react.Component);

DefaultEditor.contextTypes = {
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array
};

exports.default = (0, _lib.localize)(DefaultEditor);
module.exports = exports["default"];
//# sourceMappingURL=DefaultEditor.js.map
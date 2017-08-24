"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _panel = require("./components/panel");

var _panel2 = _interopRequireDefault(_panel);

var _editModeMenu = require("./components/edit-mode-menu.js");

var _editModeMenu2 = _interopRequireDefault(_editModeMenu);

var _select = require("./components/select");

var _select2 = _interopRequireDefault(_select);

var _panels = require("./components/panels");

var _panels2 = _interopRequireDefault(_panels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyReactEditor = function (_Component) {
  _inherits(PlotlyReactEditor, _Component);

  function PlotlyReactEditor(props) {
    _classCallCheck(this, PlotlyReactEditor);

    var _this = _possibleConstructorReturn(this, (PlotlyReactEditor.__proto__ || Object.getPrototypeOf(PlotlyReactEditor)).call(this, props));

    _this.state = {
      section: "Graph-Create"
    };

    _this.setSection = _this.setSection.bind(_this);
    return _this;
  }

  _createClass(PlotlyReactEditor, [{
    key: "setSection",
    value: function setSection(section) {
      this.setState({ section: section });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var gd = this.props.graphDiv || {};
      var dataSourceNames = Object.keys(this.props.dataSources || {});
      console.log("dataSourceNames:", dataSourceNames);
      return {
        data: gd.data,
        fullData: gd._fullData,
        layout: gd.layout,
        fullLayout: gd._fullLayout,
        handleUpdate: this.updateProp.bind(this),
        section: this.state.section.toLowerCase(),
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
        { className: "plotlyjsReactEditor" },
        _react2.default.createElement(_editModeMenu2.default, {
          currentSection: this.state.section,
          onChangeSection: this.setSection
        }),
        this.props.graphDiv && _react2.default.createElement(_panels2.default, null)
      );
    }
  }]);

  return PlotlyReactEditor;
}(_react.Component);

exports.default = PlotlyReactEditor;


PlotlyReactEditor.childContextTypes = {
  dataSources: _propTypes2.default.object,
  dataSourceNames: _propTypes2.default.array,
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  handleUpdate: _propTypes2.default.func,
  section: _propTypes2.default.string
};
module.exports = exports["default"];
//# sourceMappingURL=plotly.js-react-editor.js.map
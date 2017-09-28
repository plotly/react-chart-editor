"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nested_property = require("plotly.js/src/lib/nested_property");

var _nested_property2 = _interopRequireDefault(_nested_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SRC_ATTR_PATTERN = /src$/;

var Field = function (_Component) {
  _inherits(Field, _Component);

  function Field(props, context) {
    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _this._index = context.traceIndex;
    _this._data = context.data[_this._index];
    _this._fullData = context.fullData[_this._index];
    _this._property = (0, _nested_property2.default)(_this._data, _this.props.attr);
    _this._fullProperty = (0, _nested_property2.default)(_this._fullData, _this.props.attr);
    _this.updatePlot = _this.updatePlot.bind(_this);
    _this._contextUpdate = context.handleUpdate;
    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;

    _this.state = {
      value: _this.fullValue
    };
    return _this;
  }

  _createClass(Field, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this._index = nextContext.traceIndex;
      this._contextUpdate = nextContext.handleUpdate;

      if (nextContext.data) {
        this._data = nextContext.data[this._index];
      } else {
        this._data = [];
      }

      if (nextContext.fullData) {
        this._fullData = nextContext.fullData[this._index];
      } else {
        this._fullData = [];
      }
    }
  }, {
    key: "updatePlot",
    value: function updatePlot(value) {
      console.log('value:', value);
      this.value = value;
      this.setState({ value: value });
      this._contextUpdate && this._contextUpdate(this.props.attr, this.value);
    }
  }, {
    key: "value",
    get: function get() {
      return this._property.get();
    },
    set: function set(newValue) {
      this._property.set(newValue);

      this._contextUpdate(gd, this._data, this.props.attr, newValue);
    }
  }, {
    key: "fullValue",
    get: function get() {
      if (SRC_ATTR_PATTERN.test(this.props.attr)) {
        return this._property.get();
      } else {
        return this._fullProperty.get();
      }
    }
  }]);

  return Field;
}(_react.Component);

Field.contextTypes = {
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  handleUpdate: _propTypes2.default.func,
  traceIndex: _propTypes2.default.number
};

exports.default = Field;
module.exports = exports["default"];
//# sourceMappingURL=Field.js.map
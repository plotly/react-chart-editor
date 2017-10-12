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

var FieldBase = function (_Component) {
  _inherits(FieldBase, _Component);

  function FieldBase(props, context) {
    _classCallCheck(this, FieldBase);

    var _this = _possibleConstructorReturn(this, (FieldBase.__proto__ || Object.getPrototypeOf(FieldBase)).call(this, props));

    _this.setLocals(props, context);

    _this.dataSources = context.dataSources;
    _this.dataSourceNames = context.dataSourceNames;

    _this.updatePlot = _this.updatePlot.bind(_this);
    return _this;
  }

  _createClass(FieldBase, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState, nextContext) {
      this.setLocals(nextProps, nextContext);
    }
  }, {
    key: "setLocals",
    value: function setLocals(props, context) {
      props = props || this.props;

      this._index = context.traceIndex;

      // gd, data, fullData:
      this._gd = context.graphDiv;
      this._data = context.data[this._index] || [];
      this._fullData = context.fullData[this._index] || [];

      // Property accessors:
      this._fullProperty = (0, _nested_property2.default)(this._fullData, props.attr);
      this._property = (0, _nested_property2.default)(this._data, props.attr);

      this.onUpdate = context.onUpdate;
    }
  }, {
    key: "updatePlot",
    value: function updatePlot(value) {
      var update = {};
      update[this.props.attr] = [value];
      this.onUpdate && this.onUpdate(update, [this._index]);
    }
  }, {
    key: "render",


    //set value(newValue) {
    //this._property.set(newValue);
    //this.onUpdate(this._gd, this._data, this.props.attr, newValue);
    //}

    value: function render() {
      var full = this.fullValue;
      if (full !== undefined && full !== null || this.props.show) {
        return this.renderField();
      } else {
        return _react2.default.createElement("div", null);
      }
    }
  }, {
    key: "value",
    get: function get() {
      return this._property.get();
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

  return FieldBase;
}(_react.Component);

FieldBase.contextTypes = {
  graphDiv: _propTypes2.default.any,
  data: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  layout: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func,
  traceIndex: _propTypes2.default.number
};

FieldBase.defaultProps = {
  show: false
};

exports.default = FieldBase;
module.exports = exports["default"];
//# sourceMappingURL=FieldBase.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hint = function (_Component) {
  _inherits(Hint, _Component);

  function Hint() {
    _classCallCheck(this, Hint);

    var _this = _possibleConstructorReturn(this, (Hint.__proto__ || Object.getPrototypeOf(Hint)).call(this));

    _this.delay = _this.delay.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.shown = false;
    return _this;
  }

  _createClass(Hint, [{
    key: "delay",
    value: function delay() {
      var _this2 = this;

      if (this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
      }
      this.timeoutHandle = setTimeout(function () {
        _this2.timeoutHandle = null;
        _this2.show = true;
        _this2.forceUpdate();
      }, this.props.delayMilliseconds);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
      }
      this.show = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          position = _props.position,
          hint = _props.hint,
          error = _props.error,
          children = _props.children,
          delayMilliseconds = _props.delayMilliseconds;

      var isShowing = Boolean(hint) && (delayMilliseconds ? this.show : true);

      /*
           * When a hint is triggered we reset the timer.
           * Only when a user pauses do we want to show a hint.
           */
      this.reset();

      // If we are using a delay and want to show a hint but its not yet shown
      if (!isShowing && Boolean(hint)) {
        this.delay();
      }

      // If there is no hint or a delayed hint is not being shown
      if (!isShowing) {
        return _react2.default.createElement(
          "div",
          { className: this.props.className },
          children
        );
      }

      // Now we are either rendering a delayed Hint or a hint with no delay.
      var className = (0, _classnames2.default)([this.props.className, "hint--always", "hint--" + position], {
        "hint--error": Boolean(hint) && error
      });

      return _react2.default.createElement(
        "div",
        { className: className, "data-hint": hint },
        children
      );
    }
  }]);

  return Hint;
}(_react.Component);

exports.default = Hint;


Hint.propTypes = {
  error: _propTypes2.default.bool,
  hint: _propTypes2.default.string,
  className: _propTypes2.default.string,
  delayMilliseconds: _propTypes2.default.number,
  position: _propTypes2.default.oneOf(["bottom-right", "bottom", "bottom-left", "right", "left", "top-right", "left", "top-right", "top", "top-left"]),
  children: _propTypes2.default.node
};

Hint.defaultProps = {
  position: "left"
};
module.exports = exports["default"];
//# sourceMappingURL=Hint.js.map
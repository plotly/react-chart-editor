"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinny = function (_Component) {
  _inherits(Spinny, _Component);

  function Spinny() {
    _classCallCheck(this, Spinny);

    return _possibleConstructorReturn(this, (Spinny.__proto__ || Object.getPrototypeOf(Spinny)).apply(this, arguments));
  }

  _createClass(Spinny, [{
    key: "renderText",

    /*
     * Basic Spinner. Has a few size options: 'large spinny', 'small spinny', 'tiny spinny', 'tiniest spinny', 'spinny'
     * Defaults to 'spinny' -> 12 px
     * Can also pass in text to display
     */
    value: function renderText() {
      if (!this.props.text) return null;else return _react2.default.createElement(
        "span",
        { ref: "textIndicator" },
        this.props.text
      );
    }
  }, {
    key: "render",
    value: function render() {
      var spinnyClass = (0, _classnames2.default)("spinny", this.props.size);

      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement("div", { ref: "loadingIndicator", className: spinnyClass }),
        this.renderText()
      );
    }
  }]);

  return Spinny;
}(_react.Component);

Spinny.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string
};

module.exports = Spinny;
//# sourceMappingURL=Spinny.js.map
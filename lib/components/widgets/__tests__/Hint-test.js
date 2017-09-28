"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hint = require("../Hint");

var _Hint2 = _interopRequireDefault(_Hint);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

jest.useFakeTimers();

var HINT_DELAY = 500;

var HintWrapper = function (_Component) {
  _inherits(HintWrapper, _Component);

  function HintWrapper() {
    _classCallCheck(this, HintWrapper);

    var _this = _possibleConstructorReturn(this, (HintWrapper.__proto__ || Object.getPrototypeOf(HintWrapper)).call(this));

    _this.state = { hint: "" };
    return _this;
  }

  _createClass(HintWrapper, [{
    key: "setHint",
    value: function setHint(hint) {
      this.setState({ hint: hint });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_Hint2.default, { hint: this.state.hint, delayMilliseconds: HINT_DELAY });
    }
  }]);

  return HintWrapper;
}(_react.Component);

describe("<Hint />", function () {
  it("delays hint", function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(HintWrapper, null));

    // the hint is blank so we expect no hint to be shown
    expect(wrapper.find(_Hint2.default).length).toBe(1);
    expect(wrapper.find(".hint--always").length).toBe(0);

    wrapper.instance().setHint("hodor");

    // the hint has a delay so we expect the hint to still not be shown
    expect(wrapper.find(".hint--always").length).toBe(0);

    jest.runAllTimers();

    // now it will have run the hint and will show the hint
    expect(wrapper.find(".hint--always").length).toBe(1);

    // rerendering the hint will result in no hint until the timer once again fires
    wrapper.instance().setHint("modor");

    expect(wrapper.find(".hint--always").length).toBe(0);
    jest.runAllTimers();

    expect(wrapper.find(".hint--always").length).toBe(1);
  });
});
//# sourceMappingURL=Hint-test.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * A DecoratorComponent is used by `draft-js` to render rich content
 *  beyond inline styles. This Decorator renders LINK entities.
 *
 * See
 * https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#decorator-components
 */

var LinkDecorator = function LinkDecorator(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData(),
      url = _Entity$get$getData.url;

  return _react2.default.createElement(
    "a",
    { href: url, style: props.style },
    props.children
  );
};

LinkDecorator.propTypes = {
  entityKey: _react.PropTypes.string.isRequired,
  style: _react.PropTypes.object.isRequired,
  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.element]).isRequired
};

exports.default = LinkDecorator;
module.exports = exports["default"];
//# sourceMappingURL=LinkDecorator.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * A DecoratorComponent is used by `draft-js` to render rich content
 *  beyond inline styles. This Decorator renders LINK entities.
 *
 * See
 * https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#decorator-components
 */

var LinkDecorator = function LinkDecorator(props) {
  return _react2.default.createElement(
    'a',
    { href: '#', style: props.style },
    props.children
  );
};

LinkDecorator.propTypes = {
  style: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element]).isRequired
};

exports.default = LinkDecorator;
//# sourceMappingURL=LinkDecorator.js.map
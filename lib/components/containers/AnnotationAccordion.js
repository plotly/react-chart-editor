'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _derived = require('./derived');

var _PanelEmpty = require('./PanelEmpty');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationFold = (0, _lib.connectAnnotationToLayout)(_PlotlyFold2.default);

var AnnotationAccordion = function (_Component) {
  _inherits(AnnotationAccordion, _Component);

  function AnnotationAccordion() {
    _classCallCheck(this, AnnotationAccordion);

    return _possibleConstructorReturn(this, (AnnotationAccordion.__proto__ || Object.getPrototypeOf(AnnotationAccordion)).apply(this, arguments));
  }

  _createClass(AnnotationAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$layout$annot = _context.layout.annotations,
          annotations = _context$layout$annot === undefined ? [] : _context$layout$annot,
          _ = _context.localize;
      var _props = this.props,
          canAdd = _props.canAdd,
          children = _props.children;


      var content = annotations.length && annotations.map(function (ann, i) {
        return _react2.default.createElement(
          AnnotationFold,
          { key: i, annotationIndex: i, name: ann.text, canDelete: canAdd },
          children
        );
      });

      var addAction = {
        label: _('Annotation'),
        handler: function handler(_ref) {
          var layout = _ref.layout,
              updateContainer = _ref.updateContainer;

          var annotationIndex = void 0;
          if (Array.isArray(layout.annotations)) {
            annotationIndex = layout.annotations.length;
          } else {
            annotationIndex = 0;
          }

          var key = 'annotations[' + annotationIndex + ']';
          var value = { text: _('new text') };

          if (updateContainer) {
            updateContainer(_defineProperty({}, key, value));
          }
        }
      };

      return _react2.default.createElement(
        _derived.LayoutPanel,
        { addAction: canAdd ? addAction : null },
        content ? content : _react2.default.createElement(
          _PanelEmpty.PanelMessage,
          { heading: _('Call out your data.') },
          _react2.default.createElement(
            'p',
            null,
            _('Annotations are text and arrows you can use to point out specific parts of your figure.')
          ),
          _react2.default.createElement(
            'p',
            null,
            _('Click on the + button above to add an annotation.')
          )
        )
      );
    }
  }]);

  return AnnotationAccordion;
}(_react.Component);

AnnotationAccordion.contextType = _context2.EditorControlsContext;

AnnotationAccordion.propTypes = {
  children: _propTypes2.default.node,
  canAdd: _propTypes2.default.bool
};

exports.default = AnnotationAccordion;
//# sourceMappingURL=AnnotationAccordion.js.map
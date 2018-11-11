'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectAnnotationToLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../lib');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectAnnotationToLayout(WrappedComponent) {
  var AnnotationConnectedComponent = function (_Component) {
    _inherits(AnnotationConnectedComponent, _Component);

    function AnnotationConnectedComponent(props, context) {
      _classCallCheck(this, AnnotationConnectedComponent);

      var _this = _possibleConstructorReturn(this, (AnnotationConnectedComponent.__proto__ || Object.getPrototypeOf(AnnotationConnectedComponent)).call(this, props, context));

      _this.deleteAnnotation = _this.deleteAnnotation.bind(_this);
      _this.updateAnnotation = _this.updateAnnotation.bind(_this);
      _this.setLocals(props, context);
      return _this;
    }

    _createClass(AnnotationConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        var annotationIndex = props.annotationIndex;
        var container = context.container,
            fullContainer = context.fullContainer;


        var annotations = container.annotations || [];
        var fullAnnotations = fullContainer.annotations || [];
        this.container = annotations[annotationIndex];
        this.fullContainer = fullAnnotations[annotationIndex];
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this2.context.getValObject ? null : _this2.context.getValObject('annotations[].' + attr);
          },
          updateContainer: this.updateAnnotation,
          deleteContainer: this.deleteAnnotation,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        var _this3 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this3.context.getValObject ? null : _this3.context.getValObject('annotations[].' + attr);
          },
          updateContainer: this.updateAnnotation,
          deleteContainer: this.deleteAnnotation,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'updateAnnotation',
      value: function updateAnnotation(update) {
        var newUpdate = {};
        var annotationIndex = this.props.annotationIndex;

        for (var key in update) {
          var newkey = 'annotations[' + annotationIndex + '].' + key;
          newUpdate[newkey] = update[key];
        }
        this.context.updateContainer(newUpdate);
      }
    }, {
      key: 'deleteAnnotation',
      value: function deleteAnnotation() {
        if (this.context.onUpdate) {
          this.context.onUpdate({
            type: _constants.EDITOR_ACTIONS.DELETE_ANNOTATION,
            payload: { annotationIndex: this.props.annotationIndex }
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return AnnotationConnectedComponent;
  }(_react.Component);

  AnnotationConnectedComponent.displayName = 'AnnotationConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  AnnotationConnectedComponent.propTypes = {
    annotationIndex: _propTypes2.default.number.isRequired
  };

  AnnotationConnectedComponent.contextTypes = {
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    data: _propTypes2.default.array,
    onUpdate: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    getValObject: _propTypes2.default.func
  };

  AnnotationConnectedComponent.childContextTypes = {
    updateContainer: _propTypes2.default.func,
    deleteContainer: _propTypes2.default.func,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    getValObject: _propTypes2.default.func
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  AnnotationConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AnnotationConnectedComponent;
}
//# sourceMappingURL=connectAnnotationToLayout.js.map
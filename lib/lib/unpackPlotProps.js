'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unpackPlotProps;

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _fastIsnumeric = require('fast-isnumeric');

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function unpackPlotProps(props, context) {
  var container = context.container,
      getValObject = context.getValObject,
      defaultContainer = context.defaultContainer,
      updateContainer = context.updateContainer;


  if (!props.attr) {
    return {};
  }

  var attrMeta = void 0;
  if (getValObject) {
    attrMeta = context.getValObject(props.attr) || {};
  }

  var fullContainer = context.fullContainer;

  var fullProperty = (0, _nested_property2.default)(fullContainer, props.attr);
  var fullValue = fullProperty.get();
  var multiValued = false;

  // MULTI_VALUED consists of a control sequence that cannot be confused with
  // user data. We must transform it into something that can be displayed as
  // the screen.
  if (fullValue === _constants.MULTI_VALUED) {
    fullValue = _constants.MULTI_VALUED_PLACEHOLDER;
    multiValued = true;
  }

  var isVisible = false;
  if (props.show || fullValue !== void 0 && fullValue !== null) {
    isVisible = true;
  }

  var defaultValue = props.defaultValue;
  if (defaultValue === void 0 && defaultContainer) {
    defaultValue = (0, _nested_property2.default)(defaultContainer, props.attr).get();
  }

  var min = void 0,
      max = void 0,
      description = void 0;
  if (attrMeta) {
    if ((0, _fastIsnumeric2.default)(attrMeta.max)) {
      max = attrMeta.max;
    }
    if ((0, _fastIsnumeric2.default)(attrMeta.min)) {
      min = attrMeta.min;
    }

    description = attrMeta.description;
  }

  var updatePlot = function updatePlot(v) {
    if (updateContainer) {
      updateContainer(_defineProperty({}, props.attr, v));
    }
  };

  return {
    attrMeta: attrMeta,
    container: container,
    defaultValue: defaultValue,
    fullContainer: fullContainer,
    fullValue: fullValue,
    getValObject: getValObject,
    isVisible: isVisible,
    max: max,
    min: min,
    description: description,
    multiValued: multiValued,
    updateContainer: updateContainer,
    updatePlot: updatePlot
  };
}
//# sourceMappingURL=unpackPlotProps.js.map
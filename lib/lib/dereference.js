'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dereference;

var _walkObject = require('./walkObject');

var _walkObject2 = _interopRequireDefault(_walkObject);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SRC_ATTR_PATTERN = /src$/;

function dereference(container, dataSources) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { deleteKeys: false };

  var replacer = function replacer(key, parent, srcPath) {
    if (!SRC_ATTR_PATTERN.test(key)) {
      return;
    }

    var dataKey = key.replace(SRC_ATTR_PATTERN, '');
    var traceType = parent.type;

    var srcRef = config.toSrc ? config.toSrc(parent[key]) : parent[key];

    // making this into an array to more easily lookup 1d and 2d srcs in dataSourceOptions
    if (!Array.isArray(srcRef)) {
      srcRef = [srcRef];
    }

    var data = srcRef.map(function (ref) {
      if (config.deleteKeys && !(ref in dataSources)) {
        delete parent[dataKey];
      }
      return dataSources[ref];
    });

    // remove extra data wrapping
    if (srcRef.length === 1) {
      data = data[0];
    }

    if (!Array.isArray(data)) {
      return;
    }

    parent[dataKey] = (0, _index.maybeTransposeData)(data, srcPath, traceType);
  };

  (0, _walkObject2.default)(container, replacer, {
    walkArraysMatchingKeys: ['data', 'transforms'],
    pathType: 'nestedProperty'
  });
}
//# sourceMappingURL=dereference.js.map
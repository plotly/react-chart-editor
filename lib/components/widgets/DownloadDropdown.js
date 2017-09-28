"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _features = require("@common/utils/features");

var _features2 = _interopRequireDefault(_features);

var _customPropTypes = require("@workspace/utils/customPropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownloadDropdown = function (_Component) {
  _inherits(DownloadDropdown, _Component);

  function DownloadDropdown() {
    _classCallCheck(this, DownloadDropdown);

    return _possibleConstructorReturn(this, (DownloadDropdown.__proto__ || Object.getPrototypeOf(DownloadDropdown)).apply(this, arguments));
  }

  _createClass(DownloadDropdown, [{
    key: "renderAllowedExportTypes",
    value: function renderAllowedExportTypes() {
      var allowedExportTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var graphURLBase = arguments[1];

      var downloadItemClass = (0, _classnames2.default)("dropdown-menu-item", "--product-pages", "--brand-blue-hover");

      return allowedExportTypes.map(function (format, index) {
        var url = graphURLBase + "." + format;
        var formatUpper = format.toUpperCase();
        return _react2.default.createElement(
          "a",
          { target: "_blank", className: downloadItemClass, href: url, key: index },
          formatUpper
        );
      });
    }
  }, {
    key: "renderRestrictedExportTypes",
    value: function renderRestrictedExportTypes() {
      var restrictedExportTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var downloadItemClassMuted = "dropdown-menu-item-restricted";

      return restrictedExportTypes.map(function (format, index) {
        var formatUpper = format.toUpperCase();
        return _react2.default.createElement(
          "a",
          { target: "_blank", className: downloadItemClassMuted, key: index },
          formatUpper
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          graphURLBase = _props.graphURLBase,
          currentUser = _props.currentUser,
          shareKey = _props.shareKey;

      var feature_set = currentUser ? currentUser.feature_set_id : null;
      var restrictedExportTypes = void 0;

      var fullFeatureSet = (0, _features.getFeatureSetByID)("full");
      var allExportTypes = fullFeatureSet.file_export_types.value;

      var allowedExportTypes = (0, _features2.default)(feature_set, "file_export_types");

      if (allExportTypes && allowedExportTypes) {
        restrictedExportTypes = allExportTypes.filter(function (exportType) {
          return !allowedExportTypes.includes(exportType);
        });
      }

      var downloadItemClass = (0, _classnames2.default)("dropdown-menu-item", "--product-pages", "--brand-blue-hover");

      var containerClass = (0, _classnames2.default)("dropdown-menu", "--feed-download-menu", "--product-pages", "--atright");

      return _react2.default.createElement(
        "div",
        { className: containerClass },
        _react2.default.createElement("div", { className: "dropdown-menu-triangle --grey-menu-triangle +no-right" }),
        _react2.default.createElement(
          "span",
          { className: "dropdown-menu-title" },
          "Download Image"
        ),
        this.renderAllowedExportTypes(allowedExportTypes, graphURLBase),
        this.renderRestrictedExportTypes(restrictedExportTypes),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("embed", graphURLBase, shareKey)
          },
          "Full-screen"
        ),
        _react2.default.createElement(
          "span",
          { className: "dropdown-menu-title" },
          "Download Data"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("csv", graphURLBase, shareKey)
          },
          "CSV"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("xlsx", graphURLBase, shareKey)
          },
          "Excel (xlsx)"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: "https://store.office.com/plotly-charts-WA104379485.aspx?assetid=WA104379485"
          },
          "PowerPoint"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("json", graphURLBase, shareKey)
          },
          "JSON"
        ),
        _react2.default.createElement(
          "span",
          { className: "dropdown-menu-title" },
          "Download Code"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("py", graphURLBase, shareKey)
          },
          "Python"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("m", graphURLBase, shareKey)
          },
          "MATLAB"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("r", graphURLBase, shareKey)
          },
          "R"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("js", graphURLBase, shareKey)
          },
          "plotly.js"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("nodejs", graphURLBase, shareKey)
          },
          "node.js"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("jl", graphURLBase, shareKey)
          },
          "Julia"
        ),
        _react2.default.createElement(
          "span",
          { className: "dropdown-menu-title" },
          "Download HTML"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("zip", graphURLBase, shareKey)
          },
          "Zip archive"
        ),
        _react2.default.createElement(
          "a",
          {
            target: "_blank",
            className: downloadItemClass,
            href: exportUrl("download", graphURLBase, shareKey)
          },
          "HTML"
        )
      );
    }
  }]);

  return DownloadDropdown;
}(_react.Component);

DownloadDropdown.propTypes = {
  graphURLBase: _propTypes2.default.string.isRequired,
  currentUser: _customPropTypes.currentUserOrNull,
  shareKey: _propTypes2.default.string
};

function exportUrl(ext, base, shareKey) {
  var url = base + "." + ext;

  if (shareKey) {
    url += "?share_key=" + shareKey;
  }

  return url;
}

module.exports = DownloadDropdown;
//# sourceMappingURL=DownloadDropdown.js.map
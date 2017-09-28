"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedSelectColumn = exports.TEST_SELECTOR_CLASS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dropdown = require("./Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _reactImmutableProptypes = require("react-immutable-proptypes");

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connectWorkspaceSheets = require("@workspace/utils/connectWorkspaceSheets");

var _connectWorkspaceSheets2 = _interopRequireDefault(_connectWorkspaceSheets);

var _ramda = require("ramda");

var _reactRedux = require("react-redux");

var _files = require("@workspace/constants/files");

var _customPropTypes = require("@workspace/utils/customPropTypes");

var _regexps = require("@workspace/utils/regexps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEST_SELECTOR_CLASS = exports.TEST_SELECTOR_CLASS = "js-SelectColumn";

var UnconnectedSelectColumn = exports.UnconnectedSelectColumn = function (_Component) {
  _inherits(UnconnectedSelectColumn, _Component);

  function UnconnectedSelectColumn(props) {
    _classCallCheck(this, UnconnectedSelectColumn);

    var _this = _possibleConstructorReturn(this, (UnconnectedSelectColumn.__proto__ || Object.getPrototypeOf(UnconnectedSelectColumn)).call(this, props));

    _this.isConsistent = _this.isConsistent.bind(_this);
    _this.onColumnSelection = _this.onColumnSelection.bind(_this);
    _this.getOptions = _this.getOptions.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    return _this;
  }

  _createClass(UnconnectedSelectColumn, [{
    key: "onColumnSelection",
    value: function onColumnSelection(newOption) {
      var _props = this.props,
          multi = _props.multi,
          multiTable = _props.multiTable,
          onColumnSelection = _props.onColumnSelection;

      if (multi) {
        if (multiTable) {
          onColumnSelection((0, _ramda.isEmpty)(newOption || []) ? null : newOption);
        } else {
          // newOption can be `undefined` or an array.
          var srcString = (0, _regexps.joinSrcs)(newOption || []);
          onColumnSelection(srcString ? srcString : null);
        }
      } else {
        onColumnSelection(newOption);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _props2 = this.props,
          columnMeta = _props2.columnMeta,
          multi = _props2.multi,
          multiTable = _props2.multiTable,
          selection = _props2.selectedColumnId,
          tables = _props2.tables,
          tableIds = _props2.tableIds;

      // If multiTable is true, selection is an array of columnIds.

      var restrictOptions = !multiTable && multi && selection;
      var fid = restrictOptions ? (0, _regexps.parseSrc)(selection).fid : null;

      return tables.reduce(function (options, table, tableId) {
        var index = tableIds.indexOf(tableId);

        if (restrictOptions) {
          // Only allow new selections to match currently-selected table.
          if (fid !== tableId) {
            return options;
          }
        }

        // This is just a label, which is why it's always disabled.
        options.push({ disabled: true, label: "Grid " + (index + 1) });

        // These are the select-able options.
        var columnIds = table.get("columnIds");
        columnIds.forEach(function (columnId) {
          var label = columnMeta.getIn([columnId, "name"]);
          options.push({ label: label, value: columnId });
        });

        return options;
      }, []);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var _props3 = this.props,
          multi = _props3.multi,
          multiTable = _props3.multiTable,
          tables = _props3.tables,
          selection = _props3.selectedColumnId;

      // If we're not in multi-mode, we return the string we're given.

      if (!multi) {
        return selection;
      }

      // We're in multi-mode, but be consistent undefined, null, '', & [].
      if ((0, _ramda.isEmpty)(selection || [])) {
        return null;
      }

      // If we're in multiTable-mode, just return the array we have.
      if (multiTable) {
        return selection;
      }

      // For everything else, we need to parse the src to return an array.

      var _parseSrc = (0, _regexps.parseSrc)(selection),
          colRef = _parseSrc.colRef,
          fid = _parseSrc.fid;

      var _parseColRef = (0, _regexps.parseColRef)(colRef),
          type = _parseColRef.type,
          _parseColRef$uids = _parseColRef.uids,
          uids = _parseColRef$uids === undefined ? [] : _parseColRef$uids;

      var table = tables.find(function (value) {
        return value.get("fid") === fid;
      });
      var allColumnIds = table.get("columnIds").toJS();
      var referencedColumnIds = (0, _ramda.map)(function (uid) {
        return fid + ":" + uid;
      }, uids);

      switch (type) {
        case _files.COL_REF_TYPES.EXCLUDE:
          return (0, _ramda.difference)(allColumnIds, referencedColumnIds);
        case _files.COL_REF_TYPES.SINGLE:
        case _files.COL_REF_TYPES.INCLUDE:
          return referencedColumnIds;
        case _files.COL_REF_TYPES.ALL:
          return allColumnIds;
        default:
          throw new Error("Unknown colRef type in SelectColumn.");
      }
    }
  }, {
    key: "isConsistent",
    value: function isConsistent(selection, tables) {
      /*
           * This is really tricky, we need the props from our parent component
           * (selectedSrc) to be consistent with props from connect (tables).
           * Shockingly, we can't depend on this being synchronous.
           */

      if ((0, _ramda.isNil)(selection) || (0, _ramda.isEmpty)(selection)) {
        // Nothing to cross-check with, we're A-OK.
        return true;
      }

      /*
           * We return false if the connected 'tables' doesn't match passed-down
           * 'selectedSrc'. Note that there's also a potential problem with the
           * uids in the `selectedSrc`, however, this doesn't lead to bad render
           * cycles and it's hard to tell if the given `selectedSrc` was just bad
           * from the beginning or if it's just a temporary inconsistency due to
           * a race condition.
           */
      var srcs = (0, _ramda.is)(Array, selection) ? selection : [selection];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var src = _step.value;

          var _parseSrc2 = (0, _regexps.parseSrc)(src),
              fid = _parseSrc2.fid;

          var table = tables.find(function (value) {
            return value.get("fid") === fid;
          });
          if (!table) {
            return {
              v: false
            };
          }
        };

        for (var _iterator = srcs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // TODO: Tricky issue with connected leaf components. See #7517
      var selection = nextProps.selectedColumnId,
          tables = nextProps.tables;

      return this.isConsistent(selection, tables);
    }
  }, {
    key: "render",
    value: function render() {
      var _props4 = this.props,
          label = _props4.label,
          minWidth = _props4.minWidth,
          multi = _props4.multi,
          placeholder = _props4.placeholder;

      var options = this.getOptions();
      var value = this.getValue();

      return _react2.default.createElement(
        "span",
        { className: "widget-dropdown" },
        _react2.default.createElement(_Dropdown2.default, {
          className: TEST_SELECTOR_CLASS + "-" + label,
          ref: "dropdown",
          options: options,
          value: value,
          searchable: true,
          placeholder: placeholder,
          onChange: this.onColumnSelection,
          clearable: true,
          minWidth: minWidth,
          multi: multi,
          width: "100%"
        })
      );
    }
  }]);

  return UnconnectedSelectColumn;
}(_react.Component);

UnconnectedSelectColumn.propTypes = {
  // Props from parent component.
  onColumnSelection: _propTypes2.default.func.isRequired,
  selectedColumnId: _propTypes2.default.oneOfType([_customPropTypes.stringOrNull, _propTypes2.default.array]),
  placeholder: _propTypes2.default.string,
  minWidth: _propTypes2.default.string,
  multi: _propTypes2.default.bool,
  multiTable: _propTypes2.default.bool,
  label: _propTypes2.default.string,

  // Props from connect.
  columnMeta: _reactImmutableProptypes2.default.map,
  tables: _reactImmutableProptypes2.default.map,
  tableIds: _reactImmutableProptypes2.default.list
};

UnconnectedSelectColumn.defaultProps = {
  placeholder: "",
  clearable: true,
  multi: false,
  multiTable: false,
  label: ""
};

var mapStateToProps = function mapStateToProps(state) {
  var _state$workspace = state.workspace,
      columnMeta = _state$workspace.columnMeta,
      tables = _state$workspace.tables,
      tableIds = _state$workspace.tableIds;

  return { columnMeta: columnMeta, tables: tables, tableIds: tableIds };
};

var SelectColumn = (0, _reactRedux.connect)(mapStateToProps)((0, _connectWorkspaceSheets2.default)(null, true)(UnconnectedSelectColumn));

exports.default = SelectColumn;
//# sourceMappingURL=SelectColumn.js.map
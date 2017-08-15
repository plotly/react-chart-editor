(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.createPlotlyComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.klass = klass;

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function klass(name) {
  return _constants2.default.baseClassName + "-" + name;
}

},{"./constants":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenuItem = function (_Component) {
  _inherits(EditModeMenuItem, _Component);

  function EditModeMenuItem(props) {
    _classCallCheck(this, EditModeMenuItem);

    var _this = _possibleConstructorReturn(this, (EditModeMenuItem.__proto__ || Object.getPrototypeOf(EditModeMenuItem)).call(this, props));

    _this.state = {
      expanded: true
    };

    _this.toggleExpanded = _this.toggleExpanded.bind(_this);
    _this.onChangeSection = _this.onChangeSection.bind(_this);
    _this.renderSubItem = _this.renderSubItem.bind(_this);
    return _this;
  }

  _createClass(EditModeMenuItem, [{
    key: "toggleExpanded",
    value: function toggleExpanded() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: "onChangeSection",
    value: function onChangeSection(item) {
      this.props.onChangeSection(this.props.name + "-" + item);
    }
  }, {
    key: "renderSubItem",
    value: function renderSubItem(item, i) {
      var _this2 = this;

      var isActive = this.props.currentSection === this.props.name + "-" + item;

      return _react2.default.createElement(
        "div",
        {
          key: "subitem-" + i,
          className: "editModeMenu-subItem " + (isActive ? "is-active" : ""),
          onClick: function onClick() {
            return _this2.onChangeSection(item);
          }
        },
        item
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        {
          className: "editModeMenu-item " + (this.state.expanded ? "is-expanded" : "")
        },
        _react2.default.createElement(
          "div",
          { className: "editModeMenu-itemTitle", onClick: this.toggleExpanded },
          this.props.name
        ),
        this.state.expanded && this.props.sections.map(this.renderSubItem)
      );
    }
  }]);

  return EditModeMenuItem;
}(_react.Component);

exports.default = EditModeMenuItem;

},{"../common":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _common = require("../common");

var _editModeMenuItem = require("./edit-mode-menu-item.jsx");

var _editModeMenuItem2 = _interopRequireDefault(_editModeMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenu = function (_Component) {
  _inherits(EditModeMenu, _Component);

  function EditModeMenu() {
    _classCallCheck(this, EditModeMenu);

    return _possibleConstructorReturn(this, (EditModeMenu.__proto__ || Object.getPrototypeOf(EditModeMenu)).apply(this, arguments));
  }

  _createClass(EditModeMenu, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "editModeMenu" },
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Graph",
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Create", "Filter", "Group"]
        }),
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Style",
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Traces", "Layout", "Notes", "Axes", "Legend", "Shapes", "Images"]
        })
      );
    }
  }]);

  return EditModeMenu;
}(_react.Component);

exports.default = EditModeMenu;

},{"../common":1,"./edit-mode-menu-item.jsx":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  baseClassName: "plotlyjsReactEditor"
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _editModeMenu = require("./components/edit-mode-menu.jsx");

var _editModeMenu2 = _interopRequireDefault(_editModeMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyReactEditor = function (_Component) {
  _inherits(PlotlyReactEditor, _Component);

  function PlotlyReactEditor(props) {
    _classCallCheck(this, PlotlyReactEditor);

    var _this = _possibleConstructorReturn(this, (PlotlyReactEditor.__proto__ || Object.getPrototypeOf(PlotlyReactEditor)).call(this, props));

    _this.state = {
      section: "Graph-Create"
    };

    _this.setSection = _this.setSection.bind(_this);
    return _this;
  }

  _createClass(PlotlyReactEditor, [{
    key: "setSection",
    value: function setSection(section) {
      this.setState({ section: section });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "plotlyjsReactEditor" },
        _react2.default.createElement(_editModeMenu2.default, {
          currentSection: this.state.section,
          onChangeSection: this.setSection
        })
      );
    }
  }]);

  return PlotlyReactEditor;
}(_react.Component);

exports.default = PlotlyReactEditor;

},{"./components/edit-mode-menu.jsx":3,"./constants":4}]},{},[5])(5)
});
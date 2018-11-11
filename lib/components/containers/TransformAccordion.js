'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _PlotlyPanel = require('./PlotlyPanel');

var _PlotlyPanel2 = _interopRequireDefault(_PlotlyPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _PanelEmpty = require('./PanelEmpty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransformFold = (0, _lib.connectTransformToTrace)(_PlotlyFold2.default);

var TransformAccordion = function (_Component) {
  _inherits(TransformAccordion, _Component);

  function TransformAccordion() {
    _classCallCheck(this, TransformAccordion);

    return _possibleConstructorReturn(this, (TransformAccordion.__proto__ || Object.getPrototypeOf(TransformAccordion)).apply(this, arguments));
  }

  _createClass(TransformAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$fullContaine = _context.fullContainer.transforms,
          transforms = _context$fullContaine === undefined ? [] : _context$fullContaine,
          _ = _context.localize,
          container = _context.container,
          dataSourceOptions = _context.dataSourceOptions;
      var children = this.props.children;


      var transformTypes = [{ label: _('Filter'), type: 'filter' }, { label: _('Split'), type: 'groupby' }, { label: _('Aggregate'), type: 'aggregate' }, { label: _('Sort'), type: 'sort' }];

      var transformBy = container.transforms && container.transforms.map(function (tr) {
        var foldNameSuffix = '';
        if (tr.groupssrc) {
          var groupssrc = dataSourceOptions && dataSourceOptions.find(function (d) {
            return d.value === tr.groupssrc;
          });
          foldNameSuffix = ': ' + (groupssrc && groupssrc.label ? groupssrc.label : tr.groupssrc);
        } else if (tr.targetsrc) {
          var targetsrc = dataSourceOptions && dataSourceOptions.find(function (d) {
            return d.value === tr.targetsrc;
          });
          foldNameSuffix = ': ' + (targetsrc && targetsrc.label ? targetsrc.label : tr.targetsrc);
        }
        return foldNameSuffix;
      });

      var filteredTransforms = transforms.filter(function (_ref) {
        var type = _ref.type;
        return Boolean(type);
      });
      var content = filteredTransforms.length && filteredTransforms.map(function (tr, i) {
        return _react2.default.createElement(
          TransformFold,
          {
            key: i,
            transformIndex: i,
            name: '' + transformTypes.filter(function (_ref2) {
              var type = _ref2.type;
              return type === tr.type;
            })[0].label + (transformBy && transformBy[i]),
            canDelete: true
          },
          children
        );
      });

      // cannot have 2 Split transforms on one trace:
      // https://github.com/plotly/plotly.js/issues/1742
      var addActionOptions = container.transforms && container.transforms.some(function (t) {
        return t.type === 'groupby';
      }) ? transformTypes.filter(function (t) {
        return t.type !== 'groupby';
      }) : transformTypes;

      var addAction = {
        label: _('Transform'),
        handler: addActionOptions.map(function (_ref3) {
          var label = _ref3.label,
              type = _ref3.type;

          return {
            label: label,
            handler: function handler(context) {
              var fullContainer = context.fullContainer,
                  updateContainer = context.updateContainer;

              if (updateContainer) {
                var transformIndex = Array.isArray(fullContainer.transforms) ? fullContainer.transforms.length : 0;
                var key = 'transforms[' + transformIndex + ']';

                var payload = { type: type };
                if (type === 'filter') {
                  payload.target = [];
                  payload.targetsrc = null;
                } else {
                  payload.groupssrc = null;
                  payload.groups = null;
                }

                if (type === 'groupby') {
                  payload.styles = [];
                }

                updateContainer(_defineProperty({}, key, payload));
              }
            }
          };
        })
      };

      return _react2.default.createElement(
        _PlotlyPanel2.default,
        { addAction: addAction },
        content ? content : _react2.default.createElement(
          _PanelEmpty.PanelMessage,
          { icon: null },
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'left' } },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                _('Filter')
              ),
              ' ',
              _(' transforms allow you to filter data out from a trace.')
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                _('Split')
              ),
              ' ',
              _(' transforms allow you to create multiple traces from one source trace, so as to style them differently.')
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                _('Aggregate')
              ),
              ' ',
              _(' transforms allow you to summarize a trace using an aggregate function like "average" or "minimum".')
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                _('Sort')
              ),
              ' ',
              _(' transforms allow you to sort a trace, so as to control marker overlay or line connection order.')
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _('Click on the + button above to add a transform.')
          )
        )
      );
    }
  }]);

  return TransformAccordion;
}(_react.Component);

TransformAccordion.contextTypes = {
  fullContainer: _propTypes2.default.object,
  localize: _propTypes2.default.func,
  container: _propTypes2.default.object,
  dataSourceOptions: _propTypes2.default.array
};

TransformAccordion.propTypes = {
  children: _propTypes2.default.node
};

exports.default = TransformAccordion;
//# sourceMappingURL=TransformAccordion.js.map
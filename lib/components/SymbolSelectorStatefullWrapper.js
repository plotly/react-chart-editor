'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SymbolSelector = require('@workspace/components/widgets/SymbolSelector');

var _SymbolSelector2 = _interopRequireDefault(_SymbolSelector);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolSelectorStatefulWrapper = function (_Component) {
    _inherits(SymbolSelectorStatefulWrapper, _Component);

    function SymbolSelectorStatefulWrapper(props) {
        _classCallCheck(this, SymbolSelectorStatefulWrapper);

        var _this = _possibleConstructorReturn(this, (SymbolSelectorStatefulWrapper.__proto__ || Object.getPrototypeOf(SymbolSelectorStatefulWrapper)).call(this, props));

        _this.state = {
            activeOption: props.activeOption || 'circle',
            symbolColor: props.symbolColor,
            isOpen: false
        };
        _this.toggleMenu = _this.toggleMenu.bind(_this);
        _this.changeSymbol = _this.changeSymbol.bind(_this);
        _this.closeMenu = _this.closeMenu.bind(_this);
        return _this;
    }

    _createClass(SymbolSelectorStatefulWrapper, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var shouldNotUpdate = (0, _ramda.allPass)((0, _ramda.eqProps)('activeOption', nextProps, this.state), (0, _ramda.eqProps)('symbolColor', nextProps, this.state));

            if (!shouldNotUpdate) {
                this.setState({
                    activeOption: nextProps.activeOption,
                    symbolColor: nextProps.symbolColor
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.closeMenu);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.closeMenu);
        }
    }, {
        key: 'closeMenu',
        value: function closeMenu(e) {
            this.setState({ isOpen: false });
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu() {
            this.setState({ isOpen: !this.state.isOpen });
        }
    }, {
        key: 'changeSymbol',
        value: function changeSymbol(newSymbol) {
            this.setState({ activeOption: newSymbol });
            this.props.onChange(newSymbol);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_SymbolSelector2.default, {
                activeOption: this.state.activeOption,
                toggleMenu: this.toggleMenu,
                changeSymbol: this.changeSymbol,
                symbolColor: this.props.symbolColor,
                isOpen: this.state.isOpen,
                is3D: this.props.is3D,
                borderColor: this.props.borderColor,
                traceType: this.props.traceType
            });
        }
    }]);

    return SymbolSelectorStatefulWrapper;
}(_react.Component);

exports.default = SymbolSelectorStatefulWrapper;


SymbolSelectorStatefulWrapper.propTypes = {
    activeOption: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    symbolColor: _react.PropTypes.string.isRequired,
    is3D: _react2.default.PropTypes.bool,
    borderColor: _react2.default.PropTypes.string,
    traceType: _react2.default.PropTypes.string
};
module.exports = exports['default'];
//# sourceMappingURL=SymbolSelectorStatefullWrapper.js.map
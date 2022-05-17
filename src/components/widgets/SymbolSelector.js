import {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {CarretDownIcon} from 'plotly-icons';

export default class SymbolSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {markerColor, borderColor} = this.props;
    const {markerColor: nextMarkerColor, borderColor: nextBorderColor} = nextProps;

    return (
      this.props.value !== nextProps.value ||
      this.state.isOpen !== nextState.isOpen ||
      markerColor !== nextMarkerColor ||
      borderColor !== nextBorderColor
    );
  }

  togglePanel() {
    this.setState({isOpen: !this.state.isOpen});
  }

  renderActiveOption() {
    const {markerColor, borderColor, symbolOptions, value} = this.props;
    const currentSymbol = symbolOptions.find((symbol) => symbol.value === value);
    if (!currentSymbol) {
      return (
        <span
          style={{
            paddingTop: '5px',
            paddingLeft: '15px',
          }}
        >
          {'-'}
        </span>
      );
    }

    const symbolStyle = {
      stroke: currentSymbol.fill === 'none' ? markerColor : borderColor,
      strokeOpacity: '1',
      strokeWidth: '2px',
      fill: currentSymbol.fill === 'none' ? 'none' : markerColor,
    };

    return (
      <span>
        <svg width="18" height="18">
          <g transform="translate(8,8)">
            <path d={currentSymbol.label} style={symbolStyle} />
          </g>
        </svg>
      </span>
    );
  }

  renderOptions() {
    const {markerColor, borderColor, symbolOptions} = this.props;
    return symbolOptions.map((option) => {
      const {fill, value, label} = option;

      const symbolStyle = {
        stroke: fill === 'none' ? markerColor : borderColor,
        strokeOpacity: '1',
        strokeWidth: '2px',
        fill: fill === 'none' ? 'none' : markerColor,
      };
      return (
        <div
          className="symbol-selector__item"
          key={value}
          onClick={() => this.props.onChange(value)}
        >
          <svg width="28" height="28" className="symbol-selector__symbol" data-value={value}>
            <g transform="translate(14,14)">
              <path d={label} style={symbolStyle} />
            </g>
          </svg>
        </div>
      );
    });
  }

  render() {
    const {isOpen} = this.state;
    const toggleClass = classnames('symbol-selector__toggle', {
      'symbol-selector__toggle--dark': this.props.backgroundDark,
    });

    return (
      <div>
        <div className={toggleClass} onClick={this.togglePanel}>
          <span className="symbol-selector__toggle_option">{this.renderActiveOption()}</span>
          <span>
            <CarretDownIcon className="symbol-selector__toggle__caret" />
          </span>
        </div>
        {isOpen && this.renderOptions()}
      </div>
    );
  }
}

SymbolSelector.propTypes = {
  backgroundDark: PropTypes.bool,
  markerColor: PropTypes.string,
  borderColor: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  symbolOptions: PropTypes.array,
};

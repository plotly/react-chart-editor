import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import ModalBox from '../containers/ModalBox';

const tooLightFactor = 0.8;

function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > tooLightFactor;
}

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
    const {
      markerColor: nextMarkerColor,
      borderColor: nextBorderColor,
    } = nextProps;

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
    const currentSymbol = symbolOptions.find(symbol => symbol.value === value);
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
    return symbolOptions.map(option => {
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
          onClick={this.props.onChange}
        >
          <svg
            width="28"
            height="28"
            className="symbol-selector__symbol"
            data-value={value}
          >
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
    const {markerColor} = this.props;

    // TODO link these colors into theme
    const backgroundColor = tooLight(markerColor) ? '#bec8d9' : 'white';

    return (
      <div>
        <div className="symbol-selector__toggle" onClick={this.togglePanel}>
          <span className="symbol-selector__toggle_option">
            {this.renderActiveOption()}
          </span>
          <span className="symbol-selector__toggle__caret">
            <i className="icon-caret-down" />
          </span>
        </div>
        {isOpen ? (
          <ModalBox
            onClose={this.togglePanel}
            backgroundColor={backgroundColor}
          >
            {this.renderOptions()}
          </ModalBox>
        ) : null}
      </div>
    );
  }
}

SymbolSelector.propTypes = {
  markerColor: PropTypes.string,
  borderColor: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  symbolOptions: PropTypes.array,
};

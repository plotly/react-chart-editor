import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SymbolSelectorWidget from '../widgets/SymbolSelector';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {SYMBOLS} from '../../lib/constants';
import {connectToContainer} from '../../lib';

class SymbolSelector extends Component {
  render() {
    const {fullContainer, fullValue, updatePlot} = this.props;

    const markerColor = nestedProperty(fullContainer, 'marker.color').get();
    const borderWidth = nestedProperty(
      fullContainer,
      'marker.line.width'
    ).get();

    let borderColor = markerColor;
    if (borderWidth) {
      borderColor = nestedProperty(fullContainer, 'marker.line.color').get();
    }

    let symbolOptions;
    if (this.props.is3D) {
      symbolOptions = SYMBOLS.filter(option => {
        return option.threeD;
      });
    } else {
      symbolOptions = [...SYMBOLS];
    }

    return (
      <Field {...this.props}>
        <SymbolSelectorWidget
          markerColor={markerColor}
          borderColor={borderColor}
          value={fullValue()}
          onChange={updatePlot}
          symbolOptions={symbolOptions}
        />
      </Field>
    );
  }
}

SymbolSelector.propTypes = {
  defaultValue: PropTypes.number,
  fullValue: PropTypes.func,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

SymbolSelector.defaultProps = {
  showArrows: true,
};

export default connectToContainer(SymbolSelector);

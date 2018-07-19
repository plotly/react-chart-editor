import ColorscalePicker, {COLOR_PICKER_CONSTANTS} from 'react-colorscales';
import Dropdown from './Dropdown';
import Info from '../fields/Info';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

class Scale extends Component {
  constructor() {
    super();

    this.state = {
      selectedColorscaleType: 'sequential',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedColorscaleType) {
    this.setState({selectedColorscaleType});
  }

  render() {
    const {onColorscaleChange, selected, fullWidth} = this.props;
    const description =
      COLOR_PICKER_CONSTANTS.COLORSCALE_DESCRIPTIONS[
        this.state.selectedColorscaleType
      ];
    const _ = this.context.localize;

    const infoClassnames = classnames('colorscalePickerInfo', {
      fullWidth: fullWidth ? 'fullWidth' : '',
    });
    const colorPickerClassnames = classnames('', {
      fullWidth: fullWidth ? 'fullWidth' : '',
    });

    return (
      <Fragment>
        <Dropdown
          options={COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES.filter(
            t => t !== 'custom'
          )}
          value={this.state.selectedColorscaleType}
          onChange={this.onChange}
          clearable={false}
          searchable={false}
          placeholder={_('Select a Colorscale')}
        />
        <ColorscalePicker
          onChange={onColorscaleChange}
          colorscale={selected}
          width={295}
          initialColorscaleType={COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES[0]}
          colorscaleType={this.state.selectedColorscaleType}
          onColorscaleTypeChange={this.onColorscaleTypeChange}
          disableSwatchControls
          className={colorPickerClassnames}
        />
        {description && description.length ? (
          <Info fieldContainerClassName={infoClassnames}>{description}</Info>
        ) : null}
      </Fragment>
    );
  }
}

Scale.propTypes = {
  onColorscaleChange: PropTypes.func,
  selected: PropTypes.array,
  fullWidth: PropTypes.bool,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

export default Scale;

import ColorscalePicker, {COLOR_PICKER_CONSTANTS} from 'react-colorscales';
import Dropdown from './Dropdown';
import Info from '../fields/Info';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';

class Scale extends Component {
  constructor() {
    super();

    this.state = {
      selectedColorscaleType: null,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedColorscaleType) {
    this.setState({selectedColorscaleType});
  }

  render() {
    const {onColorscaleChange, selected} = this.props;
    const {selectedColorscaleType} = this.state;
    const description =
      COLOR_PICKER_CONSTANTS.COLORSCALE_DESCRIPTIONS[selectedColorscaleType];
    const _ = this.context.localize;

    return (
      <Fragment>
        <Dropdown
          options={COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES}
          value={selectedColorscaleType}
          onChange={this.onChange}
          clearable={false}
          searchable={false}
          placeholder={_('Select a Colorscale Type')}
        />

        {selectedColorscaleType ? (
          <ColorscalePicker
            onChange={onColorscaleChange}
            colorscale={selected}
            width={250}
            colorscaleType={this.state.selectedColorscaleType}
            onColorscaleTypeChange={this.onColorscaleTypeChange}
            disableSwatchControls
          />
        ) : null}

        {description && description.length ? <Info>{description}</Info> : null}
      </Fragment>
    );
  }
}

Scale.propTypes = {
  onColorscaleChange: PropTypes.func,
  selected: PropTypes.array,
  label: PropTypes.string,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

export default Scale;

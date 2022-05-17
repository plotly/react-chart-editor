import ColorscalePicker, {Colorscale, COLOR_PICKER_CONSTANTS} from 'react-colorscales';
import Dropdown from './Dropdown';
import Info from '../fields/Info';
import PropTypes from 'prop-types';
import {Component} from 'react';
// CAREFUL: needs to be the same value as $colorscalepicker-width in _colorscalepicker.scss
const colorscalepickerContainerWidth = 240;

class Scale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColorscaleType: props.initialCategory || 'sequential',
      showColorscalePicker: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      showColorscalePicker: !this.state.showColorscalePicker,
    });
  }

  onChange(selectedColorscaleType) {
    this.setState({selectedColorscaleType});
  }

  render() {
    const {onColorscaleChange, selected, disableCategorySwitch} = this.props;
    const {selectedColorscaleType, showColorscalePicker} = this.state;
    const description = COLOR_PICKER_CONSTANTS.COLORSCALE_DESCRIPTIONS[selectedColorscaleType];
    const colorscaleOptions = COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES.filter(
      (type) => type !== 'custom'
    ).map((type) => ({
      label: type + ' scales',
      value: type,
    }));
    const _ = this.context.localize;

    return (
      <div className="customPickerContainer">
        <div className="customPickerContainer__clickable">
          <Colorscale colorscale={selected} onClick={this.onClick} />
        </div>
        {showColorscalePicker ? (
          <div className="customPickerContainer__expanded-content">
            {disableCategorySwitch ? null : (
              <Dropdown
                options={colorscaleOptions}
                value={selectedColorscaleType}
                onChange={this.onChange}
                clearable={false}
                searchable={false}
                placeholder={_('Select a Colorscale Type')}
                className="customPickerContainer__category-dropdown"
              />
            )}
            {description ? (
              <div className="customPickerContainer__palettes">
                <ColorscalePicker
                  onChange={onColorscaleChange}
                  colorscale={selected}
                  width={colorscalepickerContainerWidth}
                  colorscaleType={this.state.selectedColorscaleType}
                  onColorscaleTypeChange={this.onColorscaleTypeChange}
                  disableSwatchControls
                  scaleLength={7}
                />
                <Info className="customPickerContainer__info">{description}</Info>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

Scale.propTypes = {
  onColorscaleChange: PropTypes.func,
  selected: PropTypes.array,
  label: PropTypes.string,
  initialCategory: PropTypes.string,
  disableCategorySwitch: PropTypes.bool,
};

Scale.contextTypes = {
  localize: PropTypes.func,
};

export default Scale;

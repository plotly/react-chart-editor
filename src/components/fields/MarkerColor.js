import Field from './Field';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';
import RadioBlocks from '../widgets/RadioBlocks';
import MultiColorPicker from './MultiColorPicker';
import ColorscalePicker from './ColorscalePicker';
import Numeric from './Numeric';
import Radio from './Radio';
import Info from './Info';
import DataSelector from './DataSelector';
import VisibilitySelect from './VisibilitySelect';
import {MULTI_VALUED, COLORS} from 'lib/constants';

class UnconnectedMarkerColor extends Component {
  constructor(props, context) {
    super(props, context);

    let type = null;
    if (!props.container.marker || (props.container.marker && !props.container.marker.colorsrc)) {
      type = 'constant';
    } else if (
      props.container.marker &&
      Array.isArray(props.container.marker.color) &&
      props.fullContainer.marker &&
      Array.isArray(props.fullContainer.marker.color)
    ) {
      type = 'variable';
    }

    this.state = {
      type,
      value: {
        constant: type === 'constant' ? props.fullValue : COLORS.mutedBlue,
        variable: type === 'variable' ? props.fullValue : null,
      },
      selectedConstantColorOption: type === 'constant' && props.multiValued ? 'multiple' : 'single',
    };

    this.setType = this.setType.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setColorScale = this.setColorScale.bind(this);
    this.onConstantColorOptionChange = this.onConstantColorOptionChange.bind(this);
  }

  setType(type) {
    if (this.state.type !== type) {
      this.setState({type: type});
      this.props.updatePlot(this.state.value[type]);
      if (type === 'constant') {
        this.context.updateContainer({
          ['marker.colorsrc']: null,
          ['marker.colorscale']: null,
          ['marker.showscale']: null,
        });
        this.setState({colorscale: null});
      } else {
        this.context.updateContainer({
          ['marker.color']: null,
          ['marker.colorsrc']: null,
          ['marker.colorscale']: null,
        });
      }
    }
  }

  setColor(inputValue) {
    const {type} = this.state;

    this.setState(
      type === 'constant' ? {value: {constant: inputValue}} : {value: {variable: inputValue}}
    );
    this.props.updatePlot(inputValue);
  }

  setColorScale(inputValue) {
    this.setState({colorscale: inputValue});
    this.context.updateContainer({['marker.colorscale']: inputValue});
  }

  isMultiValued() {
    return (
      this.props.multiValued ||
      (Array.isArray(this.props.fullValue) && this.props.fullValue.includes(MULTI_VALUED)) ||
      (this.props.container.marker &&
        this.props.container.marker.colorscale &&
        this.props.container.marker.colorscale === MULTI_VALUED) ||
      (this.props.container.marker &&
        this.props.container.marker.colorsrc &&
        this.props.container.marker.colorsrc === MULTI_VALUED) ||
      (this.props.container.marker &&
        this.props.container.marker.color &&
        Array.isArray(this.props.container.marker.color) &&
        this.props.container.marker.color.includes(MULTI_VALUED))
    );
  }

  onConstantColorOptionChange(value) {
    this.setState({
      selectedConstantColorOption: value,
    });
  }

  renderConstantControls() {
    const _ = this.context.localize;
    return (
      <MultiColorPicker
        attr="marker.color"
        multiColorMessage={_('Each trace will be colored according to the selected colorscale.')}
        singleColorMessage={_('All traces will be colored in the the same color.')}
        setColor={this.setColor}
        setColorScale={this.setColorScale}
        onConstantColorOptionChange={this.onConstantColorOptionChange}
        parentSelectedConstantColorOption={this.state.selectedConstantColorOption}
      />
    );
  }

  renderVariableControls() {
    const multiValued =
      this.props.container &&
      this.props.container.marker &&
      ((this.props.container.marker.colorscale &&
        this.props.container.marker.colorscale === MULTI_VALUED) ||
        (this.props.container.marker.colorsrc &&
          this.props.container.marker.colorsrc === MULTI_VALUED));
    return (
      <Field multiValued={multiValued}>
        <DataSelector suppressMultiValuedMessage attr="marker.color" />
        {this.props.container.marker &&
        this.props.container.marker.colorscale === MULTI_VALUED ? null : (
          <ColorscalePicker
            suppressMultiValuedMessage
            attr="marker.colorscale"
            updatePlot={this.setColorScale}
            colorscale={this.state.colorscale}
          />
        )}
      </Field>
    );
  }

  render() {
    const {attr} = this.props;
    const {localize: _, container} = this.context;

    // TO DO: https://github.com/plotly/react-chart-editor/issues/654
    const noSplitsPresent =
      container &&
      (!container.transforms || !container.transforms.filter((t) => t.type === 'groupby').length);

    if (noSplitsPresent) {
      const {type} = this.state;
      const options = [
        {label: _('Constant'), value: 'constant'},
        {label: _('Variable'), value: 'variable'},
      ];

      return (
        <>
          <Field {...this.props} attr={attr}>
            <Field multiValued={this.isMultiValued() && !this.state.type}>
              <RadioBlocks options={options} activeOption={type} onOptionChange={this.setType} />

              {!type ? null : (
                <Info>
                  {type === 'constant'
                    ? _('All points in a trace are colored in the same color.')
                    : _('Each point in a trace is colored according to data.')}
                </Info>
              )}
            </Field>

            {!type
              ? null
              : type === 'constant'
              ? this.renderConstantControls()
              : this.renderVariableControls()}
          </Field>
          {type === 'constant' ? null : (
            <>
              <Radio
                label={_('Colorscale Direction')}
                attr="marker.reversescale"
                options={[
                  {label: _('Normal'), value: false},
                  {label: _('Reversed'), value: true},
                ]}
              />
              <Radio
                label={_('Color Bar')}
                attr="marker.showscale"
                options={[
                  {label: _('Show'), value: true},
                  {label: _('Hide'), value: false},
                ]}
              />
              <VisibilitySelect
                label={_('Colorscale Range')}
                attr="marker.cauto"
                options={[
                  {label: _('Auto'), value: true},
                  {label: _('Custom'), value: false},
                ]}
                showOn={false}
                defaultOpt={true}
              >
                <Numeric label={_('Min')} attr="marker.cmin" />
                <Numeric label={_('Max')} attr="marker.cmax" />
              </VisibilitySelect>
            </>
          )}
        </>
      );
    }

    return (
      <Field {...this.props} attr={attr}>
        {this.renderConstantControls()}
      </Field>
    );
  }
}

UnconnectedMarkerColor.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedMarkerColor.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
  container: PropTypes.object,
};

UnconnectedMarkerColor.displayName = 'UnconnectedMarkerColor';

export default connectToContainer(UnconnectedMarkerColor);

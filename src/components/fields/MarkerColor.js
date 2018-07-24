import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connectToContainer} from 'lib';
import RadioBlocks from '../widgets/RadioBlocks';
import Color from './Color';
import Colorscale from './Colorscale';
import Numeric from './Numeric';
import Radio from './Radio';
import DataSelector from './DataSelector';
import VisibilitySelect from './VisibilitySelect';
import {MULTI_VALUED, COLORS} from 'lib/constants';

class UnconnectedMarkerColor extends Component {
  constructor(props, context) {
    super(props, context);

    let type = null;
    if (
      !props.container.marker ||
      (props.container.marker && !props.container.marker.colorsrc)
    ) {
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
    };

    this.setType = this.setType.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setColorScale = this.setColorScale.bind(this);
  }

  setType(type) {
    this.setState({type: type});
    this.props.updatePlot(this.state.value[type]);
    if (type === 'constant') {
      this.context.updateContainer({
        ['marker.colorsrc']: null,
        ['marker.colorscale']: null,
      });
      this.setState({colorscale: null});
    } else {
      this.context.updateContainer({
        ['marker.color']: null,
        ['marker.colorsrc']: null,
        ['marker.colorscale']: [],
      });
    }
  }

  setValue(inputValue) {
    const {type} = this.state;

    this.setState(
      type === 'constant'
        ? {value: {constant: inputValue}}
        : {value: {variable: inputValue}}
    );
    this.props.updatePlot(inputValue);
  }

  setColorScale(inputValue) {
    this.setState({colorscale: inputValue});
    this.context.updateContainer({['marker.colorscale']: inputValue});
  }

  render() {
    const {attr, fullValue, container} = this.props;
    const {localize: _} = this.context;
    const {type, value, colorscale} = this.state;
    const options = [
      {label: _('Constant'), value: 'constant'},
      {label: _('Variable'), value: 'variable'},
    ];
    const multiValued =
      this.props.multiValued ||
      (Array.isArray(fullValue) && fullValue.includes(MULTI_VALUED)) ||
      (container.marker && container.marker.colorscale === MULTI_VALUED) ||
      (container.marker && container.marker.colorsrc === MULTI_VALUED) ||
      (container.marker &&
        container.marker.color &&
        Array.isArray(container.marker.color) &&
        container.marker.color.includes(MULTI_VALUED));

    return (
      <Fragment>
        <Field {...this.props} multiValued={multiValued} attr={attr}>
          <RadioBlocks
            options={options}
            activeOption={type}
            onOptionChange={this.setType}
          />
          {!type ? null : type === 'constant' ? (
            <Color
              suppressMultiValuedMessage
              attr="marker.color"
              updatePlot={this.setValue}
              fullValue={value.constant}
            />
          ) : container.marker &&
          container.marker.colorsrc === MULTI_VALUED ? null : (
            <Fragment>
              <DataSelector suppressMultiValuedMessage attr="marker.color" />
              {container.marker &&
              container.marker.colorscale === MULTI_VALUED ? null : (
                <Colorscale
                  suppressMultiValuedMessage
                  attr="marker.colorscale"
                  updatePlot={this.setColorScale}
                  colorscale={colorscale}
                />
              )}
            </Fragment>
          )}
        </Field>
        {type === 'constant' ? (
          ''
        ) : (
          <Fragment>
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
              dafault={true}
            >
              <Numeric label={_('Min')} attr="marker.cmin" />
              <Numeric label={_('Max')} attr="marker.cmax" />
            </VisibilitySelect>
          </Fragment>
        )}
      </Fragment>
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
};

export default connectToContainer(UnconnectedMarkerColor);

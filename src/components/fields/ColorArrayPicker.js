import Field from './Field';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';
import RadioBlocks from '../widgets/RadioBlocks';
import DataSelector from './DataSelector';
import MultiColorPicker from './MultiColorPicker';
import {MULTI_VALUED, COLORS} from 'lib/constants';

class UnconnectedColorArrayPicker extends Component {
  constructor(props, context) {
    super(props, context);

    const {fullContainer} = props;
    this.rootAttr = props.attr.split('.')[0];

    let type = null;
    if (
      !fullContainer[this.rootAttr] ||
      (fullContainer[this.rootAttr] && !Array.isArray(fullContainer[this.rootAttr].color))
    ) {
      type = 'constant';
    } else if (fullContainer[this.rootAttr] && Array.isArray(fullContainer[this.rootAttr].color)) {
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
    this.setValue = this.setValue.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setColorScale = this.setColorScale.bind(this);
    this.onConstantColorOptionChange = this.onConstantColorOptionChange.bind(this);
  }

  setType(type) {
    this.setState({type});
    this.context.updateContainer(
      type === 'constant'
        ? {[this.rootAttr + '.color']: this.state.value[type], [this.rootAttr + '.colorsrc']: null}
        : {[this.rootAttr + '.color']: this.state.value[type], [this.rootAttr + '.colorsrc']: null}
    );
  }

  setValue(inputValue) {
    const {type} = this.state;
    this.setState(
      type === 'constant'
        ? {value: {constant: inputValue, variable: this.state.value[type]}}
        : {value: {variable: inputValue, constant: this.state.value[type]}}
    );
    this.props.updatePlot(inputValue);
  }

  setColor(inputValue) {
    const {type} = this.state;

    this.setState(
      type === 'constant'
        ? {value: {constant: inputValue, variable: this.state.value.variable}}
        : {value: {variable: inputValue, constant: this.state.value.constant}}
    );
    this.props.updatePlot(inputValue);
  }

  setColorScale(inputValue) {
    this.setState({colorscale: inputValue});
    this.context.updateContainer({[this.rootAttr + '.colorscale']: inputValue});
  }

  onConstantColorOptionChange(value) {
    this.setState({
      selectedConstantColorOption: value,
    });
  }

  render() {
    const {attr, fullValue} = this.props;
    const {localize: _} = this.context;
    const {type} = this.state;
    const options = [
      {label: _('Constant'), value: 'constant'},
      {label: _('Variable'), value: 'variable'},
    ];
    const multiValued =
      this.props.multiValued || (Array.isArray(fullValue) && fullValue.includes(MULTI_VALUED));

    return (
      <Field {...this.props} multiValued={multiValued} attr={attr}>
        <RadioBlocks options={options} activeOption={type} onOptionChange={this.setType} />
        {type === 'constant' ? (
          <MultiColorPicker
            attr={this.rootAttr + '.color'}
            multiColorMessage={_(
              'Each trace will be colored according to the selected colorscale.'
            )}
            singleColorMessage={_('All traces will be colored in the the same color.')}
            setColor={this.setColor}
            setColorScale={this.setColorScale}
            onConstantColorOptionChange={this.onConstantColorOptionChange}
            parentSelectedConstantColorOption={this.state.selectedConstantColorOption}
          />
        ) : multiValued ? null : (
          <DataSelector
            suppressMultiValuedMessage
            attr={this.rootAttr + '.color'}
            updatePlot={this.setValue}
          />
        )}
      </Field>
    );
  }
}

UnconnectedColorArrayPicker.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedColorArrayPicker.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
};

UnconnectedColorArrayPicker.displayName = 'UnconnectedColorArrayPicker';

export default connectToContainer(UnconnectedColorArrayPicker);

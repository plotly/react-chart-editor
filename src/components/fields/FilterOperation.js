import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import DropdownWidget from '../widgets/Dropdown';
import TextInput from '../widgets/TextInput';
import {connectToContainer} from 'lib';

const operators = [
  {
    label: 'Inequality',
    value: 'inequality',
  },
  {
    label: 'Range',
    value: 'range',
  },
  {
    label: 'Matching values',
    value: 'set',
  },
];

const operations = {
  inequality: [
    {value: '<', label: '<'},
    {value: '<=', label: '≤'},
    {value: '=', label: '='},
    {value: '>', label: '>'},
    {value: '>=', label: '≥'},
  ],
  range: [
    {value: '[]', label: 'Lower ≤ x ≤ Upper'},
    {value: '()', label: 'Lower < x < Upper'},
    {value: '[)', label: 'Lower ≤ x < Upper'},
    {value: '(]', label: 'Lower < x ≤ Upper'},
    {value: '][', label: 'x ≤ Lower OR x ≥ Upper'},
    {value: ')(', label: 'x < Lower OR x > Upper'},
    {value: '](', label: 'x ≤ Lower OR x > Upper'},
    {value: ')[', label: 'x < Lower OR x ≥ Upper'},
  ],
  set: [{value: '{}', label: 'Include'}, {value: '}{', label: 'Exclude'}],
};

const findOperation = operator => {
  let op = 'inequality';
  for (const key in operations) {
    if (
      operations.hasOwnProperty(key) &&
      operations[key].map(o => o.value).indexOf(operator) !== -1
    ) {
      op = key;
      break;
    }
  }
  return op;
};

class UnconnectedFilterOperation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      operation: findOperation(this.props.fullValue),
      operator: operations.inequality[0].value,
    };

    this.setOperation = this.setOperation.bind(this);
  }

  setOperation(value) {
    const operator = operations[value][0].value;
    this.setState({operation: value, operator: operator});
    this.props.updatePlot(operator);
  }

  render() {
    const {
      fullValue,
      updatePlot,
      optionRenderer,
      valueRenderer,
      backgroundDark,
      attr,
    } = this.props;

    const opValue =
      fullValue && fullValue.length > 0 ? fullValue : this.state.operator;

    return (
      <div>
        <Field {...this.props} attr={attr}>
          <DropdownWidget
            backgroundDark={backgroundDark}
            options={operators}
            value={findOperation(opValue)}
            onChange={this.setOperation}
            clearable={false}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
          />
          <DropdownWidget
            backgroundDark={backgroundDark}
            options={operations[this.state.operation]}
            value={opValue}
            onChange={updatePlot}
            clearable={false}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
          />
        </Field>
      </div>
    );
  }
}

UnconnectedFilterOperation.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

class UnconnectedFilterValue extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {value: '', valueMax: ''};

    this.setValue = this.setValue.bind(this);
    this.setValueMax = this.setValueMax.bind(this);
    this.isRange = this.isRange.bind(this);
  }

  isRange() {
    return (
      this.context.container &&
      this.context.container.operation &&
      operations.range
        .map(o => o.value)
        .indexOf(this.context.container.operation) !== -1
    );
  }

  setValue(v) {
    this.setState({value: v});
    const val = this.isRange() ? [v, this.state.valueMax] : v;
    this.props.updatePlot(val);
  }

  setValueMax(v) {
    this.setState({valueMax: v});
    this.props.updatePlot([this.state.value, v]);
  }

  render() {
    const {localize: _} = this.context;
    const {fullValue, fullContainer, attr, defaultValue} = this.props;

    return (
      <div>
        <Field
          {...this.props}
          label={!this.isRange() ? fullContainer.target : _('Lower Bound')}
        >
          <TextInput
            value={Array.isArray(fullValue) ? fullValue[0] : fullValue}
            defaultValue={defaultValue}
            onUpdate={this.setValue}
          />
        </Field>
        {!this.isRange() ? null : (
          <Field {...this.props} label={_('Upper Bound')} attr={attr}>
            <TextInput
              value={Array.isArray(fullValue) ? fullValue[1] : fullValue}
              defaultValue={defaultValue}
              onUpdate={this.setValueMax}
            />
          </Field>
        )}
      </div>
    );
  }
}

UnconnectedFilterValue.propTypes = {
  defaultValue: PropTypes.string,
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};
UnconnectedFilterValue.contextTypes = {
  localize: PropTypes.func,
  container: PropTypes.object,
};

export const FilterOperation = connectToContainer(UnconnectedFilterOperation);
export const FilterValue = connectToContainer(UnconnectedFilterValue);

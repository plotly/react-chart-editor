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
    label: 'Include Range',
    value: 'inrange',
  },
  {
    label: 'Exclude Range',
    value: 'exrange',
  },
  {
    label: 'Include Values',
    value: 'inset',
  },
  {
    label: 'Exclude Values',
    value: 'exset',
  },
];

const operations = {
  inequality: [
    {value: '<', label: 'Target < Reference'},
    {value: '<=', label: 'Target ≤ Reference'},
    {value: '=', label: 'Target = Reference'},
    {value: '>', label: 'Target > Reference'},
    {value: '>=', label: 'Target ≥ Reference'},
  ],
  inrange: [
    {value: '[]', label: 'Lower ≤ Target ≤ Upper'},
    {value: '()', label: 'Lower < Target < Upper'},
    {value: '[)', label: 'Lower ≤ Target < Upper'},
    {value: '(]', label: 'Lower < Target ≤ Upper'},
  ],
  exrange: [
    {value: ')(', label: 'Lower ≤ Target ≤ Upper'},
    {value: '][', label: 'Lower < Target < Upper'},
    {value: ')[', label: 'Lower ≤ Target < Upper'},
    {value: '](', label: 'Lower < Target ≤ Upper'},
  ],
  inset: [{value: '{}', label: 'Include'}],
  exset: [{value: '}{', label: 'Exclude'}],
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
          {this.state.operation === 'inset' ||
          this.state.operation === 'exset' ? null : (
            <DropdownWidget
              backgroundDark={backgroundDark}
              options={operations[this.state.operation]}
              value={opValue}
              onChange={updatePlot}
              clearable={false}
              optionRenderer={optionRenderer}
              valueRenderer={valueRenderer}
            />
          )}
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
  }

  setValue(v) {
    const op = findOperation(this.context.container.operation);
    this.setState({value: v});
    let val;
    val = op === 'inrange' || op === 'exrange' ? [v, this.state.valueMax] : v;
    if (op === 'inset' || op === 'exset') {
      val = val.split(',');
      val = val.map(v => v.trim());
    }
    this.props.updatePlot(val);
  }

  setValueMax(v) {
    this.setState({valueMax: v});
    this.props.updatePlot([this.state.value, v]);
  }

  render() {
    const {localize: _, container} = this.context;

    const operation =
      container && container.operation ? container.operation : '=';

    const {fullValue, attr, defaultValue} = this.props;
    const op = findOperation(operation);

    let label1 = _('Target');
    if (op === 'inrange' || op === 'exrange') {
      label1 = _('Lower Bound');
    } else if (op === 'inset' || op === 'exset') {
      label1 = _('Values');
    }

    let val1 = fullValue;
    if ((op === 'inset' || op === 'exset') && Array.isArray(fullValue)) {
      val1 = fullValue.join(', ');
    } else if (Array.isArray(fullValue)) {
      val1 = fullValue[0];
    }

    return (
      <div>
        <Field {...this.props} label={label1}>
          <TextInput
            value={val1}
            defaultValue={val1}
            onUpdate={this.setValue}
          />
        </Field>
        {!(op === 'inrange' || op === 'exrange') ? null : (
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

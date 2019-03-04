import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import DropdownWidget from '../widgets/Dropdown';
import TextInput from '../widgets/TextInput';
import {connectToContainer} from 'lib';

const operations = _ => ({
  inequality: [
    {value: '!=', label: _('Target ≠ Reference')},
    {value: '<', label: _('Target < Reference')},
    {value: '<=', label: _('Target ≤ Reference')},
    {value: '=', label: _('Target = Reference')},
    {value: '>', label: _('Target > Reference')},
    {value: '>=', label: _('Target ≥ Reference')},
  ],
  inrange: [
    {value: '[]', label: _('Lower ≤ Target ≤ Upper')},
    {value: '()', label: _('Lower < Target < Upper')},
    {value: '[)', label: _('Lower ≤ Target < Upper')},
    {value: '(]', label: _('Lower < Target ≤ Upper')},
  ],
  exrange: [
    {value: ')(', label: _('Lower ≤ Target ≤ Upper')},
    {value: '][', label: _('Lower < Target < Upper')},
    {value: ')[', label: _('Lower ≤ Target < Upper')},
    {value: '](', label: _('Lower < Target ≤ Upper')},
  ],
  inset: [{value: '{}', label: _('Include')}],
  exset: [{value: '}{', label: _('Exclude')}],
});

const findOperation = (operator, _) => {
  let op = 'inequality';
  const ops = operations(_);
  for (const key in ops) {
    if (ops.hasOwnProperty(key) && ops[key].map(o => o.value).indexOf(operator) !== -1) {
      op = key;
      break;
    }
  }
  return op;
};

class UnconnectedFilterOperation extends Component {
  constructor(props, context) {
    super(props, context);
    const {localize: _} = context;

    this.state = {
      operation: findOperation(this.props.fullValue, _),
      operator: operations(_).inequality[0].value,
    };

    this.setOperation = this.setOperation.bind(this);
  }

  setOperation(value) {
    const {localize: _} = this.context;
    const operator = operations(_)[value][0].value;
    this.setState({operation: value, operator: operator});
    this.props.updatePlot(operator);
  }

  render() {
    const {fullValue, updatePlot, backgroundDark, attr} = this.props;
    const {localize: _} = this.context;

    const operators = [
      {
        label: _('Inequality'),
        value: 'inequality',
      },
      {
        label: _('Include Range'),
        value: 'inrange',
      },
      {
        label: _('Exclude Range'),
        value: 'exrange',
      },
      {
        label: _('Include Values'),
        value: 'inset',
      },
      {
        label: _('Exclude Values'),
        value: 'exset',
      },
    ];

    const opValue = fullValue && fullValue.length > 0 ? fullValue : this.state.operator;
    return (
      <div>
        <Field {...this.props} attr={attr}>
          <DropdownWidget
            backgroundDark={backgroundDark}
            options={operators}
            value={findOperation(opValue, _)}
            onChange={this.setOperation}
            clearable={false}
          />
          {this.state.operation === 'inset' || this.state.operation === 'exset' ? null : (
            <DropdownWidget
              backgroundDark={backgroundDark}
              options={operations(_)[this.state.operation]}
              value={opValue}
              onChange={updatePlot}
              clearable={false}
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
UnconnectedFilterOperation.contextTypes = {
  localize: PropTypes.func,
};

class UnconnectedFilterValue extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {value: '', valueMax: ''};

    this.setValue = this.setValue.bind(this);
    this.setValueMax = this.setValueMax.bind(this);
  }

  setValue(v) {
    const {localize: _, container} = this.context;
    const op = findOperation(container.operation, _);
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

    const operation = container && container.operation ? container.operation : '=';

    const {fullValue, attr, defaultValue} = this.props;
    const op = findOperation(operation, _);

    let label1 = _('Reference');
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
          <TextInput value={val1} defaultValue={val1} onUpdate={this.setValue} />
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

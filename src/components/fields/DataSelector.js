import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer} from 'lib';

export function attributeIsData(meta = {}) {
  return meta.valType === 'data_array' || meta.arrayOk;
}

export class UnconnectedDataSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.updatePlot = this.updatePlot.bind(this);
    this.setLocals(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    this.dataSources = context.dataSources || {};
    this.dataSourceOptions = context.dataSourceOptions || [];

    this.srcAttr = props.attr + 'src';
    this.srcProperty = nestedProperty(props.container, this.srcAttr);
    this.fullValue = this.srcProperty.get();

    this.is2D =
      (props.attr === 'z' &&
        ['contour', 'heatmap', 'surface', 'heatmapgl'].includes(
          props.container.type
        )) ||
      (props.container.type === 'table' && props.attr !== 'columnorder');
  }

  updatePlot(value) {
    if (!this.props.updateContainer) {
      return;
    }
    const update = {};

    if (Array.isArray(value)) {
      update[this.props.attr] = value
        .filter(v => Array.isArray(this.dataSources[v]))
        .map(v => this.dataSources[v]);

      // Table traces have many configuration options,
      // The below attributes can be 2d or 1d and will affect the plot differently
      // EX:
      // header.values = ['Jan', 'Feb', 'Mar'] => will put data in a row
      // header.values = [['Jan', 1], ['Feb', 2], ['Mar', 3]] => will create 3 columns
      // 1d arrays affect columns
      // 2d arrays affect rows within each column

      if (
        this.props.container.type === 'table' &&
        value.length === 1 &&
        [
          'header.values',
          'header.font.color',
          'header.font.size',
          'header.fill.color',
          'columnwidth',
        ].includes(this.props.attr)
      ) {
        update[this.props.attr] = update[this.props.attr][0];
      }
    } else {
      update[this.props.attr] = this.dataSources[value] || null;
    }
    update[this.srcAttr] = value;

    this.props.updateContainer(update);
  }

  render() {
    const {label} = this.props;
    let newLabel;
    if (typeof label === 'object') {
      const traceType = this.props.container.type;
      if (label[traceType]) {
        newLabel = label[traceType];
      } else {
        newLabel = label['*'];
      }
    } else {
      newLabel = label;
    }

    return (
      <Field {...{...this.props, label: newLabel}}>
        <DropdownWidget
          options={this.dataSourceOptions}
          value={this.fullValue}
          onChange={this.updatePlot}
          multi={this.is2D}
          optionRenderer={this.context.dataSourceOptionRenderer}
          valueRenderer={this.context.dataSourceValueRenderer}
          clearable={true}
        />
      </Field>
    );
  }
}

UnconnectedDataSelector.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  container: PropTypes.object,
  ...Field.propTypes,
};

UnconnectedDataSelector.contextTypes = {
  dataSources: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSourceValueRenderer: PropTypes.func,
  dataSourceOptionRenderer: PropTypes.func,
};

function modifyPlotProps(props, context, plotProps) {
  if (attributeIsData(plotProps.attrMeta)) {
    plotProps.isVisible = true;
  }
}

export default connectToContainer(UnconnectedDataSelector, {modifyPlotProps});

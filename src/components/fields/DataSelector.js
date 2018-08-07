import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer, maybeAdjustSrc, maybeTransposeData} from 'lib';
import {TRANSFORMS_LIST} from 'lib/constants';

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
    this.srcProperty = nestedProperty(props.container, this.srcAttr).get();
    this.fullValue = this.context.srcConverters
      ? this.context.srcConverters.toSrc(this.srcProperty, props.container.type)
      : this.srcProperty;

    this.is2D = false;
    if (props.container) {
      this.is2D =
        (props.attr === 'z' &&
          [
            'contour',
            'contourgl',
            'heatmap',
            'heatmapgl',
            'surface',
            'carpet',
            'contourcarpet',
          ].includes(props.container.type)) ||
        (props.container.type === 'table' && props.attr !== 'columnorder') ||
        Array.isArray(this.fullValue);
    }

    this.hasData = props.attr in props.container;
  }

  updatePlot(value) {
    if (!this.props.updateContainer) {
      return;
    }

    const update = {};
    let data;

    if (Array.isArray(value)) {
      data = value
        .filter(v => Array.isArray(this.dataSources[v]))
        .map(v => this.dataSources[v]);
    } else {
      data = this.dataSources[value] || null;
    }

    update[this.props.attr] = maybeTransposeData(
      data,
      this.srcAttr,
      this.props.container.type
    );
    update[this.srcAttr] = maybeAdjustSrc(
      value,
      this.srcAttr,
      this.props.container.type,
      {
        fromSrc: this.context.srcConverters
          ? this.context.srcConverters.fromSrc
          : null,
      }
    );
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
          placeholder={
            this.hasData ? 'Data inlined in figure' : 'Choose data...'
          }
          disabled={this.dataSourceOptions.length === 0}
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
  srcConverters: PropTypes.shape({
    toSrc: PropTypes.func.isRequired,
    fromSrc: PropTypes.func.isRequired,
  }),
};

function modifyPlotProps(props, context, plotProps) {
  if (
    attributeIsData(plotProps.attrMeta) &&
    (context.container &&
      TRANSFORMS_LIST.indexOf(context.container.type) === -1)
  ) {
    plotProps.isVisible = true;
  }
}

export default connectToContainer(UnconnectedDataSelector, {modifyPlotProps});

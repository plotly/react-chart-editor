import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer, maybeAdjustSrc, maybeTransposeData} from 'lib';

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
        (props.container.type === 'table' && props.attr !== 'columnorder');
    }

    if (
      this.is2D &&
      this.fullValue &&
      this.fullValue.length &&
      this.context.customSrcHandling
    ) {
      this.fullValue = this.context.customSrcHandling.splitSrcs(this.fullValue);
    }
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
        joinSrcs: this.context.customSrcHandling
          ? this.context.customSrcHandling.joinSrcs
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
  customSrcHandling: PropTypes.object,
};

function modifyPlotProps(props, context, plotProps) {
  if (attributeIsData(plotProps.attrMeta)) {
    plotProps.isVisible = true;
  }
}

export default connectToContainer(UnconnectedDataSelector, {modifyPlotProps});

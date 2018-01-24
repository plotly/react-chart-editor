import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer} from 'lib';

function attributeIsData(meta = {}) {
  return meta.valType === 'data_array' || meta.arrayOk;
}

class DataSelector extends Component {
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
    this.dataSrcExists = false;
    if (attributeIsData(props.attrMeta)) {
      this.dataSrcExists = true;
      this.srcAttr = props.attr + 'src';
      this.srcProperty = nestedProperty(props.container, this.srcAttr);
    }

    if (this.dataSrcExists) {
      this.fullValue = this.srcProperty.get();
    } else {
      this.fullValue = this.props.fullValue;
    }

    this.is2D =
      props.attr === 'z' &&
      ['contour', 'heatmap', 'surface'].includes(props.container.type);
  }

  updatePlot(value) {
    if (!this.props.updateContainer) {
      return;
    }
    const update = {};
    if (this.dataSrcExists) {
      const srcAttr = this.srcAttr;
      update[srcAttr] = value;

      if (!value) {
        /*
         * when !value, then we're deleting ${attr}src, let's also clan up the
         * related src to prevent issues when switching plots (i.e. candlestick -> box plot)
         * ex: clean up both xsrc and x from gd.data
         */
        update[srcAttr.replace('src', '')] = value;
      }
    }

    if (!Array.isArray(value)) {
      if (Array.isArray(this.dataSources[value])) {
        update[this.props.attr] = this.dataSources[value];
      }
    } else {
      update[this.props.attr] = value
        .filter(v => Array.isArray(this.dataSources[v]))
        .map(v => this.dataSources[v]);
    }

    this.props.updateContainer(update);
  }

  render() {
    return (
      <Field {...this.props}>
        <DropdownWidget
          options={this.dataSourceOptions}
          value={this.fullValue}
          onChange={this.updatePlot}
          multi={this.is2D}
          optionRenderer={this.context.dataSourceOptionRenderer}
          valueRenderer={this.context.dataSourceValueRenderer}
          clearable={this.props.clearable}
        />
      </Field>
    );
  }
}

DataSelector.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  clearable: PropTypes.bool,
  ...Field.propTypes,
};

DataSelector.contextTypes = {
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

export default connectToContainer(DataSelector, {modifyPlotProps});

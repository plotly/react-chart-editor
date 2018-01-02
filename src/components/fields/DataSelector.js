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
  }

  updatePlot(value) {
    if (!this.props.updateContainer) {
      return;
    }
    const update = {};
    if (this.dataSrcExists) {
      update[this.srcAttr] = value;
    }

    if (Array.isArray(this.dataSources[value])) {
      update[this.props.attr] = this.dataSources[value];
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
};

function modifyPlotProps(props, context, plotProps) {
  if (attributeIsData(plotProps.attrMeta)) {
    plotProps.isVisible = true;
  }
}

export default connectToContainer(DataSelector, {modifyPlotProps});

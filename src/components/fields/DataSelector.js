import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {bem, connectToContainer} from '../../lib';

function attributeIsData(meta = {}) {
  return meta.valType === 'data_array' || meta.arrayOk;
}

class DataSelector extends Component {
  static unpackPlotProps(props, context, plotProps) {
    if (attributeIsData(plotProps.attrMeta)) {
      plotProps.isVisible = true;
    }
  }

  constructor(props, context) {
    super(props);

    this.setLocals(props);
    this.updatePlot = this.updatePlot.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setLocals(nextProps);
  }

  setLocals(props) {
    this.dataSrcExists = false;
    if (attributeIsData(props.attrMeta)) {
      this.dataSrcExists = true;
      this.srcAttr = props.attr + 'src';
      this.srcProperty = nestedProperty(props.container, this.srcAttr);
    }
  }

  fullValue() {
    if (this.dataSrcExists) {
      return this.srcProperty.get();
    }
    return this.props.fullValue();
  }

  updatePlot(value) {
    const attr = this.dataSrcExists ? this.srcAttr : this.props.attr;
    this.props.updateContainer && this.props.updateContainer({[attr]: value});
  }

  render() {
    return (
      <Field {...this.props}>
        <DropdownWidget
          options={this.props.options}
          value={this.fullValue()}
          onChange={this.updatePlot}
          clearable={this.props.clearable}
        />
      </Field>
    );
  }
}

DataSelector.propTypes = {
  fullValue: PropTypes.func,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  clearable: PropTypes.bool,
  ...Field.propTypes,
};

export default connectToContainer(DataSelector);

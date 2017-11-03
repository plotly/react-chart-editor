import DropdownWidget from './widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {bem, connectToPlot} from '../lib';

function attributeIsData(meta = {}) {
  return meta.valType === 'data_array' || meta.arrayOk;
}

class DataSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.setLocals(props, context);
    this.updatePlot = this.updatePlot.bind(this);
  }

  static unpackPlotProps(props, context, plotProps) {
    if (attributeIsData(plotProps.attrMeta)) {
      plotProps.isVisible = true;
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    this.dataSrcExists = false;
    if (attributeIsData(props.attrMeta)) {
      this.dataSrcExists = true;
      this.srcAttr = props.attr + 'src';
      this.srcProperty = nestedProperty(props.trace, this.srcAttr);
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
    const update = {[attr]: [value]};
    this.props.onUpdate && this.props.onUpdate(update, [this.props.traceIndex]);
  }

  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget')}>
          <DropdownWidget
            options={this.props.options}
            value={this.fullValue()}
            onChange={this.updatePlot}
            clearable={this.props.clearable}
          />
        </div>
      </div>
    );
  }
}

DataSelector.contextTypes = {
  plotSchema: PropTypes.object,
};

export default connectToPlot(DataSelector);

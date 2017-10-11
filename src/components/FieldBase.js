import React, { Component } from "react";
import PropTypes from "prop-types";
import nestedProperty from "plotly.js/src/lib/nested_property";

const SRC_ATTR_PATTERN = /src$/;

class FieldBase extends Component {
  constructor(props, context) {
    super(props);

    this.setLocals(props, context);

    this.dataSources = context.dataSources;
    this.dataSourceNames = context.dataSourceNames;

    this.updatePlot = this.updatePlot.bind(this);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    props = props || this.props;

    this._index = context.traceIndex;

    // gd, data, fullData:
    this._gd = context.graphDiv;
    this._data = context.data[this._index] || [];
    this._fullData = context.fullData[this._index] || [];

    // Property accessors:
    this._fullProperty = nestedProperty(this._fullData, props.attr);
    this._property = nestedProperty(this._data, props.attr);

    this._contextUpdate = context.handleUpdate;
  }

  updatePlot(value) {
    this._contextUpdate && this._contextUpdate(this.props.attr, value);
  }

  get value() {
    return this._property.get();
  }

  get fullValue() {
    if (SRC_ATTR_PATTERN.test(this.props.attr)) {
      return this._property.get();
    } else {
      return this._fullProperty.get();
    }
  }

  set value(newValue) {
    this._property.set(newValue);
    this._contextUpdate(this._gd, this._data, this.props.attr, newValue);
  }

  render() {
    var full = this.fullValue;
    if ((full !== undefined && full !== null) || this.props.show) {
      return this.renderField();
    } else {
      return <div />;
    }
  }
}

FieldBase.contextTypes = {
  graphDiv: PropTypes.any,
  data: PropTypes.array,
  fullData: PropTypes.array,
  layout: PropTypes.object,
  fullLayout: PropTypes.object,
  handleUpdate: PropTypes.func,
  traceIndex: PropTypes.number,
};

FieldBase.defaultProps = {
  show: false,
};

export default FieldBase;

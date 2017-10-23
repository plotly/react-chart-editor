import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';

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
    this._isSrc = SRC_ATTR_PATTERN.test(this.props.attr);

    // gd, data, fullData:
    this._gd = context.graphDiv;
    this._data = context.data[this._index] || [];
    this._fullData = context.fullData[this._index] || [];

    // Property accessors:
    this._fullProperty = nestedProperty(this._fullData, props.attr);
    this._property = nestedProperty(this._data, props.attr);
    if (this._isSrc) {
      const derefAttr = props.attr.slice(0, props.attr.length - 3);
      this._derefProperty = nestedProperty(this._fullData, derefAttr);
    }

    this.onUpdate = context.onUpdate;
  }

  updatePlot(value) {
    let update = {};
    update[this.props.attr] = [value];
    this.onUpdate && this.onUpdate(update, [this._index]);
  }

  get value() {
    return this._property.get();
  }

  get fullValue() {
    if (this._isSrc) {
      return this._property.get();
    } else {
      return this._fullProperty.get();
    }
  }

  render() {
    let fullValue;

    // if this is a src reference we want to show or hide the component based
    // on the full dereferenced value. Ie if this is `xsrc` we want to check the
    // fullData `x`.
    if (this._derefProperty) {
      fullValue = this._derefProperty.get();
    } else {
      fullValue = this.fullValue;
    }
    if ((fullValue !== undefined && fullValue !== null) || this.props.show) {
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
  onUpdate: PropTypes.func,
  traceIndex: PropTypes.number
};

FieldBase.defaultProps = {
  show: false
};

export default FieldBase;

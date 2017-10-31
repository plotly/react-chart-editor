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
    this.plotSchema = context.plotSchema;

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
    this._trace = context.data[context.traceIndex] || {};
    this._fullTrace = context.fullData[context.fullTraceIndex] || {};

    // Property accessors:
    this._fullProperty = nestedProperty(this._fullTrace, props.attr);
    this._property = nestedProperty(this._trace, props.attr);

    const traceAttr = `${this._fullTrace.type}.attributes.${props.attr}`;
    const attr = nestedProperty(context.plotSchema.traces, traceAttr).get();
    if (attr && (attr.valType === 'data_array' || attr.arrayOk)) {
      this._refAttr = `${props.attr}src`;
      this._refProperty = nestedProperty(this._trace, this._refAttr);
    } else {
      this._refAttr = void 0;
      this._refProperty = void 0;
    }

    this.onUpdate = context.onUpdate;
  }

  updatePlot(value) {
    let update = {};

    if (this._refAttr) {
      update[this._refAttr] = [value];
    } else {
      update[this.props.attr] = [value];
    }

    this.onUpdate && this.onUpdate(update, [this._index]);
  }

  get value() {
    return this._property.get();
  }

  get fullValue() {
    if (this._refAttr) {
      return this._refProperty.get();
    } else {
      return this._fullProperty.get();
    }
  }

  render() {
    const fullValue = this.fullValue;

    // if this is a src reference we always show the option as the user may
    // want to select data even if the attribute isn't yet present in fullData.
    if (
      this.props.show ||
      this._refAttr ||
      (fullValue !== undefined && fullValue !== null)
    ) {
      return this.renderField();
    } else {
      return <div />;
    }
  }
}

FieldBase.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  fullTraceIndex: PropTypes.number,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  plotSchema: PropTypes.object,
  traceIndex: PropTypes.number,
};

FieldBase.defaultProps = {
  show: false,
};

export default FieldBase;

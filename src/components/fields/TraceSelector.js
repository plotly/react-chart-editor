import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer} from '../../lib';

class TraceSelector extends Component {
  constructor(props) {
    super(props);
    this.updatePlot = this.updatePlot.bind(this);
    this.fullValue = this.fullValue.bind(this);

    const fillMeta = props.getValObject('fill');
    if (fillMeta) {
      this.fillTypes = fillMeta.values.filter(v => v !== 'none');
    } else {
      this.fillTypes = [];
    }
  }

  updatePlot(value) {
    let update;
    if (value === 'line') {
      update = {type: 'scatter', mode: 'lines', fill: 'none'};
    } else if (value === 'scatter') {
      update = {type: 'scatter', mode: 'markers', fill: 'none'};
    } else if (value === 'area') {
      update = {type: 'scatter', fill: 'tozeroy'};
    } else {
      update = {type: value};
    }

    if (this.props.updateContainer) {
      this.props.updateContainer(update);
    }
  }

  fullValue() {
    const {container, fullValue} = this.props;
    const type = fullValue();

    // If we used fullData mode or fill it may be undefined if the fullTrace
    // is not visible and therefore does not have these values computed.
    const mode = nestedProperty(container, 'mode').get();
    const fill = nestedProperty(container, 'fill').get();

    if (type === 'scatter' && this.fillTypes.includes(fill)) {
      return 'area';
    }

    if (type === 'scatter' && mode === 'lines') {
      return 'line';
    }

    return type;
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
    });

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.propTypes = {
  getValObject: PropTypes.func.isRequired,
  container: PropTypes.object.isRequired,
  fullValue: PropTypes.func.isRequired,
  updateContainer: PropTypes.func,
};

export default connectToContainer(TraceSelector);

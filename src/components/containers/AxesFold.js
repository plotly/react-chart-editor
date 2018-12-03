import AxesSelector from '../fields/AxesSelector';
import PlotlyFold from './PlotlyFold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAxesToLayout} from 'lib';
import {recursiveMap} from '../../lib/recursiveMap';

class AxesFold extends Component {
  render() {
    const {children, options} = this.props;
    return options.length && children ? (
      <PlotlyFold {...this.props}>
        {options.length === 1 ? null : (
          <AxesSelector axesOptions={options} context={this.props.context} />
        )}
        {recursiveMap(children, this.props.context)}
      </PlotlyFold>
    ) : null;
  }
}

AxesFold.propTypes = {
  children: PropTypes.any,
  options: PropTypes.array,
  context: PropTypes.any,
};

AxesFold.plotly_editor_traits = {foldable: true};

export default connectAxesToLayout(AxesFold);

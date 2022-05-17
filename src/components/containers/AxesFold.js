import AxesSelector from '../fields/AxesSelector';
import PlotlyFold from './PlotlyFold';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectAxesToLayout} from 'lib';

class AxesFold extends Component {
  render() {
    const {children, options} = this.props;
    return options.length && children ? (
      <PlotlyFold {...this.props}>
        {options.length === 1 ? null : <AxesSelector axesOptions={options} />}
        {children}
      </PlotlyFold>
    ) : null;
  }
}

AxesFold.propTypes = {
  children: PropTypes.any,
  options: PropTypes.array,
};

AxesFold.plotly_editor_traits = {foldable: true};

export default connectAxesToLayout(AxesFold);

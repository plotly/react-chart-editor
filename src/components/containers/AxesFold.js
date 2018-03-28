import AxesSelector from '../fields/AxesSelector';
import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAxesToLayout} from 'lib';

class AxesFold extends Component {
  render() {
    const {children, options} = this.props;
    return options.length && children ? (
      <Fold {...this.props}>
        {options.length === 1 ? null : <AxesSelector axesOptions={options} />}
        {children}
      </Fold>
    ) : null;
  }
}

AxesFold.propTypes = {
  children: PropTypes.any,
  options: PropTypes.array,
};

AxesFold.plotly_editor_traits = {foldable: true};

export default connectAxesToLayout(AxesFold);

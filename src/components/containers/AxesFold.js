import AxesSelector from '../fields/AxesSelector';
import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAxesToLayout} from 'lib';

class AxesFold extends Component {
  render() {
    return this.props.children ? (
      <Fold {...this.props}>
        <AxesSelector />
        {this.props.children}
      </Fold>
    ) : null;
  }
}

AxesFold.propTypes = {
  children: PropTypes.any,
};

AxesFold.plotly_editor_traits = {foldable: true};

export default connectAxesToLayout(AxesFold);

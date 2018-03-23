import AxesSelector from '../fields/AxesSelector';
import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAxesToLayout} from 'lib';

class AxesFold extends Component {
  renderAxesSelector() {
    if (this.props.options.length > 1) {
      return <AxesSelector axesOptions={this.props.options} />;
    }
    return null;
  }

  render() {
    return this.props.children ? (
      <Fold {...this.props}>
        {this.renderAxesSelector()}
        {this.props.children}
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';

export default function connectSubplotToLayout(WrappedComponent) {
  class SubplotConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.deleteSubplot = this.deleteSubplot.bind(this);
      this.updateSubplot = this.updateSubplot.bind(this);
    }

    getChildContext() {
      return {
        container: this.props.subplotInfo,
        fullContainer: this.props.subplotInfo,
        deleteContainer: this.deleteSubplot,
        updateContainer: this.updateSubplot,
      };
    }

    updateSubplot(update) {
      this.props.updateSubplot(update, this.props.subplotIndex);
    }

    deleteSubplot() {
      this.props.deleteSubplot(this.props.subplotIndex);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  SubplotConnectedComponent.displayName = `SubplotConnected${getDisplayName(
    WrappedComponent
  )}`;

  SubplotConnectedComponent.propTypes = {
    subplotIndex: PropTypes.number.isRequired,
    subplotInfo: PropTypes.object,
    deleteSubplot: PropTypes.func,
    updateSubplot: PropTypes.func,
  };

  SubplotConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    layout: PropTypes.object,
  };

  SubplotConnectedComponent.childContextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    deleteContainer: PropTypes.func,
    updateContainer: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}

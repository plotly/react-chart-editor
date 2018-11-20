import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {recursiveMap} from './recursiveMap';

export default function connectSliderToLayout(WrappedComponent) {
  class SliderConnectedComponent extends Component {
    constructor(props) {
      super(props);
      this.updateSlider = this.updateSlider.bind(this);
      this.setLocals(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLocals(nextProps);
    }

    setLocals(props) {
      const {context, sliderIndex} = props;
      const {container, fullContainer} = context;

      const sliders = container.sliders || [];
      const fullSliders = fullContainer.sliders || [];
      this.container = sliders[sliderIndex];
      this.fullContainer = fullSliders[sliderIndex];
    }

    // getChildContext() {
    //   return {
    //     getValObject: attr =>
    //       !this.context.getValObject ? null : this.context.getValObject(`sliders[].${attr}`),
    //     updateContainer: this.updateSlider,
    //     container: this.container,
    //     fullContainer: this.fullContainer,
    //   };
    // }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`sliders[].${attr}`),
        updateContainer: this.updateSlider,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateSlider(update) {
      const newUpdate = {};
      const {sliderIndex} = this.props;
      for (const key in update) {
        const newkey = `sliders[${sliderIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.props.context.updateContainer(newUpdate);
    }

    render() {
      const newProps = {...this.props, context: this.provideValue()};
      if (this.props.children) {
        return (
          <WrappedComponent {...newProps}>
            {recursiveMap(this.props.children, this.provideValue())}
          </WrappedComponent>
        );
      }
      return <WrappedComponent {...newProps} />;
    }
  }

  SliderConnectedComponent.displayName = `SliderConnected${getDisplayName(WrappedComponent)}`;

  SliderConnectedComponent.propTypes = {
    sliderIndex: PropTypes.number.isRequired,
  };

  SliderConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  // SliderConnectedComponent.contextTypes = {
  //   container: PropTypes.object,
  //   fullContainer: PropTypes.object,
  //   onUpdate: PropTypes.func,
  //   updateContainer: PropTypes.func,
  //   getValObject: PropTypes.func,
  // };
  //
  // SliderConnectedComponent.childContextTypes = {
  //   updateContainer: PropTypes.func,
  //   container: PropTypes.object,
  //   fullContainer: PropTypes.object,
  //   getValObject: PropTypes.func,
  // };

  const {plotly_editor_traits} = WrappedComponent;
  SliderConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SliderConnectedComponent;
}

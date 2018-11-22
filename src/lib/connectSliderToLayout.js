import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {recursiveMap} from './recursiveMap';
import {EditorControlsContext} from '../context';

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

  SliderConnectedComponent.contextType = EditorControlsContext;

  SliderConnectedComponent.requireContext = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };
  SliderConnectedComponent.propTypes = {
    sliderIndex: PropTypes.number.isRequired,
    children: PropTypes.node,
    context: PropTypes.any,
  };

  const {plotly_editor_traits} = WrappedComponent;
  SliderConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SliderConnectedComponent;
}

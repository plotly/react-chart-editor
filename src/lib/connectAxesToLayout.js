import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
import {
  capitalize,
  getAllAxes,
  getDisplayName,
  localize,
  getAxisTitle,
} from '../lib';

function computeAxesOptions(axes, props) {
  const _ = props.localize;
  let filteredAxes = axes;

  if (props.name === 'Range Slider') {
    filteredAxes = axes.filter(axis => axis._subplot.includes('xaxis'));
  }

  if (props.name === 'Timescale Buttons') {
    filteredAxes = axes.filter(
      axis => axis._subplot.includes('xaxis') && axis.type === 'date'
    );
  }

  if (props.name === 'Titles') {
    filteredAxes = axes.filter(axis => !axis._name.includes('angular'));
  }

  if (['Zoom Interactivity', 'Hover Projections'].includes(props.name)) {
    filteredAxes = axes.filter(
      axis => !axis._name.includes('angular') && !axis._name.includes('radial')
    );
  }

  if (props.name === 'Layout') {
    filteredAxes = axes.filter(axis => !axis._name.includes('radial'));
  }

  const options = [];
  for (let i = 0; i < filteredAxes.length; i++) {
    const ax = filteredAxes[i];
    const label = capitalize(ax._name.split('axis')[0]);
    const value = (ax._subplot &&
    !ax._subplot.includes('xaxis') &&
    !ax._subplot.includes('yaxis')
      ? ax._subplot + '.' + ax._name
      : ax._subplot
    ).trim();

    options[i] = {
      label,
      value,
      axisGroup: ax._axisGroup,
      title: getAxisTitle(ax),
    };
  }

  return options.length > 1
    ? [{label: _('All'), value: 'allaxes'}].concat(options)
    : options;
}

export default function connectAxesToLayout(WrappedComponent) {
  class AxesConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.axes = getAllAxes(context.fullContainer);
      this.axesOptions = computeAxesOptions(this.axes, props, context);
      const defaultAxesTarget = this.axesOptions.length
        ? this.axesOptions[0].value
        : null;

      this.state = {
        axesTarget: defaultAxesTarget,
      };

      this.axesTargetHandler = this.axesTargetHandler.bind(this);
      this.updateContainer = this.updateContainer.bind(this);

      this.setLocals(props, this.state, context);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      this.axes = getAllAxes(nextContext.fullContainer);
      this.axesOptions = computeAxesOptions(this.axes, nextProps, nextContext);
      // This is not enough, what if plotly.js adds new axes...
      this.setLocals(nextProps, nextState, nextContext);
    }

    setLocals(nextProps, nextState, nextContext) {
      const {container, fullContainer} = nextContext;
      const {axesTarget} = nextState;

      if (axesTarget === 'allaxes') {
        const multiValuedContainer = deepCopyPublic(this.axes[0]);
        this.axes.slice(1).forEach(ax =>
          Object.keys(ax).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, ax, key, {
              searchArrays: true,
            })
          )
        );
        this.fullContainer = multiValuedContainer;
        this.defaultContainer = this.axes[0];
        this.container = {};
      } else if (axesTarget) {
        this.fullContainer = nestedProperty(fullContainer, axesTarget).get();
        this.container = this.container =
          nestedProperty(container, axesTarget).get() || {};
      }
    }

    getChildContext() {
      return {
        axesOptions: this.axesOptions,
        axesTarget: this.state.axesTarget,
        axesTargetHandler: this.axesTargetHandler,
        container: this.container,
        defaultContainer: this.defaultContainer,
        fullContainer: this.fullContainer,
        updateContainer: this.updateContainer,
      };
    }

    axesTargetHandler(axesTarget) {
      this.setState({axesTarget});
    }

    updateContainer(update) {
      const newUpdate = {};
      const {axesTarget} = this.state;

      let axes = this.axes;
      if (axesTarget !== 'allaxes') {
        // only the selected container
        axes = [this.fullContainer];
      }

      const keys = Object.keys(update);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < axes.length; j++) {
          const subplot = axes[j]._subplot;
          let axesKey = axes[j]._name;

          if (
            subplot &&
            !subplot.includes('xaxis') &&
            !subplot.includes('yaxis')
          ) {
            axesKey = `${subplot}.${axesKey}`;
          }

          const newkey = `${axesKey}.${keys[i]}`;
          newUpdate[newkey] = update[keys[i]];
        }
      }

      this.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent {...this.props} options={this.axesOptions} />;
    }
  }

  AxesConnectedComponent.displayName = `AxesConnected${getDisplayName(
    WrappedComponent
  )}`;

  AxesConnectedComponent.propTypes = {
    localize: PropTypes.func,
  };

  AxesConnectedComponent.contextTypes = {
    container: PropTypes.object.isRequired,
    fullContainer: PropTypes.object.isRequired,
    updateContainer: PropTypes.func,
  };

  AxesConnectedComponent.childContextTypes = {
    axesOptions: PropTypes.array,
    axesTarget: PropTypes.string,
    axesTargetHandler: PropTypes.func,
    container: PropTypes.object,
    defaultContainer: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AxesConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return localize(AxesConnectedComponent);
}

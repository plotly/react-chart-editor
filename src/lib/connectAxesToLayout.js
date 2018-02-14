import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
import {getDisplayName, localize} from '../lib';

function computeAxesOptions(axes, _) {
  const options = [{label: _('All'), value: 'allaxes'}];
  for (let i = 0; i < axes.length; i++) {
    const ax = axes[i];
    const label = ax._name
      .split('axis')[0]
      .charAt(0)
      .toUpperCase();

    const value = (ax.prefix ? ax.prefix + '.' : '').trim() + ax._name;
    options[i + 1] = {label, value};
  }

  return options;
}

export default function connectAxesToLayout(WrappedComponent) {
  class AxesConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {axesTarget: this.props.defaultAxesTarget};
      this.axesTargetHandler = this.axesTargetHandler.bind(this);
      this.updateContainer = this.updateContainer.bind(this);

      this.setLocals(props, this.state, context);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      // This is not enough, what if plotly.js adds new axes...
      this.setLocals(nextProps, nextState, nextContext);
    }

    setLocals(nextProps, nextState, nextContext) {
      const {container, fullContainer} = nextContext;
      const {axesTarget} = nextState;

      this.axes = [];

      // Plotly.js should really have a helper function for this, but until it does..
      Object.keys(fullContainer._subplots)
        .filter(
          // cartesian types will have xaxis or yaxis directly in _fullLayout
          type =>
            type !== 'cartesian' && fullContainer._subplots[type].length !== 0
        )
        .forEach(type => {
          if (['xaxis', 'yaxis'].includes(type)) {
            this.axes.push(fullContainer[type]);
          }
          if (!['xaxis', 'yaxis', 'cartesian'].includes(type)) {
            this.axes = Object.keys(
              fullContainer[fullContainer._subplots[type]]
            )
              .filter(key => key.includes('axis'))
              .map(axis => {
                // will take care of subplots after
                const prefix = fullContainer._subplots[type][0];
                fullContainer[prefix][axis].prefix = prefix;
                return fullContainer[prefix][axis];
              });
          }
        });

      this.axesOptions = computeAxesOptions(this.axes, nextProps.localize);

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
        // what should this be set to? Probably doesn't matter.
        this.container = {};
      } else {
        this.fullContainer = nestedProperty(fullContainer, axesTarget).get();
        this.container = nestedProperty(container, axesTarget).get();
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
          const prefix = axes[j].prefix;
          let axesKey = axes[j]._name;

          if (prefix) {
            axesKey = `${prefix}.${axesKey}`;
          }

          const newkey = `${axesKey}.${keys[i]}`;
          newUpdate[newkey] = update[keys[i]];
        }
      }

      this.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  AxesConnectedComponent.displayName = `AxesConnected${getDisplayName(
    WrappedComponent
  )}`;

  AxesConnectedComponent.propTypes = {
    defaultAxesTarget: PropTypes.string,
    localize: PropTypes.func,
  };

  AxesConnectedComponent.defaultProps = {
    defaultAxesTarget: 'allaxes',
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

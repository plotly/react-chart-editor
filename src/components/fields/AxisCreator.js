import Dropdown from './Dropdown';
import Field from './Field';
import Info from './Info';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {PlusIcon} from 'plotly-icons';
import {
  connectToContainer,
  localize,
  traceTypeToAxisType,
  getAxisTitle,
  axisIdToAxisName,
} from 'lib';

export class UnconnectedAxisCreator extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    const _ = props.localize;
    this.axisType = traceTypeToAxisType(props.container.type);
    const isFirstTraceOfType =
      context.data.filter(d => d.type === props.container.type).length === 1;

    function getNewSubplot(axis, subplot) {
      return isFirstTraceOfType
        ? axis
        : axis + (context.fullLayout._subplots[subplot].length + 1);
    }

    function getAxisControl(label, attr, subplot, update) {
      const icon = <PlusIcon />;
      return (
        <Dropdown
          label={label}
          attr={attr}
          action={!isFirstTraceOfType}
          clearable={false}
          onAction={{
            label: _('Axis'),
            variant: 'secondary',
            icon: icon,
            onClick: () => {
              props.updateContainer(update);
              if (subplot.startsWith('yaxis')) {
                const currentAxis = props.fullContainer.yaxis;
                context.onUpdate({
                  type: EDITOR_ACTIONS.UPDATE_LAYOUT,
                  payload: {
                    update: {
                      [`${subplot +
                        (context.fullLayout._subplots[subplot].length +
                          1)}.side`]: 'right',
                      [`${subplot +
                        (context.fullLayout._subplots[subplot].length +
                          1)}.overlaying`]: currentAxis,
                    },
                  },
                });
              }
            },
          }}
          options={context.fullLayout._subplots[subplot].map(subplot => ({
            label: getAxisTitle(context.fullLayout[axisIdToAxisName(subplot)]),
            value: subplot,
          }))}
        />
      );
    }

    if (this.axisType === 'cartesian') {
      this.subplotControls = (
        <Fragment>
          {getAxisControl(_('X axis'), 'xaxis', 'xaxis', {
            xaxis: getNewSubplot('x', 'xaxis'),
          })}
          {getAxisControl(_('Y axis'), 'yaxis', 'yaxis', {
            yaxis: getNewSubplot('y', 'yaxis'),
          })}
        </Fragment>
      );
    }

    if (this.axisType === 'gl3d') {
      this.subplotControls = getAxisControl(
        _('Subplot to use'),
        'scene',
        'gl3d',
        {geo: getNewSubplot('scene', 'gl3d')}
      );
    }

    if (this.axisType === 'ternary') {
      this.subplotControls = getAxisControl(
        _('Subplot to use'),
        'subplot',
        'ternary',
        {subplot: getNewSubplot('ternary', 'ternary')}
      );
    }

    if (this.axisType === 'geo') {
      this.subplotControls = getAxisControl(_('Subplot to use'), 'geo', 'geo', {
        geo: getNewSubplot('geo', 'geo'),
      });
    }

    if (this.axisType === 'mapbox') {
      this.subplotControls = getAxisControl(
        _('Subplot to use'),
        'subplot',
        'mapbox',
        {subplot: getNewSubplot('mapbox', 'mapbox')}
      );
    }
  }

  renderSubplotControls() {
    const {localize: _} = this.props;
    return (
      <Fragment>
        {this.subplotControls}
        <Info>
          {_('You can style and position your axes in the Style > Axes Panel')}
        </Info>
      </Fragment>
    );
  }

  render() {
    return <Field {...this.props}>{this.renderSubplotControls()}</Field>;
  }
}

UnconnectedAxisCreator.propTypes = {
  attr: PropTypes.string,
  localize: PropTypes.func,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
};

UnconnectedAxisCreator.contextTypes = {
  fullLayout: PropTypes.object,
  data: PropTypes.array,
  onUpdate: PropTypes.func,
};

UnconnectedAxisCreator.plotly_editor_traits = {
  is_axis_creator: true,
};

function modifyPlotProps(props, context, plotProps) {
  return plotProps.isVisible;
}
export default localize(
  connectToContainer(UnconnectedAxisCreator, {modifyPlotProps})
);

import Dropdown from './Dropdown';
import Info from './Info';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import Button from '../widgets/Button';
import {PlusIcon} from 'plotly-icons';
import {
  connectToContainer,
  localize,
  traceTypeToAxisType,
  getAxisTitle,
  axisIdToAxisName,
} from 'lib';

class UnconnectedNewAxisCreator extends Component {
  canAddAxis() {
    const currentAxisId = this.props.fullContainer[this.props.attr];
    const currentTraceIndex = this.props.fullContainer.index;
    return this.context.fullData.some(
      d => d.index !== currentTraceIndex && d[this.props.attr] === currentAxisId
    );
  }

  updateAxis() {
    const {attr, updateContainer} = this.props;
    const {onUpdate, fullLayout} = this.context;

    updateContainer({
      [attr]: attr.charAt(0) + (fullLayout._subplots[attr].length + 1),
    });

    if (attr === 'yaxis') {
      onUpdate({
        type: EDITOR_ACTIONS.UPDATE_LAYOUT,
        payload: {
          update: {
            [`${attr + (fullLayout._subplots[attr].length + 1)}.side`]: 'right',
            [`${attr +
              (fullLayout._subplots[attr].length + 1)}.overlaying`]: 'y',
          },
        },
      });
    }

    if (attr === 'xaxis') {
      onUpdate({
        type: EDITOR_ACTIONS.UPDATE_LAYOUT,
        payload: {
          update: {
            [`${attr + (fullLayout._subplots[attr].length + 1)}.side`]: 'top',
            [`${attr +
              (fullLayout._subplots[attr].length + 1)}.overlaying`]: 'x',
          },
        },
      });
    }
  }

  recalcAxes(update) {
    const currentAxisId = this.props.fullContainer[this.props.attr];

    // When we select another axis, make sure no unused axes are left
    const tracesNeedingAxisAdjustment = this.context.fullData.some(
      t =>
        t[this.props.attr] === currentAxisId &&
        t.index !== this.props.fullContainer.index
    )
      ? null
      : this.context.fullData.filter(
          trace =>
            Number(trace[this.props.attr].slice(1)) >
            Number(currentAxisId.slice(1))
        );

    this.context.onUpdate({
      type: EDITOR_ACTIONS.UPDATE_TRACES,
      payload: {
        tracesNeedingAxisAdjustment,
        axisAttrToAdjust: this.props.attr,
        update: {[this.props.attr]: update},
        traceIndexes: [this.props.fullContainer.index],
      },
    });
  }

  render() {
    const icon = <PlusIcon />;
    const extraComponent = this.canAddAxis() ? (
      <Button variant="no-text" icon={icon} onClick={() => this.updateAxis()} />
    ) : (
      <Button variant="no-text--disabled" icon={icon} onClick={() => {}} />
    );

    return (
      <Dropdown
        label={this.props.label}
        attr={this.props.attr}
        clearable={false}
        options={this.props.options}
        updatePlot={u => this.recalcAxes(u)}
        extraComponent={extraComponent}
      />
    );
  }
}

UnconnectedNewAxisCreator.propTypes = {
  attr: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  canAddAxis: PropTypes.bool,
  localize: PropTypes.func,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
};

UnconnectedNewAxisCreator.contextTypes = {
  fullLayout: PropTypes.object,
  data: PropTypes.array,
  fullData: PropTypes.array,
  onUpdate: PropTypes.func,
};

const ConnectedNewAxisCreator = connectToContainer(UnconnectedNewAxisCreator);

class AxisCreator extends Component {
  render() {
    const isFirstTraceOfType =
      this.context.data.filter(d => d.type === this.props.container.type)
        .length === 1;

    if (isFirstTraceOfType) {
      return null;
    }

    const {localize: _} = this.props;
    const {fullLayout} = this.context;
    const axisType = traceTypeToAxisType(this.props.container.type);
    const controls = [];

    function getOptions(axisType) {
      return fullLayout._subplots[axisType].map(axisId => ({
        label: getAxisTitle(fullLayout[axisIdToAxisName(axisId)]),
        value: axisId,
      }));
    }

    // for the moment only cartesian subplots are supported
    if (axisType === 'cartesian') {
      ['xaxis', 'yaxis'].forEach((type, index) => {
        controls.push(
          <ConnectedNewAxisCreator
            key={index}
            attr={type}
            label={type.charAt(0).toUpperCase() + ' Axis'}
            options={getOptions(type)}
            localize={_}
          />
        );
      });
    }

    return (
      <Fragment>
        {controls}
        <Info>
          {_('You can style and position your axes in the Style > Axes Panel')}
        </Info>
      </Fragment>
    );
  }
}

AxisCreator.propTypes = {
  localize: PropTypes.func,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
};

AxisCreator.plotly_editor_traits = {
  is_axis_creator: true,
};

AxisCreator.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
};

export default localize(connectToContainer(AxisCreator));

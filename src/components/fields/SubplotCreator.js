import Dropdown from './Dropdown';
import Info from './Info';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS, AXIS_TO_ATTR} from 'lib/constants';
import Button from '../widgets/Button';
import {PlusIcon} from 'plotly-icons';
import {connectToContainer, traceTypeToAxisType, getSubplotTitle} from 'lib';
import {PlotlySection} from 'components';

class UnconnectedSingleSubplotCreator extends Component {
  canAddAxis() {
    const currentAxisId = this.props.fullContainer[this.props.attr];
    const currentTraceIndex = this.props.fullContainer.index;
    return this.context.fullData.some(
      d => d.index !== currentTraceIndex && d[this.props.attr] === currentAxisId
    );
  }

  addAndUpdateSubplot() {
    const {attr, layoutAttr, updateContainer} = this.props;
    const {
      fullLayout: {_subplots: subplots},
    } = this.context;
    const lastSubplotNumber =
      Number(
        subplots[layoutAttr][subplots[layoutAttr].length - 1].split(
          layoutAttr === 'gl3d' ? 'scene' : layoutAttr
        )[1]
      ) || 1;

    updateContainer({
      [attr]:
        (layoutAttr === 'gl3d' ? 'scene' : layoutAttr) +
        (lastSubplotNumber + 1),
    });
  }

  updateSubplot(update) {
    const currentSubplotId = this.props.fullContainer[
      AXIS_TO_ATTR[this.props.attr]
    ];
    let subplotToBeGarbageCollected = null;

    // When we select another subplot, make sure no unused axes are left
    if (
      currentSubplotId !== update &&
      !this.context.fullData.some(
        trace =>
          trace[AXIS_TO_ATTR[this.props.attr]] === currentSubplotId &&
          trace.index !== this.props.fullContainer.index
      )
    ) {
      subplotToBeGarbageCollected = currentSubplotId;
    }

    this.context.onUpdate({
      type: EDITOR_ACTIONS.UPDATE_TRACES,
      payload: {
        subplotToBeGarbageCollected,
        update: {[this.props.attr]: update},
        traceIndexes: [this.props.fullContainer.index],
      },
    });
  }

  render() {
    const icon = <PlusIcon />;
    const extraComponent = this.canAddAxis() ? (
      <Button
        variant="no-text"
        icon={icon}
        onClick={() => this.addAndUpdateSubplot()}
      />
    ) : (
      <Button variant="no-text--disabled" icon={icon} onClick={() => {}} />
    );

    return (
      <Dropdown
        label={this.props.label}
        attr={this.props.attr}
        clearable={false}
        options={this.props.options}
        updatePlot={u => this.updateSubplot(u)}
        extraComponent={extraComponent}
      />
    );
  }
}

UnconnectedSingleSubplotCreator.propTypes = {
  attr: PropTypes.string,
  layoutAttr: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  canAddAxis: PropTypes.bool,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
};

UnconnectedSingleSubplotCreator.contextTypes = {
  fullLayout: PropTypes.object,
  data: PropTypes.array,
  fullData: PropTypes.array,
  onUpdate: PropTypes.func,
};

const SingleSubplotCreator = connectToContainer(
  UnconnectedSingleSubplotCreator
);

class UnconnectedSubplotCreator extends Component {
  render() {
    const subplotType = traceTypeToAxisType(this.props.container.type);
    if (
      !['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(
        t => t === subplotType
      )
    ) {
      return null;
    }

    const isFirstTraceOfAxisType =
      this.context.data.filter(d => traceTypeToAxisType(d.type) === subplotType)
        .length === 1;
    if (isFirstTraceOfAxisType) {
      return null;
    }

    const {fullLayout, localize: _} = this.context;

    function getOptions(subplotType) {
      return fullLayout._subplots[subplotType].map(subplotId => ({
        label: getSubplotTitle(subplotId, subplotType),
        value: subplotId,
      }));
    }

    return (
      <PlotlySection name={_('Subplots to Use')}>
        <SingleSubplotCreator
          attr={AXIS_TO_ATTR[subplotType]}
          layoutAttr={subplotType}
          label={subplotType === 'gl3d' ? 'scene' : subplotType}
          options={getOptions(subplotType)}
        />
        <Info>
          {_(
            'You can style and position your subplots in the Graph > Subplots Panel'
          )}
        </Info>
      </PlotlySection>
    );
  }
}

UnconnectedSubplotCreator.propTypes = {
  container: PropTypes.object,
  fullContainer: PropTypes.object,
};

UnconnectedSubplotCreator.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  localize: PropTypes.func,
};

export default connectToContainer(UnconnectedSubplotCreator, {
  modifyPlotProps: (props, context, plotProps) => {
    const {data} = context;
    const {fullContainer} = plotProps;

    plotProps.isVisible =
      data.length > 1 &&
      data[fullContainer.index] &&
      ['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(
        t => t === traceTypeToAxisType(data[fullContainer.index].type)
      );
  },
});

import {Component} from 'react';
import {connectToContainer} from 'lib';
import Field from './Field';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import Button from '../widgets/Button';
import {PlusIcon} from 'plotly-icons';
import {MULTI_VALUED} from 'lib/constants';

class UnconnectedGroupCreator extends Component {
  getAllGroups() {
    return [...new Set(this.context.data.map((t) => t[this.props.attr]))].filter((g) => Boolean(g));
  }

  canAddGroup() {
    const {fullContainer, attr} = this.props;
    const currentGroup = fullContainer[attr];
    const currentTraceIndex = fullContainer.index;

    if (fullContainer.index === MULTI_VALUED) {
      return this.getAllGroups().length === 0;
    }

    return (
      !currentGroup ||
      this.context.fullData.some((d) => d.index !== currentTraceIndex && d[attr] === currentGroup)
    );
  }

  addAndUpdateGroup() {
    const allGroups = this.context.fullData
      .map((t) => parseInt(t[this.props.attr], 10))
      .filter((n) => Number.isInteger(n));
    // don't want to pass empty array to max
    allGroups.push(0);

    const lastGroupNumber = Math.max.apply(Math, allGroups);

    this.props.updatePlot(lastGroupNumber + 1);
  }

  render() {
    const {localize: _} = this.context;
    const {attr, label, prefix, updatePlot} = this.props;

    const options = [{label: _('None'), value: ''}];
    const allGroups = this.getAllGroups();
    allGroups.forEach((g) => options.push({label: `${prefix} ${g}`, value: g}));
    options.sort((a, b) => a.value - b.value);

    const icon = <PlusIcon />;
    const addButton = this.canAddGroup() ? (
      <Button variant="no-text" icon={icon} onClick={() => this.addAndUpdateGroup()} />
    ) : (
      <Button variant="no-text--disabled" icon={icon} onClick={() => {}} />
    );

    return (
      <Dropdown
        label={label}
        attr={attr}
        clearable={false}
        options={options}
        updatePlot={updatePlot}
        extraComponent={addButton}
      />
    );
  }
}

UnconnectedGroupCreator.propTypes = {
  attr: PropTypes.string,
  fullContainer: PropTypes.object,
  prefix: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedGroupCreator.contextTypes = {
  localize: PropTypes.func,
  data: PropTypes.array,
  fullData: PropTypes.array,
};

UnconnectedGroupCreator.displayName = 'UnconnectedGroupCreator';

export default connectToContainer(UnconnectedGroupCreator);

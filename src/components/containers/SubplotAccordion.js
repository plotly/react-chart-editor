import Fold from './Fold';
import SubplotTracePicker from '../fields/SubplotTracePicker';
import {localize, connectSubplotToLayout} from 'lib';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TraceRequiredPanel from './TraceRequiredPanel';

const SubplotFold = connectSubplotToLayout(Fold);

class SubplotAccordion extends Component {
  constructor() {
    super();
    this.state = {
      subplots: [{x: [0, 0.45], y: [0, 1]}],
      linkedTraceIndices: [[]],
    };
    this.deleteSubplot = this.deleteSubplot.bind(this);
    this.updateSubplot = this.updateSubplot.bind(this);
    this.updateSubplotTraces = this.updateSubplotTraces.bind(this);
  }

  updateSubplot(update, subplotIndex) {
    const keyToUpdate = Object.keys(update)[0].charAt(0);
    const indexToUpdate = Object.keys(update)[0].charAt(2);
    const newValue = [...this.state.subplots[subplotIndex][keyToUpdate]];
    newValue[Number(indexToUpdate)] = update[Object.keys(update)[0]];
    const newUpdate = {
      ...this.state.subplots[subplotIndex],
      [keyToUpdate]: newValue,
    };
    this.setState({
      subplots: this.state.subplots
        .slice(0, subplotIndex)
        .concat([newUpdate])
        .concat(this.state.subplots.slice(subplotIndex + 1)),
    });
  }

  deleteSubplot(subplotIndex) {
    this.setState({
      subplots: this.state.subplots
        .slice(0, subplotIndex)
        .concat(this.state.subplots.slice(subplotIndex + 1)),
    });
  }

  updateSubplotTraces(value, subplotIndex) {
    const newState = [...this.state.linkedTraceIndices];

    if (value.length > 0) {
      newState[subplotIndex].push(value[0]);
      this.setState({linkedTraceIndices: newState});
    } else {
      newState[subplotIndex] = value;
      this.setState({linkedTraceIndices: newState});
    }
  }

  render() {
    const {localize: _} = this.props;
    const addAction = {
      label: _('Subplot'),
      handler: () =>
        this.setState({
          subplots: [...this.state.subplots, {x: [0.55, 1], y: [0, 1]}],
          linkedTraceIndices: [...this.state.linkedTraceIndices, []],
        }),
    };

    let content = null;

    if (this.state.subplots.length > 1) {
      content = [];
      for (let i = 0; i < this.state.subplots.length; i++) {
        const name = _('Subplot') + ` ${i}`;
        content.push(
          <SubplotFold
            name={name}
            key={name}
            subplotIndex={i}
            subplotInfo={this.state.subplots[i]}
            canDelete={i !== 0}
            deleteSubplot={this.deleteSubplot}
            updateSubplot={this.updateSubplot}
          >
            <SubplotTracePicker
              attr="x"
              updateSubplotTraces={this.updateSubplotTraces}
              linkedTraceIndices={this.state.linkedTraceIndices[i]}
              subplotInfo={this.state.subplots[i]}
              subplotIndex={i}
            />
            {this.props.children}
          </SubplotFold>
        );
      }
    }

    return (
      <TraceRequiredPanel addAction={addAction}>{content}</TraceRequiredPanel>
    );
  }
}

SubplotAccordion.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.any,
};

export default localize(SubplotAccordion);

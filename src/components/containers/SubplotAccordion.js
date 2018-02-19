import Fold from './Fold';
import {localize, connectSubplotToLayout} from 'lib';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TraceRequiredPanel from './TraceRequiredPanel';

const SubplotFold = connectSubplotToLayout(Fold);

class SubplotAccordion extends Component {
  constructor() {
    super();
    this.state = {
      subplots: [{x: [0, 1], y: [0, 1]}],
    };
    this.deleteSubplot = this.deleteSubplot.bind(this);
    this.updateSubplot = this.updateSubplot.bind(this);
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

  render() {
    const {localize: _} = this.props;
    const addAction = {
      label: _('Subplot'),
      handler: () =>
        this.setState({
          subplots: [...this.state.subplots, {x: [0, 1], y: [0, 1]}],
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
            canDelete
            deleteSubplot={this.deleteSubplot}
            updateSubplot={this.updateSubplot}
          >
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

import React, {Component} from 'react';
import Dropdown from './Dropdown';
import {bem, connectToPlot} from '../lib';

export default class DataSelector extends Component {
  render() {
    return <Dropdown {...this.props} isDataSrc />;
  }
}

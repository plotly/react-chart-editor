import React, {Component} from 'react';
import Dropdown from './Dropdown';

export default class DataSelector extends Component {
  render() {
    return <Dropdown {...this.props} isDataSrc />;
  }
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SectionHeader extends Component {
  render() {
    return (
      <div className="section__heading">
        <div className="section__heading__text">{this.props.name}</div>
        {this.props.menuPanel}
      </div>
    );
  }
}

SectionHeader.propTypes = {
  name: PropTypes.string,
  menuPanel: PropTypes.node,
};

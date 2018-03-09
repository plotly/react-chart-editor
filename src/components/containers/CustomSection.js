import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomSection extends Component {
  render() {
    return (
      <div className="section">
        <div className="section__heading">
          <div className="section__heading__text">{this.props.name}</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

CustomSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default CustomSection;

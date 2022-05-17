import PropTypes from 'prop-types';
import {Component} from 'react';

export default class Logo extends Component {
  render() {
    return <img className="sidebar__logo" src={this.props.src} />;
  }
}

Logo.plotly_editor_traits = {sidebar_element: true};

Logo.propTypes = {
  src: PropTypes.string,
};

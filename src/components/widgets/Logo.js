import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class Logo extends Component {
  render() {
    const {link, src} = this.props;
    const image = <img className="sidebar__logo" src={src} />;
    return link ? <a href={this.props.link}>{image}</a> : image;
  }
}

Logo.plotly_editor_traits = {sidebar_element: true};

Logo.propTypes = {
  src: PropTypes.string,
  link: PropTypes.string,
};

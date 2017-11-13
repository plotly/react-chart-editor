import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SubPanel extends Component {
  constructor() {
    super();
    this.state = {isVisible: false};

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    const toggleClass = `subpanel__toggle ${this.props.toggleIconClass}`;
    const isVisible = this.props.show || this.state.isVisible;
    return (
      <span>
        <span>
          <i className={toggleClass} onClick={this.toggleVisibility} />
        </span>
        {isVisible ? (
          <div className="subpanel">
            <div className="subpanel__cover" onClick={this.toggleVisibility} />
            <div>{this.props.children}</div>
          </div>
        ) : null}
      </span>
    );
  }
}

SubPanel.propTypes = {
  toggleIconClass: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

SubPanel.defaultProps = {
  toggleIconClass: 'plotlyjs_editor__icon-cog',
};

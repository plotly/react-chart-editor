import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SubPanel extends Component {
  constructor() {
    super();
    this.state = {isVisible: false};

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  subpanelClasses() {
    if (this.props.iconClass) {
      return {
        iconClass: `subpanel__icon ${this.props.iconClass}`,
        spanClass: 'subpanel__icon-span',
      };
    } else if (this.props.question) {
      return {
        iconClass: 'subpanel__icon plotlyjs_editor__icon-question-circle',
        spanClass: `subpanel__icon-span subpanel__icon-span--question`,
      };
    }
    return {
      iconClass: 'subpanel__icon plotlyjs_editor__icon-cog',
      spanClass: 'subpanel__icon-span subpanel__icon-span--cog',
    };
  }

  toggleVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    const isVisible = this.props.show || this.state.isVisible;
    const containerClass = classnames('subpanel__container', {
      'subpanel__container--ownline': this.props.ownline,
    });

    const {iconClass, spanClass} = this.subpanelClasses();

    return (
      <div className={containerClass}>
        <span className={spanClass}>
          <span>{this.props.label}</span>
          <i className={iconClass} onClick={this.toggleVisibility} />
        </span>
        {isVisible ? (
          <div className="subpanel">
            <div className="subpanel__cover" onClick={this.toggleVisibility} />
            <div>{this.props.children}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

SubPanel.propTypes = {
  children: PropTypes.node,
  iconClass: PropTypes.string,
  show: PropTypes.bool,
  ownline: PropTypes.bool,
  question: PropTypes.bool,
  label: PropTypes.string,
};

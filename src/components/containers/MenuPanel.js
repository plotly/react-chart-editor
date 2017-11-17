import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalBox from './ModalBox';

export default class MenuPanel extends Component {
  constructor() {
    super();
    this.state = {isOpen: false};

    this.togglePanel = this.togglePanel.bind(this);
  }

  menupanelClasses() {
    if (this.props.iconClass) {
      return {
        iconClass: `menupanel__icon ${this.props.iconClass}`,
        spanClass: 'menupanel__icon-span',
      };
    } else if (this.props.question) {
      return {
        iconClass: 'menupanel__icon plotlyjs_editor__icon-question-circle',
        spanClass: `menupanel__icon-span menupanel__icon-span--question`,
      };
    }
    return {
      iconClass: 'menupanel__icon plotlyjs_editor__icon-cog',
      spanClass: 'menupanel__icon-span menupanel__icon-span--cog',
    };
  }

  togglePanel() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const isOpen = this.props.show || this.state.isOpen;
    const containerClass = classnames('menupanel', {
      'menupanel--ownline': this.props.ownline,
    });

    const {iconClass, spanClass} = this.menupanelClasses();

    return (
      <div className={containerClass}>
        <span className={spanClass}>
          <span>{this.props.label}</span>
          <i className={iconClass} onClick={this.togglePanel} />
        </span>
        {isOpen ? (
          <ModalBox onClose={this.togglePanel}>{this.props.children}</ModalBox>
        ) : null}
      </div>
    );
  }
}

MenuPanel.propTypes = {
  children: PropTypes.node,
  iconClass: PropTypes.string,
  show: PropTypes.bool,
  ownline: PropTypes.bool,
  question: PropTypes.bool,
  label: PropTypes.string,
};

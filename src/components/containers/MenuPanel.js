import ModalBox from './ModalBox';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classnames from 'classnames';
import {QuestionIcon, CogIcon} from 'plotly-icons';

export default class MenuPanel extends Component {
  constructor() {
    super();
    this.state = {isOpen: false};

    this.togglePanel = this.togglePanel.bind(this);
  }

  getIcon() {
    if (this.props.question) {
      return {
        iconType: <QuestionIcon className="menupanel__icon" />,
        spanClass: `menupanel__icon-span menupanel__icon-span--question`,
      };
    }
    return {
      iconType: <CogIcon className="menupanel__icon" />,
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

    const {iconType, spanClass} = this.getIcon();

    return (
      <div className={containerClass}>
        <span className={spanClass}>
          <span>{this.props.label}</span>
          <span onClick={this.togglePanel}>{iconType}</span>
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

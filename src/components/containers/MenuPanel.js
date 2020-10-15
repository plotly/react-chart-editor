import ModalBox from './ModalBox';
import PropTypes from 'prop-types';
import {Component} from 'react';
import classnames from 'classnames';
import {QuestionIcon, CogIcon} from 'plotly-icons';

export default class MenuPanel extends Component {
  constructor() {
    super();
    this.state = {isOpen: false};

    this.togglePanel = this.togglePanel.bind(this);
  }

  getIcon() {
    const {question, icon: Icon} = this.props;
    if (question) {
      return {
        icon: <QuestionIcon className="menupanel__icon" />,
        spanClass: `menupanel__icon-span menupanel__icon-span--question`,
      };
    }
    if (Icon) {
      return {
        icon: <Icon className="menupanel__icon" />,
        spanClass: `menupanel__icon-span`,
      };
    }
    return {
      icon: <CogIcon className="menupanel__icon" />,
      spanClass: 'menupanel__icon-span menupanel__icon-span--cog',
    };
  }

  togglePanel() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const {show, ownline, label, children} = this.props;
    const isOpen = show || this.state.isOpen;

    const containerClass = classnames('menupanel', {
      'menupanel--ownline': ownline,
    });

    const {icon, spanClass} = this.getIcon();

    return (
      <div className={containerClass}>
        <div className={spanClass}>
          <div className="menupanel__label">{label}</div>
          <div className="menupanel__icon__wrapper" onClick={this.togglePanel}>
            {icon}
          </div>
        </div>
        {isOpen && <ModalBox onClose={this.togglePanel}>{children}</ModalBox>}
      </div>
    );
  }
}

MenuPanel.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  label: PropTypes.string,
  ownline: PropTypes.bool,
  question: PropTypes.bool,
  show: PropTypes.bool,
};

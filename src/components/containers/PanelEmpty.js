import PropTypes from 'prop-types';
import {Component} from 'react';
import {ChartLineIcon} from 'plotly-icons';
import {bem} from 'lib';

export class PanelMessage extends Component {
  render() {
    const {children, icon: Icon} = this.props;
    const heading = this.props.heading || '';

    return (
      <div className="panel__empty__message">
        {Boolean(Icon) && (
          <div className="panel__empty__message__icon">
            <Icon />
          </div>
        )}
        {Boolean(heading) && <div className="panel__empty__message__heading">{heading}</div>}
        <div className="panel__empty__message__content">{children}</div>
      </div>
    );
  }
}

PanelMessage.defaultProps = {
  icon: ChartLineIcon,
};

PanelMessage.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

class PanelEmpty extends Component {
  render() {
    return (
      <div className={bem('panel', 'empty')}>
        <PanelMessage {...this.props} />
      </div>
    );
  }
}

PanelEmpty.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default PanelEmpty;

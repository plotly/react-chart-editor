import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchIcon, ThumnailViewIcon, GraphIcon} from 'plotly-icons';
import Modal from 'components/containers/Modal';
import {traceTypeToPlotlyInitFigure, localize, renderTraceIcon} from 'lib';

const actions = ({value}) => [
  {
    label: `Charts like this by Plotly users.`,
    href: `https://plot.ly/feed/?q=plottype:${value}`,
    icon: <SearchIcon />,
  },
  {
    label: `View tutorials on this chart type.`,
    href: `#`, // update
    icon: <ThumnailViewIcon />,
  },
  {
    label: `See a basic example.`,
    href: `#`, // update
    icon: <GraphIcon />,
  },
];

/**
 * This renders our item actions
 */
const renderActionItems = (actionItems, item) =>
  actionItems(item).map((action, i) => (
    <a
      className="trace-item__actions__item"
      key={i}
      aria-label={action.label}
      data-microtip-position={`top-left`}
      role="tooltip"
      href={action.href}
      target="_blank"
    >
      {action.icon}
    </a>
  ));

/**
 * Trace Type Item
 */
const Item = ({item, active, handleClick}) => {
  const {label, value, icon} = item;
  return (
    <div
      className={`trace-item${active ? ' trace-item--active' : ''}`}
      onClick={() => handleClick()}
    >
      <div className="trace-item__actions">
        {actions ? renderActionItems(actions, item) : null}
      </div>
      <div className="trace-item__image">
        <img src={`/_temp/ic-${icon ? icon : value}.svg`} />
      </div>
      <div className="trace-item__label">{label}</div>
    </div>
  );
};

/**
 * Trace Type Selector
 */
class TraceTypeSelector extends Component {
  selectAndClose(value) {
    const computedValue = traceTypeToPlotlyInitFigure(value);
    this.props.updateContainer(computedValue);
    this.context.handleClose();
  }

  renderCategories() {
    const {fullValue, localize: _} = this.props;
    const {traces, categories} = this.context.traceSelectorConfig;

    return categories(_).map((category, i) => {
      const items = traces(_).filter(
        ({category: {value}}) => value === category.value
      );

      const MAX_ITEMS = 6;
      let columnClasses = 'trace-grid__column';

      // If the category has more than 6 items, it will span 2 columns
      if (items.length > MAX_ITEMS) {
        columnClasses += ' trace-grid__column--double';
      }

      return (
        <div className={columnClasses} key={i}>
          <div className="trace-grid__column__header">{category.label}</div>
          <div className="trace-grid__column__items">
            {items.map(item => (
              <Item
                key={item.value}
                active={fullValue === item.value}
                item={item}
                handleClick={() => this.selectAndClose(item.value)}
              />
            ))}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Modal title="Select Chart Type">
        <div className="trace-grid">{this.renderCategories()}</div>
      </Modal>
    );
  }
}

class TraceTypeButton extends React.Component {
  render() {
    const {
      handleClick,
      fullValue,
      localize: _,
      traceSelectorConfig: {traces},
    } = this.props;

    const {label, icon, value} = traces(_).find(
      type => type.value === fullValue
    );

    const Icon = renderTraceIcon(icon ? icon : value);

    return (
      <div
        className="trace-type-select-button"
        onClick={handleClick ? () => handleClick() : null}
      >
        <div className="trace-type-select-button__icon">
          <Icon />
        </div>
        {label}
      </div>
    );
  }
}

export const TraceTypeSelectorButton = localize(TraceTypeButton);

TraceTypeSelector.propTypes = {
  updateContainer: PropTypes.func,
  fullValue: PropTypes.string,
  localize: PropTypes.func,
};
TraceTypeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  fullValue: PropTypes.string.isRequired,
  localize: PropTypes.func.isRequired,
  traceSelectorConfig: PropTypes.object.isRequired,
};
TraceTypeSelector.contextTypes = {
  traceSelectorConfig: PropTypes.object,
  handleClose: PropTypes.func,
};
Item.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default localize(TraceTypeSelector);

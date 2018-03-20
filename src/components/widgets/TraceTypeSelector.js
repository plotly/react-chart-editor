import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchIcon, ThumnailViewIcon, GraphIcon} from 'plotly-icons';
import Modal from 'components/containers/Modal';
import {
  traceTypeToPlotlyInitFigure,
  localize,
  renderTraceIcon,
  plotlyTraceToCustomTrace,
} from 'lib';

const actions = ({value}) => [
  {
    label: `Charts like this by Plotly users.`,
    href: `https://plot.ly/feed/?q=plottype:${value}`,
    icon: <SearchIcon />,
  },
  {
    label: `View tutorials on this chart type.`,
    href: `#`,
    icon: <ThumnailViewIcon />,
  },
  {
    label: `See a basic example.`,
    href: `#`,
    icon: <GraphIcon />,
  },
];

const renderActionItems = (actionItems, item) =>
  actionItems
    ? actionItems(item).map((action, i) => (
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
      ))
    : null;

const Item = ({item, active, handleClick, actions, showActions, complex}) => {
  const {label, value, icon} = item;
  const SimpleIcon = renderTraceIcon(icon ? icon : value);
  const ComplexIcon = renderTraceIcon(icon ? icon : value, 'TraceType');

  return (
    <div
      className={`trace-item${active ? ' trace-item--active' : ''}`}
      onClick={() => handleClick()}
    >
      <div className="trace-item__actions">
        {actions && showActions ? renderActionItems(actions, item) : null}
      </div>
      <div className="trace-item__image">
        {!complex && (
          <div className="trace-item__image__svg">
            <SimpleIcon />
          </div>
        )}
        {complex && (
          <div className="trace-item__image__wrapper">
            <ComplexIcon />
          </div>
        )}
      </div>
      <div className="trace-item__label">{label}</div>
    </div>
  );
};

class TraceTypeSelector extends Component {
  selectAndClose(value) {
    const computedValue = traceTypeToPlotlyInitFigure(value);
    this.props.updateContainer(computedValue);
    this.context.handleClose();
  }

  renderCategories() {
    const {fullValue, localize: _} = this.props;
    const {traces, categories, complex} = this.context.traceTypesConfig;

    return categories(_).map((category, i) => {
      const items = traces(_).filter(
        ({category: {value}}) => value === category.value
      );

      const MAX_ITEMS = 4;

      let columnClasses = 'trace-grid__column';

      if (items.length > MAX_ITEMS) {
        columnClasses += ' trace-grid__column--double';
      }

      return (
        <div className={columnClasses} key={i}>
          <div className="trace-grid__column__header">{category.label}</div>
          <div className="trace-grid__column__items">
            {items.map(item => (
              <Item
                complex={complex}
                key={item.value}
                active={fullValue === item.value}
                item={item}
                actions={actions}
                showActions={false}
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
      container,
      localize: _,
      traceTypesConfig: {traces},
    } = this.props;

    const inferredType = plotlyTraceToCustomTrace(container);
    const {label, icon, value} = traces(_).find(
      type => type.value === inferredType
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

TraceTypeSelector.propTypes = {
  updateContainer: PropTypes.func,
  fullValue: PropTypes.string,
  localize: PropTypes.func,
};
TraceTypeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  container: PropTypes.object,
  localize: PropTypes.func.isRequired,
  traceTypesConfig: PropTypes.object.isRequired,
};
TraceTypeSelector.contextTypes = {
  traceTypesConfig: PropTypes.object,
  handleClose: PropTypes.func,
};
Item.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  complex: PropTypes.bool,
  handleClick: PropTypes.func,
  actions: PropTypes.func,
  showActions: PropTypes.bool,
};

export default localize(TraceTypeSelector);

export const TraceTypeSelectorButton = localize(TraceTypeButton);

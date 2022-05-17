import {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchIcon, ThumnailViewIcon, GraphIcon} from 'plotly-icons';
import Modal from 'components/containers/Modal';
import {traceTypeToPlotlyInitFigure, renderTraceIcon, plotlyTraceToCustomTrace} from 'lib';
import {TRACES_WITH_GL} from 'lib/constants';

const renderActionItems = (actionItems, item) =>
  actionItems
    ? actionItems(item).map((action, i) =>
        !action.onClick ? null : (
          <a
            className="trace-item__actions__item"
            key={i}
            aria-label={action.label}
            data-microtip-position={`top-left`}
            role="tooltip"
            onClick={action.onClick}
            target="_blank"
          >
            {action.icon}
          </a>
        )
      )
    : null;

const Item = ({item, active, handleClick, actions, showActions, complex}) => {
  const {label, value, icon} = item;
  const SimpleIcon = renderTraceIcon(icon ? icon : value);
  const ComplexIcon = renderTraceIcon(icon ? icon : value, 'TraceType');

  return (
    <div className={`trace-item${active ? ' trace-item--active' : ''}`} onClick={handleClick}>
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

Item.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  complex: PropTypes.bool,
  handleClick: PropTypes.func,
  actions: PropTypes.func,
  showActions: PropTypes.bool,
};
Item.contextTypes = {
  localize: PropTypes.func,
};

class TraceTypeSelector extends Component {
  constructor(props) {
    super(props);

    this.selectAndClose = this.selectAndClose.bind(this);
    this.actions = this.actions.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.renderSingleBlock = this.renderSingleBlock.bind(this);
  }

  selectAndClose(value) {
    const {
      updateContainer,
      glByDefault,
      fullContainer: {type},
    } = this.props;
    const computedValue = traceTypeToPlotlyInitFigure(value);
    if (
      ((type && type.endsWith('gl')) || (!TRACES_WITH_GL.includes(type) && glByDefault)) &&
      TRACES_WITH_GL.includes(computedValue.type) &&
      !computedValue.type.endsWith('gl')
    ) {
      computedValue.type += 'gl';
    }
    updateContainer(computedValue);
    this.context.handleClose();
  }

  actions({value}) {
    const {localize: _, chartHelp} = this.context;

    const onClick = (e, func) => {
      e.stopPropagation();
      func();
      this.context.handleClose();
    };

    return [
      {
        label: _('Charts like this by Plotly users.'),
        onClick:
          chartHelp[value] &&
          chartHelp[value].feedQuery &&
          ((e) =>
            onClick(e, () =>
              window.open(
                `https://plot.ly/feed/?q=${chartHelp[value] ? chartHelp[value].feedQuery : value}`,
                '_blank'
              )
            )),
        icon: <SearchIcon />,
      },
      {
        label: _('View tutorials on this chart type.'),
        onClick:
          chartHelp[value] &&
          chartHelp[value].helpDoc &&
          ((e) => onClick(e, () => window.open(chartHelp[value].helpDoc, '_blank'))),
        icon: <ThumnailViewIcon />,
      },
      {
        label: _('See a basic example.'),
        onClick:
          chartHelp[value] &&
          chartHelp[value].examplePlot &&
          ((e) => onClick(e, chartHelp[value].examplePlot)),
        icon: <GraphIcon />,
      },
    ];
  }

  renderCategories() {
    const {fullValue} = this.props;
    const {localize: _, chartHelp} = this.context;
    const {
      traceTypesConfig: {traces, categories, complex},
    } = this.props;

    return categories(_).map((category, i) => {
      const items = traces(_)
        .filter(({category: {value}}) => value === category.value)
        .filter((i) => i.value !== 'scattergl' && i.value !== 'scatterpolargl');

      const MAX_ITEMS = 4;

      const columnClasses =
        (items.length > MAX_ITEMS && !category.maxColumns) ||
        (category.maxColumns && category.maxColumns > 1)
          ? 'trace-grid__column trace-grid__column--double'
          : 'trace-grid__column';

      return (
        <div className={columnClasses} key={i}>
          <div className="trace-grid__column__header">{category.label}</div>
          <div className="trace-grid__column__items">
            {items.map((item) => (
              <Item
                complex={complex}
                key={item.value}
                active={fullValue === item.value}
                item={item}
                actions={this.actions}
                handleClick={() => this.selectAndClose(item.value)}
                showActions={Boolean(chartHelp)}
              />
            ))}
          </div>
        </div>
      );
    });
  }

  renderGrid() {
    return <div className="trace-grid">{this.renderCategories()}</div>;
  }

  renderSingleBlock() {
    const {fullValue} = this.props;
    const {localize: _} = this.context;
    const {
      traceTypesConfig: {traces, complex},
    } = this.props;

    return (
      <div className="trace-grid-single-block">
        {traces(_).map((item) => (
          <Item
            key={item.value}
            complex={complex}
            active={fullValue === item.value}
            item={item}
            actions={this.actions}
            showActions={false}
            handleClick={() => this.selectAndClose(item.value)}
            style={{display: 'inline-block'}}
          />
        ))}
      </div>
    );
  }

  render() {
    const {localize: _} = this.context;
    const {
      traceTypesConfig: {categories},
    } = this.props;

    return (
      <Modal title={_('Select Trace Type')}>
        {categories ? this.renderGrid() : this.renderSingleBlock()}
      </Modal>
    );
  }
}

TraceTypeSelector.propTypes = {
  updateContainer: PropTypes.func,
  fullValue: PropTypes.string,
  fullContainer: PropTypes.object,
  glByDefault: PropTypes.bool,
  traceTypesConfig: PropTypes.object,
};
TraceTypeSelector.contextTypes = {
  handleClose: PropTypes.func,
  localize: PropTypes.func,
  mapBoxAccess: PropTypes.bool,
  chartHelp: PropTypes.object,
};

export class TraceTypeSelectorButton extends Component {
  render() {
    const {
      handleClick,
      container,
      traceTypesConfig: {traces},
    } = this.props;

    const {localize: _} = this.context;

    const inferredType = plotlyTraceToCustomTrace(container);
    const {label, icon, value} = traces(_).find((type) => type.value === inferredType);

    const Icon = renderTraceIcon(icon ? icon : value);

    return (
      <div className="trace-type-select-button" onClick={handleClick ? handleClick : null}>
        <div className="trace-type-select-button__icon">
          <Icon />
        </div>
        {label}
      </div>
    );
  }
}

TraceTypeSelectorButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  container: PropTypes.object,
  traceTypesConfig: PropTypes.object.isRequired,
};
TraceTypeSelectorButton.contextTypes = {
  localize: PropTypes.func,
};

export default TraceTypeSelector;

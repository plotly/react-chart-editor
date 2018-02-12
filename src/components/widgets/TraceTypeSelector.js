import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchIcon, ThumnailViewIcon, GraphIcon} from 'plotly-icons';
import Modal, {ModalContent} from 'components/containers/Modal';
import {
  traceTypeToPlotlyInitFigure,
  localize,
  plotlyTraceToCustomTrace,
  computeTraceOptionsFromSchema,
} from 'lib';

// to be removed when icons are converted to svg
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const Item = ({item, active, columnLength, columnIndex, handleClick}) => {
  const isEven = value => value % 2 === 0;
  const middle = Math.floor(columnLength / 2);

  // for left leaning columns
  let position = '-right';

  // if we have an even number of columns
  // we want to have the 2 center rows display their tooltip
  // in the middle vs left/right
  if (isEven(columnLength) && columnLength > 3) {
    if (columnIndex === middle || columnIndex === middle - 1) {
      position = '';
    }
  } else {
    if (columnIndex === middle) {
      position = '';
    }
  }

  // for right leaning columns
  if (columnIndex > middle) {
    position = '-left';
  }
  const {label, value, type} = item;
  return (
    <div
      className={`trace-item${active ? ' trace-item--active' : ''}`}
      onClick={() => handleClick()}
    >
      <div className="trace-item__actions">
        <a
          className="trace-item__actions__item"
          aria-label="Charts like this by Plotly users."
          data-microtip-position={`top${position}`}
          role="tooltip"
          href={`https://plot.ly/feed/?q=plottype:${type}`}
          target="_blank"
        >
          <SearchIcon />
        </a>
        <div
          className="trace-item__actions__item"
          aria-label="View tutorials on this chart type."
          data-microtip-position={`top${position}`}
          role="tooltip"
        >
          <ThumnailViewIcon />
        </div>
        <div
          className="trace-item__actions__item"
          aria-label="See a basic example."
          data-microtip-position={`bottom${position}`}
          role="tooltip"
        >
          <GraphIcon />
        </div>
      </div>
      <div className="trace-item__image">
        <img src={`/_temp/ic-${slugify(value)}.svg`} />
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
    const {traces, categories} = this.context.traceSelectorConfig;

    return categories(_).map((category, i) => {
      const items = traces(_).filter(
        ({category: {value}}) => value === category.value
      );
      return (
        <div className="trace-grid__column" key={i}>
          <div className="trace-grid__column__header">{category.label}</div>
          <div className="trace-grid__column__items">
            {items.map(item => (
              <Item
                columnLength={categories.length}
                columnIndex={i}
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
        <ModalContent>
          <div className="trace-grid">{this.renderCategories()}</div>
        </ModalContent>
      </Modal>
    );
  }
}
TraceTypeSelector.propTypes = {
  updateContainer: PropTypes.func,
};
TraceTypeSelector.contextTypes = {
  traceSelectorConfig: PropTypes.object,
  handleClose: PropTypes.func,
};
Item.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
};

export default localize(TraceTypeSelector);

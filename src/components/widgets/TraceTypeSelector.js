import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CATEGORY_LAYOUT, TRACE_TYPES} from 'lib/constants';
import {SearchIcon, ThumnailViewIcon, GraphIcon} from 'plotly-icons';

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

import Modal, {ModalHeader, ModalContent} from '../containers/Modal';

const data = [
  {
    category: 'Basic',
    types: [{}],
  },
];

const Item = ({item}) => {
  const {label} = item;
  return (
    <div className="trace-item">
      <div className="trace-item__actions">
        <div
          className="trace-item__actions__item"
          aria-label="Charts like this by Plotly users."
          data-microtip-position="top-right"
          role="tooltip"
        >
          <SearchIcon />
        </div>
        <div
          className="trace-item__actions__item"
          aria-label="View tutorials on this chart type."
          data-microtip-position="right"
          role="tooltip"
        >
          <ThumnailViewIcon />
        </div>
        <div
          className="trace-item__actions__item"
          aria-label="See a basic example."
          data-microtip-position="bottom-right"
          role="tooltip"
        >
          <GraphIcon />
        </div>
      </div>
      <div className="trace-item__image">
        <img src={`/_temp/ic-${slugify(label)}.svg`} />
      </div>
      <div className="trace-item__label">{label}</div>
    </div>
  );
};

export default class TraceTypeSelector extends Component {
  renderCategories(categories = CATEGORY_LAYOUT) {
    const traces = Object.entries(TRACE_TYPES);

    return categories.map((category, i) => {
      const items = traces.filter(
        ([key, value]) => value.meta.category === category.category
      );
      return (
        <div className="trace-grid__column" key={i}>
          <div className="trace-grid__column__header">{category.label}</div>
          <div className="trace-grid__column__items">
            {items.map(([key, value], i) => <Item item={value.meta} />)}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Modal>
        <ModalHeader title="Select Chart Type" />
        <ModalContent>
          <div className="trace-grid">{this.renderCategories()}</div>
        </ModalContent>
      </Modal>
    );
  }
}

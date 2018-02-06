import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import './styles.css';

const Nav = props => (
  <div className="mock-nav">
    <span className="mock-nav__label">Select mock:</span>
    <div className="mock-nav__select">
      <Select
        clearable={true}
        value={props.currentMockIndex}
        name="mock-dropdown"
        options={props.mocks.map((item, i) => ({
          label: item.name,
          value: i,
        }))}
        className="open-top"
        searchable={true}
        searchPromptText="Search for a mock"
        onChange={option => props.loadMock(option.value)}
        noResultsText={'No Results'}
        placeholder={'plotly.js/contents/test/image/mocks'}
      />
    </div>
  </div>
);

Nav.propTypes = {
  currentMockIndex: PropTypes.number,
  loadMock: PropTypes.func,
  mocks: PropTypes.array,
};

export default Nav;

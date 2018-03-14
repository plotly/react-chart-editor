import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const prefix =
  'https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/';

const Nav = props => (
  <div className="mock-nav">
    <span className="mock-nav__label">Select mock:</span>
    <div className="mock-nav__select">
      <Select
        clearable={true}
        value={props.currentMockIndex}
        name="mock-dropdown"
        options={props.mocks.map((item, i) => ({
          label: item,
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
    {props.currentMockIndex === -1 ? null : (
      <span className="mock-nav__label">
        <a
          href={prefix + props.mocks[props.currentMockIndex]}
          target="_blank"
          style={{color: 'white'}}
        >
          open {props.mocks[props.currentMockIndex]} &raquo;
        </a>
      </span>
    )}
  </div>
);

Nav.propTypes = {
  currentMockIndex: PropTypes.number,
  loadMock: PropTypes.func,
  mocks: PropTypes.array,
};

export default Nav;

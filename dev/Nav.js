import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const Nav = props => (
  <div
    style={{
      height: '50px',
      width: '100%',
      backgroundColor: '#27374e',
      display: 'inline-flex',
      color: 'white',
    }}
  >
    <span style={{lineHeight: '50px', paddingLeft: '10px'}}>Select mock:</span>
    <div
      style={{
        width: '300px',
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '7px',
      }}
    >
      <Select
        clearable={true}
        value={props.currentMockIndex}
        name="mock-dropdown"
        options={props.mocks.map((item, i) => ({
          label: item.name,
          value: i,
        }))}
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

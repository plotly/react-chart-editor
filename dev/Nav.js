import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default props => (
  <div
    style={{
      height: '40px',
      width: '100%',
      backgroundColor: 'rgb(235, 240, 248)',
      borderBottom: '2px solid #c8d4e3',
      display: 'inline-flex',
    }}
  >
    <a
      style={{marginLeft: '20px', marginRight: '20px', fontSize: 'large'}}
      href="#"
    >
      react-plotly.js-editor
    </a>
    <div style={{width: '300px', marginLeft: '20px', marginRight: '20px'}}>
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
      />
    </div>
  </div>
);

import PropTypes from 'prop-types';
import Dropdown from 'react-chart-editor/lib/components/widgets/Dropdown';

const Nav = ({mocks, currentMockIndex, loadMock}) => (
  <div className="mock-nav">
    <span className="mock-nav__label">Select mock:</span>
    <div className="mock-nav__select">
      <Dropdown
        name="mock-dropdown"
        clearable={true}
        searchable={true}
        searchPromptText="Search for a mock"
        noResultsText="No Results"
        className="open-top"
        classNamePrefix="Select"
        placeholder="plotly.js/contents/test/image/mocks"
        options={mocks.map((item, i) => ({
          label: item.name,
          value: i,
        }))}
        value={currentMockIndex}
        onChange={(option) => loadMock(option)}
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

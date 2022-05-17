import ArrowSelector from '../ArrowSelector';
import Dropdown from '../Dropdown';
import {shallow} from 'lib/test-utils';

describe('<ArrowSelector>', () => {
  // test mostly an insurance policy against plotly.js changing arrow_paths on us.
  it('pulls arrow_paths from plotly.js and sets as options', () => {
    const minNumberOfArrowsExpected = 4;
    const options = shallow(<ArrowSelector />)
      .find(Dropdown)
      .prop('options');
    expect(options.length > minNumberOfArrowsExpected).toBe(true);

    // make sure path info is being destructured
    const innerPath = options[3].label.props.children[1];
    expect(innerPath.type).toBe('path');
    expect(innerPath.props.d.startsWith('M-')).toBe(true);
  });
});

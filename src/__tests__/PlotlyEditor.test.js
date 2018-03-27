import PlotlyEditor, {PlotlyFold} from '..';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly-basic';

configure({adapter: new Adapter()});

const dataSources = {
  col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
  col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};

const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

class TestApp extends Component {
  constructor() {
    super();
    this.state = {data: [], layout: {}};
  }

  render() {
    return (
      <PlotlyEditor
        data={this.state.data}
        layout={this.state.layout}
        dataSources={dataSources}
        dataSourceOptions={dataSourceOptions}
        plotly={plotly}
        onUpdate={(data, layout) => this.setState({data, layout})}
        advancedTraceTypeSelector
      />
    );
  }
}

describe('<TestApp>', () => {
  let app;

  beforeEach(done => {
    app = mount(<TestApp />);

    const iv = setInterval(() => {
      app.update();
      if (app.find('.sidebar').length !== 0) {
        clearInterval(iv);
        done();
      }
    }, 50); // eslint-disable-line no-magic-numbers
  });

  it('Can create and delete traces', done => {
    expect(app.find(PlotlyFold).length).toEqual(0);

    app
      .find('.js-add-button')
      .at(0)
      .simulate('click');
    expect(app.find('.fold').length).toEqual(1);

    app
      .find('.js-fold__delete')
      .at(0)
      .simulate('click');
    expect(app.find('.fold').length).toEqual(0);

    // now wait for the last call to setState to go through
    setTimeout(done, 1); // eslint-disable-line no-magic-numbers
  });
});

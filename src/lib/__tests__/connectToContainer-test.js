import React from 'react';
import {connectTraceToPlot, connectToContainer, unpackPlotProps} from '..';
import {Numeric} from '../../components/fields';
import {TestEditor, fixtures} from '../test-utils';
import {mount} from 'enzyme';

describe('connectToContainer', () => {
  it('connectToContainer accepts supplyPlotProps function', () => {
    const onUpdate = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const ConnectedNumeric = connectTraceToPlot(
      connectToContainer(Numeric, {
        supplyPlotProps: (props, context) => {
          const plotProps = unpackPlotProps(props, context);
          plotProps.connectToContainerModifiedPlotProp = true;
          return plotProps;
        },
      })
    );

    const numeric = mount(
      <TestEditor {...{...fixtureProps, onUpdate}}>
        <ConnectedNumeric traceIndex={0} label="Opacity" attr="opacity" />
      </TestEditor>
    ).find(Numeric);

    expect(numeric.prop('connectToContainerModifiedPlotProp')).toBe(true);
  });
});

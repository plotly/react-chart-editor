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

  it('throws an error when connected component has no attr prop', () => {
    const ConnectedNumeric = connectToContainer(Numeric);

    // suppressReactErrorLogging trick from https://github.com/facebook/react/pull/11636
    // eslint-disable-next-line no-extend-native
    Error.prototype.suppressReactErrorLogging = true;
    try {
      expect(() =>
        mount(
          <TestEditor {...{...fixtures.scatter(), onUpdate: jest.fn()}}>
            <ConnectedNumeric />
          </TestEditor>
        )
      ).toThrow('connectedToContainer components require an `attr` prop');
    } finally {
      // eslint-disable-next-line no-extend-native
      Error.prototype.suppressReactErrorLogging = false;
    }
  });
});

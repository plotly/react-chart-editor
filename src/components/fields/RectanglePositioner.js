import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';
import {NumericFraction} from './derived';
import ResizableRect from 'react-resizable-rotatable-draggable';

const maxWidth = 300;
const gridRes = 8;

class UnconnectedRectanglePositioner extends Component {
  constructor(props, context) {
    super(props, context);
    this.sendUpdate = this.sendUpdate.bind(this);
  }

  sendUpdate({x, y, width, height, fieldWidthPx, fieldHeightPx}) {
    const x0 = x / fieldWidthPx;
    const x1 = (width + x) / fieldWidthPx;
    const y0 = (fieldHeightPx - (height + y)) / fieldHeightPx;
    const y1 = (fieldHeightPx - y) / fieldHeightPx;

    const snap = v => Math.round(v * gridRes) / gridRes;

    const payload = {};

    if (x0 >= 0 && x1 <= 1) {
      payload['domain.x[0]'] = snap(x0);
      payload['domain.x[1]'] = snap(x1);
    }

    if (y0 >= 0 && y1 <= 1) {
      payload['domain.y[0]'] = snap(y0);
      payload['domain.y[1]'] = snap(y1);
    }

    this.context.updateContainer(payload);
  }

  render() {
    const {attr} = this.props;
    const {
      localize: _,
      fullContainer: {
        domain: {x, y},
      },
      fullLayout: {width: plotWidthPx, height: plotHeightPx},
    } = this.context;
    const aspectRatio = plotHeightPx / plotWidthPx;
    const fieldWidthPx = Math.min(maxWidth, maxWidth / aspectRatio);
    const fieldHeightPx = Math.min(maxWidth, maxWidth * aspectRatio);

    const width = fieldWidthPx * (x[1] - x[0]);
    const height = fieldHeightPx * (y[1] - y[0]);
    const left = fieldWidthPx * x[0];
    const top = fieldHeightPx * (1 - y[1]);

    return (
      <Field {...this.props} attr={attr}>
        <div
          style={{
            width: fieldWidthPx,
            height: fieldHeightPx,
            border: '1px solid grey',
            position: 'relative',
          }}
        >
          {Array(gridRes * gridRes)
            .fill(0)
            .map((v, i) => (
              <div
                key={i}
                style={{
                  width: fieldWidthPx / gridRes - 1,
                  height: fieldHeightPx / gridRes - 1,
                  float: 'left',
                  borderTop: i < gridRes ? '0' : '1px solid yellow',
                  borderLeft: i % gridRes ? '1px solid yellow' : '0',
                }}
              />
            ))}
          <ResizableRect
            bounds="parent"
            width={width}
            height={height}
            left={left}
            top={top}
            rotatable={false}
            draggable={false}
            zoomable="n, w, s, e, nw, ne, se, sw"
            onResize={style => {
              this.sendUpdate({
                fieldWidthPx,
                fieldHeightPx,
                width: style.width,
                height: style.height,
                x: style.left,
                y: style.top,
              });
            }}
          />
        </div>
        <NumericFraction label={_('X Start')} attr="domain.x[0]" />
        <NumericFraction label={_('X End')} attr="domain.x[1]" />
        <NumericFraction label={_('Y Start')} attr="domain.y[0]" />
        <NumericFraction label={_('Y End')} attr="domain.y[1]" />
      </Field>
    );
  }
}

UnconnectedRectanglePositioner.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedRectanglePositioner.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
  fullContainer: PropTypes.object,
  fullLayout: PropTypes.object,
};

export default connectToContainer(UnconnectedRectanglePositioner);

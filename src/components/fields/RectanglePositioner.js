import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';
import {NumericFraction} from './derived';
import ResizableRect from 'react-resizable-rotatable-draggable';

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

    if (x0 >= 0 && y0 >= 0 && y1 <= 1 && x1 <= 1) {
      this.context.updateContainer({
        'domain.x[0]': x0,
        'domain.x[1]': x1,
        'domain.y[0]': y0,
        'domain.y[1]': y1,
      });
    }
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
    const aspectRatio = 1; //plotHeightPx / plotWidthPx;
    const maxWidth = 300;
    const fieldWidthPx = aspectRatio > 1 ? maxWidth : maxWidth / aspectRatio;
    const fieldHeightPx = aspectRatio < 1 ? maxWidth : maxWidth * aspectRatio;

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
          <ResizableRect
            bounds="parent"
            width={width}
            height={height}
            left={left}
            top={top}
            rotatable={false}
            zoomable="n, w, s, e, nw, ne, se, sw"
            onDrag={(deltaX, deltaY) => {
              this.sendUpdate({
                fieldWidthPx,
                fieldHeightPx,
                width,
                height,
                x: left + deltaX,
                y: top + deltaY,
              });
            }}
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

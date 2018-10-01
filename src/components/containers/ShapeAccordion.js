import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectShapeToLayout} from 'lib';
import {COLORS} from 'lib/constants';

const ShapeFold = connectShapeToLayout(PlotlyFold);

class ShapeAccordion extends Component {
  render() {
    const {
      layout: {shapes = []},
      localize: _,
    } = this.context;
    const {canAdd, children} = this.props;

    const content =
      shapes.length &&
      shapes.map((shp, i) => (
        <ShapeFold key={i} shapeIndex={i} name={`${_('Shape')} ${i + 1}`} canDelete={canAdd}>
          {children}
        </ShapeFold>
      ));

    const addAction = {
      label: _('Shape'),
      handler: ({layout, updateContainer}) => {
        let shapeIndex;
        if (Array.isArray(layout.shapes)) {
          shapeIndex = layout.shapes.length;
        } else {
          shapeIndex = 0;
        }

        const key = `shapes[${shapeIndex}]`;
        const value = {
          line: {color: COLORS.charcoal},
          fillcolor: COLORS.middleGray,
          opacity: 0.3,
        };

        if (updateContainer) {
          updateContainer({[key]: value});
        }
      },
    };

    return (
      <TraceRequiredPanel addAction={canAdd ? addAction : null}>
        {content ? (
          content
        ) : (
          <div className="panel__empty__message">
            <div className="panel__empty__message__heading">
              {_('Lines, Rectangles and Ellipses.')}
            </div>
            <div className="panel__empty__message__content">
              <p>
                {_(
                  'Add shapes to a figure to highlight points or periods in time, thresholds, or areas of interest.'
                )}
              </p>
              <p>{_('Click on the + button above to add a shape.')}</p>
            </div>
          </div>
        )}
      </TraceRequiredPanel>
    );
  }
}

ShapeAccordion.contextTypes = {
  layout: PropTypes.object,
  localize: PropTypes.func,
};

ShapeAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default ShapeAccordion;

import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectShapeToLayout} from 'lib';

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
        <ShapeFold key={i} shapeIndex={i} name={shp.text} canDelete={canAdd}>
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
          text: `${_('Shape')} ${shapeIndex}`,
          line: {color: '#444444'},
          fillcolor: '#7F7F7F',
          opacity: 0.3,
        };

        if (updateContainer) {
          updateContainer({[key]: value});
        }
      },
    };

    return (
      <TraceRequiredPanel addAction={canAdd ? addAction : null}>
        {content ? content : null}
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

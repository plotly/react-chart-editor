import Fold from './Fold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectShapefileToLayout, localize} from 'lib';

const ShapefileFold = connectShapefileToLayout(Fold);

class ShapefileAccordion extends Component {
  render() {
    const {canAdd, children, localize: _} = this.props;

    const content =
      this.context.layout.mapbox &&
      this.context.layout.mapbox.layers &&
      this.context.layout.mapbox.layers.length &&
      this.context.layout.mapbox.layers.map((lay, i) => (
        <ShapefileFold
          key={i}
          shapefileIndex={i}
          name={_('Shapefile') + ` ${i + 1}`}
          canDelete={canAdd}
        >
          {children}
        </ShapefileFold>
      ));

    const addAction = {
      label: _('Shapefile'),
      handler: ({layout, updateContainer}) => {
        let shapefileIndex;
        if (Array.isArray(layout.mapbox.layers)) {
          shapefileIndex = layout.mapbox.layers.length;
        } else {
          shapefileIndex = 0;
        }

        const key = `mapbox.layers[${shapefileIndex}]`;

        if (updateContainer) {
          updateContainer({[key]: {source: ''}});
        }
      },
    };

    return (
      <TraceRequiredPanel
        addAction={canAdd ? addAction : null}
        extraConditions={[() => this.context.layout.mapbox]}
        extraEmptyPanelMessages={[
          {
            heading: 'GeoJSON layers are only available on mapbox traces',
            message: '',
          },
        ]}
      >
        {content ? content : null}
      </TraceRequiredPanel>
    );
  }
}

ShapefileAccordion.contextTypes = {
  layout: PropTypes.object,
};

ShapefileAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  localize: PropTypes.func,
};

export default localize(ShapefileAccordion);

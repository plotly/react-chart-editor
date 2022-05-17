import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectLayersToMapbox, getParsedTemplateString} from 'lib';

const MapboxLayersFold = connectLayersToMapbox(PlotlyFold);

class MapboxLayersAccordion extends Component {
  render() {
    const {
      fullContainer: {layers = []},
      localize: _,
      layout: meta,
    } = this.context;
    const {children} = this.props;

    const content =
      layers.length &&
      layers.map((layer, i) => (
        <MapboxLayersFold
          key={i}
          mapboxLayerIndex={i}
          name={getParsedTemplateString(layer.name, {meta})}
          canDelete={true}
        >
          {children}
        </MapboxLayersFold>
      ));

    const addAction = {
      label: _('Layer'),
      handler: (context) => {
        const {fullContainer, updateContainer} = context;
        if (updateContainer) {
          const mapboxLayerIndex = Array.isArray(fullContainer.layers)
            ? fullContainer.layers.length
            : 0;

          updateContainer({
            [`layers[${mapboxLayerIndex}]`]: {
              name: `Layer ${mapboxLayerIndex}`,
              sourcetype: 'raster',
              below: 'traces',
            },
          });
        }
      },
    };

    return (
      <PlotlyPanel addAction={addAction} canReorder>
        {content ? content : null}
      </PlotlyPanel>
    );
  }
}

MapboxLayersAccordion.contextTypes = {
  fullContainer: PropTypes.object,
  localize: PropTypes.func,
  layout: PropTypes.object,
};

MapboxLayersAccordion.propTypes = {
  children: PropTypes.node,
};

MapboxLayersAccordion.plotly_editor_traits = {
  no_visibility_forcing: true,
};

export default MapboxLayersAccordion;

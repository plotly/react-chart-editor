import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectImageToLayout, localize} from 'lib';

const ImageFold = connectImageToLayout(PlotlyFold);

class ImageAccordion extends Component {
  render() {
    const {layout: {images = []}} = this.context;
    const {canAdd, children, localize: _} = this.props;

    const content =
      images.length &&
      images.map((img, i) => (
        <ImageFold key={i} imageIndex={i} name={img.text} canDelete={canAdd}>
          {children}
        </ImageFold>
      ));

    const addAction = {
      label: _('Image'),
      handler: ({layout, updateContainer}) => {
        let imageIndex;
        if (Array.isArray(layout.images)) {
          imageIndex = layout.images.length;
        } else {
          imageIndex = 0;
        }

        const key = `images[${imageIndex}]`;
        const value = {
          text: `${_('Image')} ${imageIndex + 1}`,
          sizex: 0.1,
          sizey: 0.1,
          x: 0.5,
          y: 0.5,
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

ImageAccordion.contextTypes = {
  layout: PropTypes.object,
};

ImageAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  localize: PropTypes.func,
};

export default localize(ImageAccordion);

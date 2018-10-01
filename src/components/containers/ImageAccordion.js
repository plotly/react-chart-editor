import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectImageToLayout} from 'lib';

const ImageFold = connectImageToLayout(PlotlyFold);

class ImageAccordion extends Component {
  render() {
    const {
      layout: {images = []},
      localize: _,
    } = this.context;
    const {canAdd, children} = this.props;

    const content =
      images.length &&
      images.map((img, i) => (
        <ImageFold key={i} imageIndex={i} name={`${_('Image')} ${i + 1}`} canDelete={canAdd}>
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
        {content ? (
          content
        ) : (
          <div className="panel__empty__message">
            <div className="panel__empty__message__heading">{_('Logos, watermarks and more.')}</div>
            <div className="panel__empty__message__content">
              <p>
                {_(
                  'Embed images in your figure to make the data more readable or to brand your content.'
                )}
              </p>
              <p>{_('Click on the + button above to add an image.')}</p>
            </div>
          </div>
        )}
      </TraceRequiredPanel>
    );
  }
}

ImageAccordion.contextTypes = {
  layout: PropTypes.object,
  localize: PropTypes.func,
};

ImageAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default ImageAccordion;

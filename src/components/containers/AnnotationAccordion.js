import Fold from './Fold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout, localize} from 'lib';

const AnnotationFold = connectAnnotationToLayout(Fold);

class AnnotationAccordion extends Component {
  render() {
    const {layout: {annotations = []}} = this.context;
    const {canAdd, children, localize: _} = this.props;

    const content =
      annotations.length &&
      annotations.map((ann, i) => (
        <AnnotationFold
          key={i}
          annotationIndex={i}
          name={ann.text}
          canDelete={canAdd}
        >
          {children}
        </AnnotationFold>
      ));

    const addAction = {
      label: _('Annotation'),
      handler: ({layout, updateContainer}) => {
        let annotationIndex;
        if (Array.isArray(layout.annotations)) {
          annotationIndex = layout.annotations.length;
        } else {
          annotationIndex = 0;
        }

        const key = `annotations[${annotationIndex}]`;
        const value = {text: 'new text'};

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

AnnotationAccordion.contextTypes = {
  layout: PropTypes.object,
};

AnnotationAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  localize: PropTypes.func,
};

export default localize(AnnotationAccordion);

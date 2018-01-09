import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout, bem} from 'lib';

const AnnotationFold = connectAnnotationToLayout(Fold);

class AnnotationAccordion extends Component {
  addAnnotation(layout, updateContainer) {
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
  }

  render() {
    const {layout: {annotations = []}} = this.context;
    const {canAdd, children} = this.props;

    const content =
      annotations.length &&
      annotations.map((ann, i) => (
        <AnnotationFold
          key={i}
          annotationIndex={i}
          name={ann.text}
          foldIndex={i}
          canDelete={canAdd}
        >
          {children}
        </AnnotationFold>
      ));

    return (
      <div className={bem('panel', 'content')}>{content ? content : null}</div>
    );
  }
}

AnnotationAccordion.contextTypes = {
  layout: PropTypes.object,
};

AnnotationAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default AnnotationAccordion;

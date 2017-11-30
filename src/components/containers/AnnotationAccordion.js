import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout} from '../../lib';

const AnnotationFold = connectAnnotationToLayout(Fold);

export default class AnnotationAccordion extends Component {
  constructor(props) {
    super(props);

    this.addAnnotation = this.addAnnotation.bind(this);
  }

  addAnnotation() {
    const {layout} = this.context;
    let annotationIndex;
    if (Array.isArray(layout.annotations)) {
      annotationIndex = layout.annotations.length;
    } else {
      annotationIndex = 0;
    }

    const key = `annotations[${annotationIndex}]`;
    const value = {text: 'new text'};
    if (this.context.updateContainer) {
      this.context.updateContainer({[key]: value});
    }
  }

  render() {
    const annotations = this.context.layout.annotations || [];
    return (
      <div>
        {this.props.canAdd ? (
          <button className="panel__add-button" onClick={this.addAnnotation}>
            + Annotation
          </button>
        ) : null}
        {annotations.map((ann, i) => (
          <AnnotationFold key={i} annotationIndex={i} name={ann.text}>
            {this.props.children}
          </AnnotationFold>
        ))}
      </div>
    );
  }
}

AnnotationAccordion.contextTypes = {
  layout: PropTypes.object,
  updateContainer: PropTypes.func,
};

AnnotationAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

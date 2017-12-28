import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout, bem} from 'lib';
import {PanelHeader} from './Panel';

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

    const {canAdd, children} = this.props;

    const addButton = canAdd && (
      <button className="panel__add-button" onClick={this.addAnnotation}>
        + Annotation
      </button>
    );

    const panelHeader = canAdd && <PanelHeader action={addButton} />;

    const content = annotations.map((ann, i) => (
      <AnnotationFold key={i} annotationIndex={i} name={ann.text}>
        {children}
      </AnnotationFold>
    ));
    return (
      <div className={bem('panel', 'content')}>
        {panelHeader}
        {content}
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

import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout} from 'lib';

const AnnotationFold = connectAnnotationToLayout(PlotlyFold);

class AnnotationAccordion extends Component {
  render() {
    const {
      layout: {annotations = []},
      localize: _,
    } = this.context;
    const {canAdd, children} = this.props;

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
        const value = {text: _('new text')};

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
  localize: PropTypes.func,
};

AnnotationAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default AnnotationAccordion;

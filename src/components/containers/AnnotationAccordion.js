import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectAnnotationToLayout, bem, localize} from 'lib';
import {PanelHeader} from './Panel';
import Button from 'components/widgets/Button';
import PlusIcon from 'mdi-react/PlusIcon';
const AnnotationFold = connectAnnotationToLayout(Fold);

class AnnotationAccordion extends Component {
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
    const {layout: {annotations = []}} = this.context;

    const {canAdd, children, localize: _} = this.props;

    const addButton = canAdd && (
      <Button
        variant="primary"
        className="js-add-annotation-button"
        onClick={this.addAnnotation}
        icon={<PlusIcon />}
        label={_('Annotation')}
      />
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
  localize: PropTypes.func,
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default localize(AnnotationAccordion);

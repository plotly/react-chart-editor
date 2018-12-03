import Field from './Field';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import LaTeX from '../widgets/text_editors/LaTeX';
import RichText from '../widgets/text_editors/RichText';
import MultiFormat from '../widgets/text_editors/MultiFormat';
import HTML from '../widgets/text_editors/HTML';
import {EditorControlsContext} from '../../context';

class UnconnectedTextEditor extends Component {
  render() {
    const {
      attr,
      container,
      htmlOnly,
      latexOnly,
      multiValued,
      richTextOnly,
      updatePlot,
    } = this.props;

    const {localize: _} = this.context;

    let fullValue = this.props.fullValue;

    let placeholder;
    if (multiValued || (fullValue && (!container || !container[attr]))) {
      placeholder = fullValue;
      fullValue = '';
    }

    let editor;

    if (latexOnly) {
      placeholder = _('Enter LaTeX formatted text');
      editor = <LaTeX value={fullValue} placeholder={placeholder} onChange={updatePlot} />;
    } else if (richTextOnly) {
      editor = <RichText value={fullValue} placeholder={placeholder} onChange={updatePlot} />;
    } else if (htmlOnly) {
      placeholder = _('Enter html formatted text');
      editor = <HTML value={fullValue} placeholder={placeholder} onChange={updatePlot} />;
    } else {
      editor = <MultiFormat value={fullValue} placeholder={placeholder} onChange={updatePlot} />;
    }

    return (
      <Field {...this.props}>
        <div className="text-editor">{editor}</div>
      </Field>
    );
  }
}

UnconnectedTextEditor.propTypes = {
  ...Field.propTypes,
  fullValue: PropTypes.any,
  htmlOnly: PropTypes.bool,
  latexOnly: PropTypes.bool,
  richTextOnly: PropTypes.bool,
  updatePlot: PropTypes.func,
};

UnconnectedTextEditor.contextType = EditorControlsContext;

export default connectToContainer(UnconnectedTextEditor, {
  modifyPlotProps: (props, context, plotProps) => {
    if (plotProps.isVisible && plotProps.multiValued) {
      plotProps.isVisible = false;
    }
  },
});

import Field from './Field';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer, localize} from 'lib';
import LaTeX from '../widgets/text_editors/LaTeX';
import RichText from '../widgets/text_editors/RichText';
import MultiFormat from '../widgets/text_editors/MultiFormat';
import HTML from '../widgets/text_editors/HTML';

class UnconnectedTextEditor extends Component {
  render() {
    const {
      attr,
      container,
      htmlOnly,
      latexOnly,
      localize: _,
      multiValued,
      richTextOnly,
      updatePlot,
    } = this.props;

    let fullValue = this.props.fullValue;

    let placeholder;
    if (multiValued || (!container[attr] && fullValue)) {
      placeholder = fullValue;
      fullValue = '';
    }

    let editor;

    if (latexOnly) {
      placeholder = _('Enter LaTeX formatted text');
      editor = (
        <LaTeX
          value={fullValue}
          placeholder={placeholder}
          onChange={updatePlot}
        />
      );
    } else if (richTextOnly) {
      editor = (
        <RichText
          value={fullValue}
          placeholder={placeholder}
          onChange={updatePlot}
        />
      );
    } else if (htmlOnly) {
      placeholder = _('Enter html formatted text');
      editor = (
        <HTML
          value={fullValue}
          placeholder={placeholder}
          onChange={updatePlot}
        />
      );
    } else {
      editor = (
        <MultiFormat
          value={fullValue}
          placeholder={placeholder}
          onChange={updatePlot}
        />
      );
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

export const LocalizedTextEditor = localize(UnconnectedTextEditor);

export default connectToContainer(LocalizedTextEditor);

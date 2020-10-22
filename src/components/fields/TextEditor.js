import Field from './Field';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import LaTeX from '../widgets/text_editors/LaTeX';
import RichText from '../widgets/text_editors/RichText';
import MultiFormat from '../widgets/text_editors/MultiFormat';
import HTML from '../widgets/text_editors/HTML';

// TODO: import plotly.js regex directly: https://github.com/plotly/plotly.js/issues/3520
const TEMPLATE_STRING_REGEX = /%{([^\s%{}:]*)(:[^}]*)?}/g;
const INDEX_IN_TEMPLATE_STRING_REGEX = /%{(meta(\[(\d+)]))}/;

export class UnconnectedTextEditor extends Component {
  hasTemplateStrings(value) {
    if (!value) {
      return false;
    }
    return value.match(TEMPLATE_STRING_REGEX);
  }

  updatePlot(value) {
    const {updatePlot} = this.props;
    const templateStrings = this.hasTemplateStrings(value);

    let adjustedValue = value;

    if (templateStrings) {
      adjustedValue = adjustedValue.replace(TEMPLATE_STRING_REGEX, (match) => {
        const index = INDEX_IN_TEMPLATE_STRING_REGEX.exec(match);
        if (index) {
          const adjustedIndex = parseInt(index[3], 10) - 1;
          if (!isNaN(adjustedIndex)) {
            return `%{meta[${adjustedIndex < 0 ? 0 : adjustedIndex}]}`;
          }
        }
        return match;
      });
    }

    updatePlot(adjustedValue);
  }

  getAdjustedFullValue(fullValue) {
    const templateStrings = this.hasTemplateStrings(fullValue);
    if (templateStrings) {
      return fullValue.replace(TEMPLATE_STRING_REGEX, (match) => {
        const index = INDEX_IN_TEMPLATE_STRING_REGEX.exec(match);
        if (index) {
          const adjustedIndex = parseInt(index[3], 10) + 1;
          if (!isNaN(adjustedIndex)) {
            return `%{meta[${adjustedIndex}]}`;
          }
          return match;
        }
        return match;
      });
    }
    return fullValue;
  }

  render() {
    const {attr, container, htmlOnly, latexOnly, multiValued, richTextOnly} = this.props;

    const {localize: _} = this.context;

    let fullValue = this.getAdjustedFullValue(this.props.fullValue);

    let placeholder = this.props.placeholder;

    if (multiValued || (fullValue && (!container || !nestedProperty(container, attr)))) {
      placeholder = fullValue;
      fullValue = '';
    }

    let editor;

    if (latexOnly) {
      placeholder = _('Enter LaTeX formatted text');
      editor = (
        <LaTeX value={fullValue} placeholder={placeholder} onChange={this.updatePlot.bind(this)} />
      );
    } else if (richTextOnly) {
      editor = (
        <RichText
          value={fullValue}
          placeholder={placeholder}
          onChange={this.updatePlot.bind(this)}
        />
      );
    } else if (htmlOnly) {
      placeholder = _('Enter html formatted text');
      editor = (
        <HTML value={fullValue} placeholder={placeholder} onChange={this.updatePlot.bind(this)} />
      );
    } else {
      editor = (
        <MultiFormat
          value={fullValue}
          placeholder={placeholder}
          onChange={this.updatePlot.bind(this)}
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
  placeholder: PropTypes.string,
};

UnconnectedTextEditor.contextTypes = {
  localize: PropTypes.func,
  fullLayout: PropTypes.object,
};

UnconnectedTextEditor.displayName = 'UnconnectedTextEditor';

export default connectToContainer(UnconnectedTextEditor, {
  modifyPlotProps: (props, context, plotProps) => {
    if (plotProps.isVisible && plotProps.multiValued) {
      plotProps.isVisible = false;
    }

    if (
      context.fullLayout &&
      context.fullLayout._dfltTitle &&
      Object.values(context.fullLayout._dfltTitle).includes(plotProps.fullValue)
    ) {
      plotProps.placeholder = plotProps.fullValue;
      plotProps.fullValue = '';
    }
  },
});
